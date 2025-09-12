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
3. Set Template ID as: `template_contact`
4. Use this HTML template:

### Template Subject:
```
New Contact from {{from_name}} - Productivity Engines
```

### Template Body (HTML):
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .info-box { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin: 10px 0; }
        .label { font-weight: bold; color: #374151; }
        .value { color: #6b7280; margin-left: 10px; }
        .message { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 15px 0; }
        .footer { text-align: center; padding: 15px; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
    </style>
</head>
<body>
    <div class="header">
        <h2>New Contact Form Submission</h2>
        <p>Productivity Engines Website</p>
    </div>
    
    <div class="content">
        <p>Hello Paul,</p>
        <p>You have received a new contact form submission from your website:</p>
        
        <div class="info-box">
            <div><span class="label">Name:</span><span class="value">{{from_name}}</span></div>
            <div><span class="label">Email:</span><span class="value">{{from_email}}</span></div>
            <div><span class="label">Company:</span><span class="value">{{company}}</span></div>
            <div><span class="label">Position:</span><span class="value">{{position}}</span></div>
        </div>
        
        <div class="message">
            <div class="label">Message:</div>
            <p>{{message}}</p>
        </div>
        
        <p><strong>Next Steps:</strong></p>
        <ul>
            <li>Reply directly to this email (it will go to {{from_email}})</li>
            <li>Or call/email them using the contact information above</li>
        </ul>
    </div>
    
    <div class="footer">
        <p>This message was sent via the Productivity Engines contact form.</p>
        <p>Reply-to address: {{reply_to}}</p>
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
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_contact
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
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_contact
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