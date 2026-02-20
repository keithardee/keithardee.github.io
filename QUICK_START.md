# Quick Start Guide

## 🚀 Getting Started After Optimization

### Step 1: Set Up EmailJS (5-10 minutes)

1. **Create EmailJS Account**
   - Go to https://www.emailjs.com/
   - Sign up (use your Gmail: keithardeelazo@gmail.com)

2. **Connect Gmail**
   - Dashboard → Email Services → Add New Service → Gmail
   - Connect your Google account
   - Copy the **Service ID**

3. **Create Email Template**
   - Dashboard → Email Templates → Create New Template
   - Use the template from `EMAILJS_SETUP_GUIDE.md`
   - Copy the **Template ID**

4. **Get Public Key**
   - Dashboard → Account → General
   - Copy the **Public Key**

5. **Create `.env` File**
   - In the `web/` folder, create a file named `.env`
   - Add these lines (replace with your actual values):
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

### Step 2: Test Locally

```bash
cd web
npm install  # If you haven't already
npm run dev
```

- Open http://localhost:5173
- Go to Contact section
- Fill out and submit the form
- Check your Gmail inbox!

### Step 3: Optimize Images (Optional but Recommended)

See `IMAGE_OPTIMIZATION_GUIDE.md` for detailed instructions.

Quick version:
1. Use https://squoosh.app/ to compress images
2. Convert to WebP format
3. Replace images in `/web/public/projects/` and `/web/public/assets/`

### Step 4: Build and Deploy

```bash
cd web
npm run build
npm run deploy
```

---

## ✅ What's Been Done

- ✅ Backend removed - EmailJS integrated
- ✅ SEO optimized
- ✅ Accessibility improved
- ✅ Performance optimized
- ✅ Images prepared for optimization

## 📝 Next Steps

1. Set up EmailJS (see Step 1 above)
2. Test contact form
3. Optimize images (optional)
4. Deploy to GitHub Pages

---

**Need help?** Check `EMAILJS_SETUP_GUIDE.md` for detailed EmailJS setup instructions.
