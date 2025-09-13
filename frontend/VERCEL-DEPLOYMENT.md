# Vercel Deployment Guide for Productivity Engines

This guide covers deploying the frontend to Vercel and configuring EmailJS for production.

## 1. Pre-Deployment Setup

### A. Domain Configuration
- **Production URL**: `https://productivityengines.com`
- **EmailJS will work from this domain once configured**

### B. Environment Variables for Production
Set these in your Vercel dashboard under Settings > Environment Variables:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_85enctv
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=pauls_receipt
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key

# Application URLs
NEXT_PUBLIC_SITE_URL=https://productivityengines.com

# Supabase (if using - can be left empty for contact form only)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 2. EmailJS Production Configuration

### A. Update EmailJS Service Settings
1. Go to your EmailJS dashboard
2. Navigate to "Email Services" > service_85enctv
3. Add allowed domains:
   - `https://productivityengines.com`
   - `https://*.vercel.app` (for preview deployments)
   - `http://localhost:3000` (for local development)

### B. Template Configuration
- **Template ID**: `template_contact` 
- **Service ID**: `service_85enctv`
- Use the HTML template from `EMAILJS-SETUP.md`

## 3. Vercel Deployment Steps

### Option A: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Set build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Root Directory**: `frontend`

### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# In the frontend directory
cd frontend
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Set productivityengines.com as custom domain
```

## 4. Custom Domain Setup

### A. In Vercel Dashboard
1. Go to your project settings
2. Navigate to "Domains"
3. Add `productivityengines.com`
4. Add `www.productivityengines.com` (optional)

### B. DNS Configuration
Update your DNS settings to point to Vercel:
- **A Record**: `76.76.19.61` (Vercel's IP)
- **CNAME**: `www` → `productivityengines.com`

## 5. Production Testing

### A. Contact Form Testing
1. Visit `https://productivityengines.com/contact`
2. Fill out and submit the form
3. Check that Paul receives the email at mrpaulphelps@gmail.com
4. Verify redirect to thank you page works

### B. EmailJS CORS Verification
- EmailJS should accept requests from productivityengines.com
- No CORS errors in browser console
- Form submission completes successfully

## 6. Troubleshooting

### Common Issues:

**EmailJS CORS Error:**
- Add productivityengines.com to allowed domains in EmailJS dashboard
- Verify the public key is correctly set in Vercel environment variables

**Environment Variables Not Working:**
- Ensure variables are set in Vercel dashboard
- Redeploy after adding environment variables
- Variables must start with `NEXT_PUBLIC_` to be available in browser

**Domain Not Resolving:**
- DNS changes can take 24-48 hours to propagate
- Use `dig productivityengines.com` to check DNS status

## 7. Post-Deployment Checklist

- [ ] Site loads at https://productivityengines.com
- [ ] Contact form submits successfully
- [ ] Email received at mrpaulphelps@gmail.com
- [ ] Thank you page redirect works
- [ ] LinkedIn link opens correctly
- [ ] No console errors
- [ ] SSL certificate is active

## 8. Monitoring & Analytics

Consider adding:
- **Vercel Analytics**: Built-in performance monitoring
- **Google Analytics**: Track form submissions and conversions
- **EmailJS Usage**: Monitor email send limits and success rates

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables are set correctly
3. Test EmailJS configuration in their dashboard
4. Check browser network tab for failed requests