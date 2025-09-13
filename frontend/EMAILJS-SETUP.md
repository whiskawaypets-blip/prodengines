# EmailJS Setup for Contact Form

This guide explains how to set up EmailJS for the contact form to send emails to mrpaulphelps@gmail.com.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service (COMPLETED)

✅ **Service ID: `service_85enctv`** (already configured)

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Set Template ID as: `pauls_receipt`
4. Use this HTML template:

### Template Subject:
```
New Contact from {{from_name}} - Productivity Engines
```

### Template Body (HTML):
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact - Productivity Engines</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            line-height: 1.6; 
            color: #1f2937; 
            background-color: #f9fafb;
        }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { 
            background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
            border-radius: 8px 8px 0 0;
        }
        .header h1 { font-size: 28px; font-weight: 600; margin-bottom: 8px; }
        .header p { font-size: 16px; opacity: 0.9; }
        .content { padding: 30px 20px; }
        .greeting { font-size: 18px; color: #374151; margin-bottom: 20px; }
        .intro { color: #6b7280; margin-bottom: 25px; font-size: 16px; }
        .contact-card { 
            background: #f8fafc; 
            border: 2px solid #e5e7eb; 
            border-radius: 12px; 
            padding: 25px; 
            margin: 20px 0; 
        }
        .contact-row { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            padding: 8px 0; 
            border-bottom: 1px solid #e5e7eb; 
        }
        .contact-row:last-child { border-bottom: none; }
        .contact-label { 
            font-weight: 600; 
            color: #374151; 
            min-width: 80px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .contact-value { 
            color: #1f2937; 
            font-size: 16px;
            text-align: right;
            flex: 1;
            margin-left: 15px;
        }
        .email-highlight { 
            color: #2563eb; 
            font-weight: 500; 
            text-decoration: none; 
        }
        .message-section { 
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); 
            border-left: 5px solid #f59e0b; 
            border-radius: 8px;
            padding: 20px; 
            margin: 25px 0; 
        }
        .message-label { 
            font-weight: 600; 
            color: #92400e; 
            margin-bottom: 12px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .message-content { 
            color: #451a03; 
            font-size: 16px;
            line-height: 1.6;
            background: rgba(255,255,255,0.7);
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #f3e8ff;
        }
        .next-steps { 
            background: #f0f9ff; 
            border: 1px solid #bae6fd; 
            border-radius: 8px; 
            padding: 20px; 
            margin: 25px 0; 
        }
        .next-steps h3 { 
            color: #0c4a6e; 
            margin-bottom: 15px; 
            font-size: 18px;
        }
        .next-steps ul { 
            list-style: none; 
            padding: 0; 
        }
        .next-steps li { 
            color: #0369a1; 
            margin: 8px 0; 
            padding-left: 20px;
            position: relative;
        }
        .next-steps li:before { 
            content: "→"; 
            position: absolute; 
            left: 0; 
            color: #0284c7; 
            font-weight: bold; 
        }
        .priority-notice {
            background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
            border: 2px solid #f87171;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
        }
        .priority-notice strong {
            color: #dc2626;
            font-size: 16px;
        }
        .footer { 
            background: #f8fafc; 
            text-align: center; 
            padding: 20px; 
            border-top: 2px solid #e5e7eb; 
            border-radius: 0 0 8px 8px;
        }
        .footer p { 
            color: #6b7280; 
            font-size: 14px; 
            margin: 5px 0; 
        }
        .timestamp {
            color: #9ca3af;
            font-size: 12px;
            font-style: italic;
        }
        @media (max-width: 600px) {
            .contact-row { flex-direction: column; align-items: flex-start; }
            .contact-value { text-align: left; margin-left: 0; margin-top: 5px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 New Lead Alert!</h1>
            <p>productivityengines.com contact form</p>
        </div>
        
        <div class="content">
            <div class="greeting">Hello Paul! 👋</div>
            <div class="intro">Great news! Someone is interested in Productivity Engines and has reached out through your website contact form.</div>
            
            <div class="priority-notice">
                <strong>⏰ New inquiry - Response recommended within 2 hours for best conversion</strong>
            </div>
            
            <div class="contact-card">
                <div class="contact-row">
                    <div class="contact-label">Name:</div>
                    <div class="contact-value"><strong>{{from_name}}</strong></div>
                </div>
                <div class="contact-row">
                    <div class="contact-label">Email:</div>
                    <div class="contact-value">
                        <a href="mailto:{{from_email}}" class="email-highlight">{{from_email}}</a>
                    </div>
                </div>
                <div class="contact-row">
                    <div class="contact-label">Company:</div>
                    <div class="contact-value">{{company}}</div>
                </div>
                <div class="contact-row">
                    <div class="contact-label">Position:</div>
                    <div class="contact-value">{{position}}</div>
                </div>
            </div>
            
            <div class="message-section">
                <div class="message-label">💬 Their Message:</div>
                <div class="message-content">{{message}}</div>
            </div>
            
            <div class="next-steps">
                <h3>🎯 Recommended Next Steps:</h3>
                <ul>
                    <li><strong>Reply directly</strong> to this email (goes to {{from_email}})</li>
                    <li><strong>Schedule a call</strong> - mention your calendar link</li>
                    <li><strong>Send a personal follow-up</strong> within 2 hours for best results</li>
                    <li><strong>Connect on LinkedIn</strong> if they're from a larger company</li>
                </ul>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>📧 Reply-to:</strong> {{reply_to}}</p>
            <p class="timestamp">Sent automatically from productivityengines.com contact form</p>
            <p>This email was generated on {{current_date}} at {{current_time}}</p>
        </div>
    </div>
</body>
</html>
```

## Step 4: Get Public Key

1. Go to "Account" > "General"  
2. Copy your **Public Key**

## Step 5: Update Environment Variables

Create a `.env.local` file in the frontend directory with:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_85enctv
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=pauls_receipt
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Step 6: Test the Form

1. Run the development server: `npm run dev`
2. Navigate to `/contact`
3. Fill out and submit the form
4. Check that Paul receives the email at mrpaulphelps@gmail.com

## Production Deployment (productivityengines.com)

### Critical: Update EmailJS Domain Settings
1. In your EmailJS dashboard, go to "Email Services" > service_85enctv
2. Add these allowed domains:
   - `https://productivityengines.com`
   - `https://*.vercel.app` (for preview deployments)
   - `http://localhost:3000` (for local development)

### Vercel Environment Variables
Set these in Vercel Dashboard > Settings > Environment Variables:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_85enctv
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=pauls_receipt
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key_here
NEXT_PUBLIC_SITE_URL=https://productivityengines.com
```

### Testing Production
1. Deploy to Vercel with custom domain: productivityengines.com
2. Test form at: `https://productivityengines.com/contact`
3. Verify emails reach mrpaulphelps@gmail.com
4. Check thank you page redirect works

## Deployment Notes

- ✅ Form will work from productivityengines.com when deployed
- ✅ EmailJS configured for production domain
- ✅ Environment variables ready for Vercel
- ✅ Complete deployment guide in `VERCEL-DEPLOYMENT.md`

## Troubleshooting

**CORS Errors in Production:**
- Verify productivityengines.com is added to EmailJS allowed domains
- Check environment variables are set in Vercel dashboard

**Form Not Submitting:**
- Check browser console for EmailJS errors
- Verify public key is correctly set in Vercel environment variables
- Test EmailJS template directly in their dashboard

**Emails Not Received:**
- Check EmailJS dashboard usage/logs
- Verify template variables match the form data structure
- Test with a different email first to isolate issue