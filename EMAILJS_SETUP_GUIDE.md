# EmailJS Setup Guide - Step by Step

This guide will walk you through setting up EmailJS to send contact form messages directly to your Gmail without needing a backend server.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** in the top right corner
3. Sign up using:
   - Your email address (use your Gmail: keithardeelazo@gmail.com)
   - Create a password
   - Or sign up with Google (recommended for easier setup)

## Step 2: Add Email Service (Connect Gmail)

1. After logging in, you'll be on the **Dashboard**
2. Click on **"Email Services"** in the left sidebar
3. Click the **"+ Add New Service"** button
4. You'll see several email service providers:
   - **Select "Gmail"** (or "Gmail API" if available)
5. Click **"Connect Account"** or **"Add Service"**
6. You'll be prompted to:
   - Sign in with your Google account (keithardeelazo@gmail.com)
   - Authorize EmailJS to send emails on your behalf
   - Click **"Allow"** to grant permissions
7. Once connected, you'll see your service listed
8. **Copy the Service ID** - you'll need this later (it looks like: `service_xxxxxxx`)

## Step 3: Create Email Template

1. Click on **"Email Templates"** in the left sidebar
2. Click **"+ Create New Template"**
3. You'll see a template editor. Use this template:

### Template Settings:
- **Template Name**: `Portfolio Contact Form` (or any name you prefer)

### Template Content:

**Subject Line:**
```
New message from {{from_name}} via portfolio
```

**Content (HTML):**
```html
<span style="display:none!important;visibility:hidden;mso-hide:all;opacity:0;color:transparent;height:0;width:0;">New message from {{from_name}} via portfolio</span>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#1a1814; padding:48px 24px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px; background:#252220; border-radius:12px; overflow:hidden; border:1px solid #3d3835; box-shadow:0 4px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04);">

        <tr>
          <td style="padding:48px 40px 32px; text-align:left; border-bottom:1px solid #3d3835;">
            <h1 style="margin:0 0 8px; color:#f2ede9; font-family:Georgia, 'Times New Roman', serif; font-size:28px; font-weight:600; line-height:1.25; letter-spacing:-0.02em;">New message from your portfolio</h1>
            <p style="margin:0; color:#a8a29e; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size:15px; font-weight:400; line-height:1.5;">A visitor has sent you a message through the contact form.</p>
          </td>
        </tr>

        <tr>
          <td style="padding:32px 40px 40px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size:15px; line-height:1.6; color:#e8e4e0;">

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              <tr>
                <td style="padding:0 0 20px;">
                  <div style="background:#2c2825; padding:20px 24px; border-radius:8px; border:1px solid #3d3835; box-shadow:0 2px 8px rgba(0,0,0,0.2);">
                    <div style="color:#a8a29e; font-size:11px; font-weight:500; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:8px;">Name</div>
                    <div style="color:#f2ede9; font-size:16px; font-weight:400;">{{from_name}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:0 0 20px;">
                  <div style="background:#2c2825; padding:20px 24px; border-radius:8px; border:1px solid #3d3835; box-shadow:0 2px 8px rgba(0,0,0,0.2);">
                    <div style="color:#a8a29e; font-size:11px; font-weight:500; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:8px;">Email</div>
                    <div style="color:#f2ede9; font-size:16px;">
                      <a href="mailto:{{from_email}}" style="color:#e86c24; text-decoration:none;">{{from_email}}</a>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:0 0 28px;">
                  <div style="background:#2c2825; padding:20px 24px; border-radius:8px; border:1px solid #3d3835; box-shadow:0 2px 8px rgba(0,0,0,0.2);">
                    <div style="color:#a8a29e; font-size:11px; font-weight:500; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:8px;">Message</div>
                    <div style="color:#e8e4e0; font-size:15px; line-height:1.7; white-space:pre-wrap;">{{message}}</div>
                  </div>
                </td>
              </tr>
            </table>

            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 24px;">
              <tr>
                <td style="background:#e86c24; border-radius:8px; text-align:center; box-shadow:0 4px 14px rgba(232,108,36,0.35);">
                  <a href="mailto:{{from_email}}" style="display:inline-block; padding:16px 36px; color:#ffffff; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size:14px; font-weight:600; text-decoration:none; letter-spacing:0.04em;">Reply to {{from_name}}</a>
                </td>
              </tr>
            </table>

            <p style="margin:0; color:#78716c; font-size:13px; line-height:1.5;">This message was sent from your portfolio contact form.</p>
          </td>
        </tr>

        <tr>
          <td style="background:#1f1d1b; padding:24px 40px; text-align:center; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; border-top:1px solid #3d3835;">
            <p style="margin:0; color:#57534e; font-size:12px;">Portfolio contact form — Keith Ardee Lazo</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
```

