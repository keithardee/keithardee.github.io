# GitHub Secrets Setup Guide

This guide will help you add your EmailJS credentials as GitHub Secrets so your contact form works on the deployed site.

## Why GitHub Secrets?

GitHub Pages is a static site, so environment variables need to be embedded **during the build process**. GitHub Secrets allow you to securely store your EmailJS credentials and use them during the build without exposing them in your code.

## Step-by-Step: Add GitHub Secrets

### Step 1: Get Your EmailJS Credentials

You need these 3 values from your EmailJS dashboard:

1. **Service ID**
   - Go to EmailJS Dashboard → Email Services
   - Click on your Gmail service
   - Copy the **Service ID** (looks like: `service_xxxxxxx`)

2. **Template ID**
   - Go to EmailJS Dashboard → Email Templates
   - Click on your template
   - Copy the **Template ID** (looks like: `template_xxxxxxx`)

3. **Public Key**
   - Go to EmailJS Dashboard → Account → General
   - Find **Public Key** section
   - Copy your **Public Key** (looks like: `xxxxxxxxxxxxxxxx`)

### Step 2: Add Secrets to GitHub

1. **Go to your GitHub repository**
   - Navigate to: `https://github.com/keithardee/keithardee.github.io`

2. **Open Settings**
   - Click on **Settings** tab (top menu)

3. **Navigate to Secrets**
   - In the left sidebar, click **Secrets and variables**
   - Click **Actions**

4. **Add First Secret: Service ID**
   - Click **"New repository secret"** button
   - **Name**: `VITE_EMAILJS_SERVICE_ID`
   - **Secret**: Paste your Service ID (e.g., `service_abc123`)
   - Click **"Add secret"**

5. **Add Second Secret: Template ID**
   - Click **"New repository secret"** again
   - **Name**: `VITE_EMAILJS_TEMPLATE_ID`
   - **Secret**: Paste your Template ID (e.g., `template_xyz789`)
   - Click **"Add secret"**

6. **Add Third Secret: Public Key**
   - Click **"New repository secret"** again
   - **Name**: `VITE_EMAILJS_PUBLIC_KEY`
   - **Secret**: Paste your Public Key (e.g., `abcdefghijklmnop`)
   - Click **"Add secret"**

### Step 3: Verify Secrets Are Added

After adding all 3 secrets, you should see them listed:
- ✅ `VITE_EMAILJS_SERVICE_ID`
- ✅ `VITE_EMAILJS_TEMPLATE_ID`
- ✅ `VITE_EMAILJS_PUBLIC_KEY`

### Step 4: Trigger a New Build

After adding the secrets, you need to trigger a new deployment:

**Option A: Push a change**
```bash
# Make any small change (like updating a comment)
git add .
git commit -m "Trigger deployment with EmailJS secrets"
git push
```

**Option B: Manual workflow trigger**
1. Go to **Actions** tab in GitHub
2. Click on **"Deploy site to GitHub Pages"** workflow
3. Click **"Run workflow"** button
4. Select **main** branch
5. Click **"Run workflow"**

### Step 5: Verify the Build

1. Go to **Actions** tab
2. Click on the latest workflow run
3. Check the **"Verify EmailJS secrets"** step
   - You should see ✅ for all three secrets
4. Check the **"Build (web)"** step
   - Should complete successfully

### Step 6: Test the Contact Form

1. Visit your live portfolio: `https://keithardee.github.io`
2. Navigate to the **Contact** section
3. Fill out the form:
   - Name: Test User
   - Email: your-test-email@example.com
   - Message: This is a test
4. Click **"Send Message"**
5. You should see: **"Message sent!"**
6. Check your Gmail inbox (keithardeelazo@gmail.com)
7. You should receive the email! 🎉

## Troubleshooting

### ❌ Still seeing "Contact form is not configured" error?

**Check 1: Secrets are added correctly**
- Go to Settings → Secrets and variables → Actions
- Verify all 3 secrets exist with exact names:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`

**Check 2: Secrets have correct values**
- Make sure you copied the full values (no extra spaces)
- Service ID should start with `service_`
- Template ID should start with `template_`
- Public Key is a long string of characters

**Check 3: New build was triggered**
- Secrets only apply to NEW builds
- Make sure you pushed a change or manually triggered the workflow
- Check Actions tab to see if a new build ran after adding secrets

**Check 4: Build logs**
- Go to Actions → Latest workflow run
- Check "Verify EmailJS secrets" step
- If you see ⚠️ warnings, the secrets aren't set
- If you see ✅, secrets are set correctly

### ❌ Build fails or secrets show as missing?

1. **Double-check secret names**
   - Names are case-sensitive
   - Must be exactly: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`

2. **Re-add secrets if needed**
   - Delete the old secret
   - Add it again with the correct name and value

3. **Check EmailJS dashboard**
   - Make sure your service and template are active
   - Verify your Public Key is correct

### ❌ Email not sending but form shows success?

1. **Check EmailJS dashboard**
   - Go to EmailJS → Logs
   - See if there are any errors

2. **Check spam folder**
   - New EmailJS accounts sometimes send to spam initially

3. **Verify template variables**
   - Make sure your template uses: `{{from_name}}`, `{{from_email}}`, `{{message}}`

## Quick Checklist

- [ ] Got Service ID from EmailJS dashboard
- [ ] Got Template ID from EmailJS dashboard
- [ ] Got Public Key from EmailJS dashboard
- [ ] Added `VITE_EMAILJS_SERVICE_ID` secret to GitHub
- [ ] Added `VITE_EMAILJS_TEMPLATE_ID` secret to GitHub
- [ ] Added `VITE_EMAILJS_PUBLIC_KEY` secret to GitHub
- [ ] Triggered a new build (pushed changes or manual trigger)
- [ ] Verified build completed successfully
- [ ] Tested contact form on live site
- [ ] Received test email in Gmail

## Security Notes

✅ **Safe to expose:**
- Public Key (it's meant to be public)
- Service ID
- Template ID

❌ **Never expose:**
- Private Key (if you have one)
- `.env` files in your repository

---

**Once all secrets are added and a new build completes, your contact form will work perfectly on your live site!** 🚀
