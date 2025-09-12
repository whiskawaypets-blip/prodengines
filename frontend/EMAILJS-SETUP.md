# EmailJS Setup for Contact Form

This guide explains how to set up EmailJS for the contact form to send emails to mrpaulphelps@gmail.com.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Connect your email account
5. Note the **Service ID** (you'll need this)

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Submission from {{from_name}}

Hello Paul,

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Position: {{position}}

Message:
{{message}}

---
This message was sent via the Productivity Engines contact form.
```

4. Save the template and note the **Template ID**

## Step 4: Get Public Key

1. Go to "Account" > "General"
2. Copy your **Public Key**

## Step 5: Update Environment Variables

Create a `.env.local` file in the frontend directory with:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Step 6: Test the Form

1. Run the development server: `npm run dev`
2. Navigate to `/contact`
3. Fill out and submit the form
4. Check that Paul receives the email at mrpaulphelps@gmail.com

## Deployment Notes

- Make sure to set the environment variables in Vercel
- The form will redirect to `/contact/thank-you` on successful submission
- The thank you page includes CTAs for:
  - Returning to the home page
  - Connecting with Paul on LinkedIn

## Troubleshooting

- Check the browser console for any EmailJS errors
- Verify all environment variables are set correctly
- Ensure the EmailJS service is properly connected
- Test with a personal email first before going live