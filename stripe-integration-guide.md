# Stripe Integration Guide for Productivity Engines

## Overview

This guide provides instructions for integrating Stripe with your Productivity Engines platform to handle subscriptions, usage-based billing, and payment processing.

## Prerequisites

- Stripe account (create one at [stripe.com](https://stripe.com))
- Supabase project with the database schema implemented
- Next.js frontend application

## Setup Steps

### 1. Stripe Account Configuration

1. **Create Products and Pricing Plans**:
   - Create products for each subscription tier in the Stripe dashboard
   - Set up recurring pricing plans (monthly and yearly options)
   - Note the product and price IDs for each plan

2. **Configure Webhook Endpoints**:
   - Create a webhook endpoint in Stripe dashboard
   - Point it to `https://your-domain.com/api/webhooks/stripe`
   - Select events to monitor: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`, `invoice.payment_failed`

### 2. Environment Variables

Add these variables to your `.env` file:

```
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PRICE_ID_STARTER_MONTHLY=price_your_id
STRIPE_PRICE_ID_STARTER_YEARLY=price_your_id
STRIPE_PRICE_ID_PROFESSIONAL_MONTHLY=price_your_id
STRIPE_PRICE_ID_PROFESSIONAL_YEARLY=price_your_id
STRIPE_PRICE_ID_ENTERPRISE_MONTHLY=price_your_id
STRIPE_PRICE_ID_ENTERPRISE_YEARLY=price_your_id
```

### 3. Backend Implementation

#### Stripe Webhook Handler

Create an API route at `pages/api/webhooks/stripe.ts`:

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { supabase } from '@/lib/supabase-admin';

export const config = {
  api: {
    bodyParser: false
  }
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await handleSubscriptionChange(event.data.object as Stripe.Subscription);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionDeletion(event.data.object as Stripe.Subscription);
      break;
    case 'invoice.paid':
      await handleInvoicePaid(event.data.object as Stripe.Invoice);
      break;
    case 'invoice.payment_failed':
      await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const status = subscription.status;
  const priceId = subscription.items.data[0].price.id;
  
  // Find the subscription plan in our database
  const { data: planData } = await supabase
    .from('subscription_plans')
    .select('id')
    .or(`stripe_price_id_monthly.eq.${priceId},stripe_price_id_yearly.eq.${priceId}`)
    .single();
  
  if (!planData) {
    console.error(`Plan not found for price ID: ${priceId}`);
    return;
  }
  
  // Find the user or company by Stripe customer ID
  const { data: userData } = await supabase
    .from('subscriptions')
    .select('id, user_id, company_id')
    .eq('stripe_customer_id', customerId)
    .single();
  
  const billingCycle = subscription.items.data[0].price.recurring?.interval === 'year' ? 'yearly' : 'monthly';
  
  if (userData) {
    // Update existing subscription
    await supabase
      .from('subscriptions')
      .update({
        plan_id: planData.id,
        status: status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
        updated_at: new Date().toISOString(),
        billing_cycle: billingCycle,
        // Reset token counts based on the new plan
        tokens_used: 0,
        tokens_remaining: getPlanTokenLimit(planData.id)
      })
      .eq('id', userData.id);
  } else {
    // This might be a new subscription - handle accordingly
    console.log('New subscription detected, but no user/company found with this customer ID');
  }
}

async function handleSubscriptionDeletion(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  
  // Update the subscription status to canceled
  await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_customer_id', customerId);
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const subscriptionId = invoice.subscription as string;
  
  // Record the payment
  const { data: subscriptionData } = await supabase
    .from('subscriptions')
    .select('id, user_id, company_id')
    .eq('stripe_subscription_id', subscriptionId)
    .single();
  
  if (subscriptionData) {
    await supabase
      .from('payment_history')
      .insert({
        user_id: subscriptionData.user_id,
        company_id: subscriptionData.company_id,
        subscription_id: subscriptionData.id,
        amount: invoice.amount_paid / 100, // Convert from cents to dollars
        currency: invoice.currency,
        status: 'succeeded',
        stripe_payment_intent_id: invoice.payment_intent as string,
        stripe_invoice_id: invoice.id,
        description: `Payment for ${invoice.lines.data[0]?.description || 'subscription'}`,
        receipt_url: invoice.hosted_invoice_url
      });
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string;
  
  // Update subscription status
  if (subscriptionId) {
    await supabase
      .from('subscriptions')
      .update({
        status: 'past_due',
        updated_at: new Date().toISOString()
      })
      .eq('stripe_subscription_id', subscriptionId);
  }
  
  // Record the failed payment attempt
  const { data: subscriptionData } = await supabase
    .from('subscriptions')
    .select('id, user_id, company_id')
    .eq('stripe_subscription_id', subscriptionId)
    .single();
  
  if (subscriptionData) {
    await supabase
      .from('payment_history')
      .insert({
        user_id: subscriptionData.user_id,
        company_id: subscriptionData.company_id,
        subscription_id: subscriptionData.id,
        amount: invoice.amount_due / 100,
        currency: invoice.currency,
        status: 'failed',
        stripe_invoice_id: invoice.id,
        description: `Failed payment for ${invoice.lines.data[0]?.description || 'subscription'}`
      });
  }
}

// Helper function to get token limit for a plan
async function getPlanTokenLimit(planId: string): Promise<number> {
  const { data } = await supabase
    .from('subscription_plans')
    .select('token_limit')
    .eq('id', planId)
    .single();
  
  return data?.token_limit || 0;
}
```

#### Subscription Management API

Create an API route at `pages/api/subscriptions/index.ts`:

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase-admin';
import { getUser } from '@/lib/auth-helpers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUser(req);
  
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  if (req.method === 'POST') {
    // Create a new subscription
    try {
      const { priceId, planId, billingCycle } = req.body;
      
      // Check if user already has a subscription
      const { data: existingSubscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();
      
      let customerId = existingSubscription?.stripe_customer_id;
      
      // If no customer ID exists, create a new customer
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: {
            userId: user.id
          }
        });
        
        customerId = customer.id;
      }
      
      // Create the subscription in Stripe
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });
      
      const invoice = subscription.latest_invoice as Stripe.Invoice;
      const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;
      
      // Get plan details
      const { data: plan } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('id', planId)
        .single();
      
      if (!plan) {
        throw new Error('Plan not found');
      }
      
      // Create or update subscription in our database
      if (existingSubscription) {
        await supabase
          .from('subscriptions')
          .update({
            plan_id: planId,
            status: subscription.status,
            stripe_subscription_id: subscription.id,
            stripe_customer_id: customerId,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            billing_cycle: billingCycle,
            tokens_used: 0,
            tokens_remaining: plan.token_limit
          })
          .eq('id', existingSubscription.id);
      } else {
        await supabase
          .from('subscriptions')
          .insert({
            user_id: user.id,
            plan_id: planId,
            status: subscription.status,
            stripe_subscription_id: subscription.id,
            stripe_customer_id: customerId,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            billing_cycle: billingCycle,
            tokens_used: 0,
            tokens_remaining: plan.token_limit
          });
      }
      
      return res.status(200).json({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret
      });
    } catch (error: any) {
      console.error('Subscription creation error:', error);
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    // Get user's current subscription
    try {
      const { data: subscription, error } = await supabase
        .from('subscriptions')
        .select('*, subscription_plans(*)')
        .eq('user_id', user.id)
        .order('current_period_end', { ascending: false })
        .limit(1)
        .single();
      
      if (error) {
        throw error;
      }
      
      return res.status(200).json(subscription);
    } catch (error: any) {
      console.error('Subscription fetch error:', error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
```

### 4. Frontend Implementation

#### Subscription Page Component

Create a subscription page at `src/app/dashboard/subscription/page.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SubscriptionPage() {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [clientSecret, setClientSecret] = useState('');
  
  useEffect(() => {
    if (user) {
      fetchSubscriptionData();
    }
  }, [user]);
  
  const fetchSubscriptionData = async () => {
    setLoading(true);
    try {
      // Fetch plans
      const plansRes = await fetch('/api/subscription-plans');
      const plansData = await plansRes.json();
      setPlans(plansData);
      
      // Fetch current subscription
      const subRes = await fetch('/api/subscriptions');
      const subData = await subRes.json();
      setCurrentSubscription(subData);
    } catch (error) {
      console.error('Error fetching subscription data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };
  
  const handleSubscribe = async () => {
    if (!selectedPlan) return;
    
    try {
      setLoading(true);
      
      const priceId = billingCycle === 'yearly' 
        ? selectedPlan.stripe_price_id_yearly 
        : selectedPlan.stripe_price_id_monthly;
      
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          planId: selectedPlan.id,
          billingCycle
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Error creating subscription:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Subscription Plans</h1>
      
      {loading ? (
        <div>Loading subscription data...</div>
      ) : (
        <div>
          {currentSubscription && (
            <div className="mb-8 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-2">Current Subscription</h2>
              <p>Plan: {currentSubscription.subscription_plans?.name}</p>
              <p>Status: {currentSubscription.status}</p>
              <p>Renewal Date: {new Date(currentSubscription.current_period_end).toLocaleDateString()}</p>
              <p>Tokens Used: {currentSubscription.tokens_used} / {currentSubscription.tokens_remaining + currentSubscription.tokens_used}</p>
            </div>
          )}
          
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <button
                className={`px-4 py-2 rounded-md ${billingCycle === 'monthly' ? 'bg-white dark:bg-gray-700 shadow' : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded-md ${billingCycle === 'yearly' ? 'bg-white dark:bg-gray-700 shadow' : ''}`}
                onClick={() => setBillingCycle('yearly')}
              >
                Yearly (Save 20%)
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`border rounded-lg p-6 ${selectedPlan?.id === plan.id ? 'border-amber-500 ring-2 ring-amber-500' : ''}`}
                onClick={() => handlePlanSelect(plan)}
              >
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{plan.description}</p>
                <p className="text-3xl font-bold mb-4">
                  ${billingCycle === 'yearly' ? plan.price_yearly : plan.price_monthly}
                  <span className="text-sm font-normal">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                </p>
                <ul className="mb-6 space-y-2">
                  {plan.features.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={selectedPlan?.id === plan.id ? 'default' : 'outline'}
                  onClick={() => handlePlanSelect(plan)}
                >
                  {currentSubscription?.subscription_plans?.id === plan.id ? 'Current Plan' : 'Select Plan'}
                </Button>
              </div>
            ))}
          </div>
          
          {selectedPlan && (
            <div className="mt-6">
              <Button 
                onClick={handleSubscribe} 
                disabled={loading || currentSubscription?.subscription_plans?.id === selectedPlan.id}
                className="w-full md:w-auto"
              >
                {loading ? 'Processing...' : 'Subscribe'}
              </Button>
            </div>
          )}
          
          {clientSecret && (
            <div className="mt-8 p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Complete Payment</h3>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setLoading(true);
    
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/subscription/success`,
      },
      redirect: 'if_required',
    });
    
    if (error) {
      setMessage(error.message || 'An error occurred');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage('Payment successful!');
      // Redirect or update UI as needed
      window.location.href = '/dashboard/subscription/success';
    } else {
      setMessage('Something went wrong.');
    }
    
    setLoading(false);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {message && <div className="mt-4 text-red-500">{message}</div>}
      <Button 
        type="submit" 
        disabled={!stripe || loading} 
        className="mt-4"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  );
}
```

## Testing the Integration

1. **Test Mode**: Use Stripe test mode for development
2. **Test Cards**: Use Stripe's test card numbers (e.g., 4242 4242 4242 4242)
3. **Webhook Testing**: Use Stripe CLI to test webhooks locally

## Going to Production

1. **Switch to Live Keys**: Replace test keys with live keys
2. **Update Webhook Endpoints**: Configure production webhook endpoints
3. **Set Up Proper Error Handling**: Implement comprehensive error handling and logging
4. **Monitor Stripe Dashboard**: Regularly check for failed payments and subscription issues

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Supabase-Stripe Integration Examples](https://github.com/supabase/supabase/tree/master/examples/stripe-subscriptions)
- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)