**Content (Plain Text - for email clients that don't support HTML):**
```
New message from your portfolio

A visitor has sent you a message through the contact form.

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Portfolio contact form — Keith Ardee Lazo
```

4. **Important Template Variables:**
   - Make sure these variables are in your template: `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{reply_to}}`
   - These match what we're sending from the contact form

5. Click **"Save"** at the top right
6. **Copy the Template ID** - you'll need this later (it looks like: `template_xxxxxxx`)

## Step 4: Get Your Public Key

1. Click on **"Account"** in the left sidebar (or click your profile icon)
2. Go to **"General"** tab
3. Find **"Public Key"** section
4. **Copy your Public Key** - you'll need this later (it looks like: `xxxxxxxxxxxxxxxx`)

## Step 5: Configure Environment Variables

1. In your project, go to the `web` folder
2. Create a file named `.env` (if it doesn't exist)
3. Add these three lines with your actual values:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Example:**
```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
```

4. **Important:** 
   - Replace `your_service_id_here` with your actual Service ID from Step 2
   - Replace `your_template_id_here` with your actual Template ID from Step 3
   - Replace `your_public_key_here` with your actual Public Key from Step 4
   - Do NOT include quotes around the values
   - Do NOT commit the `.env` file to GitHub (it should be in `.gitignore`)

## Step 6: Test Your Setup

1. Start your development server:
   ```bash
   cd web
   npm run dev
   ```

2. Open your portfolio in the browser
3. Navigate to the Contact section
4. Fill out the contact form with test data:
   - Name: Test User
   - Email: your-test-email@example.com
   - Message: This is a test message
5. Click "Send Message"
6. Check your Gmail inbox (keithardeelazo@gmail.com)
7. You should receive the email within a few seconds!

## Step 7: Deploy to GitHub Pages

When deploying to GitHub Pages, you need to set environment variables in your build process:

### Option A: Using GitHub Secrets (Recommended)

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:
   - `VITE_EMAILJS_SERVICE_ID` = your service ID
   - `VITE_EMAILJS_TEMPLATE_ID` = your template ID
   - `VITE_EMAILJS_PUBLIC_KEY` = your public key

4. Update your GitHub Actions workflow (if you have one) to use these secrets

### Option B: Using Vite Environment Variables in Build

Since GitHub Pages is a static site, you can also:
1. Create a `.env.production` file in the `web` folder
2. Add your production values there
3. Vite will use these during build

**Note:** For GitHub Pages, you might need to use a different approach since environment variables aren't available at runtime. Consider using a build-time configuration or a small config file.

## Troubleshooting

### Email not sending?
- Check that all three environment variables are set correctly
- Verify your Service ID, Template ID, and Public Key are correct
- Check the browser console for error messages
- Make sure your Gmail account is properly connected in EmailJS

### "EmailJS configuration is missing" error?
- Make sure your `.env` file is in the `web` folder
- Restart your development server after creating/updating `.env`
- Check that variable names start with `VITE_`

### Emails going to spam?
- This is normal for new EmailJS accounts
- Check your spam folder
- As you send more emails, deliverability improves
- Consider setting up SPF/DKIM records (advanced)

### Free tier limits?
- EmailJS free tier: 200 emails/month
- If you need more, upgrade to a paid plan
- Monitor usage in your EmailJS dashboard

## Security Notes

- ✅ Your Public Key is safe to expose (it's meant to be public)
- ✅ Service ID and Template ID are also safe to expose
- ✅ EmailJS handles all the email sending securely
- ⚠️ Never share your Private Key (if you have one)
- ⚠️ Don't commit `.env` files to GitHub

## Next Steps

Once everything is working:
1. ✅ Test the contact form thoroughly
2. ✅ Remove or archive your backend folder (optional)
3. ✅ Update your README to reflect the new setup
4. ✅ Deploy and test on your live site

## Support

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: Check their help center or community forums

---

**Congratulations!** Your contact form is now connected to EmailJS and will send messages directly to your Gmail without needing a backend server! 🎉
