# Image Optimization Guide

This guide will help you optimize images for your portfolio to ensure fast loading times while maintaining high quality.

## Why Optimize Images?

- **Faster page loads**: Smaller file sizes = faster loading
- **Better user experience**: Images load quickly on all devices
- **Improved SEO**: Google favors fast-loading websites
- **Reduced bandwidth**: Saves data for mobile users
- **Better performance scores**: Higher Lighthouse scores

## Current Image Locations

Your images are located in:
- `/web/public/projects/` - Project screenshots (project1.png, project2.png, project3.png)
- `/web/public/assets/` - Profile image (image1.jpg) and other assets

## Recommended Tools

### Option 1: Online Tools (Easiest)

1. **Squoosh** (Recommended)
   - Visit: https://squoosh.app/
   - Drag and drop your images
   - Choose format: **WebP** or **AVIF** (best compression)
   - Adjust quality slider (aim for 80-85% to maintain quality)
   - Download optimized images
   - Replace original files

2. **TinyPNG**
   - Visit: https://tinypng.com/
   - Upload images (supports PNG, JPG, WebP)
   - Download compressed versions
   - Replace original files

### Option 2: Command Line Tools

**Using Sharp (Node.js)**
```bash
npm install -g sharp-cli
sharp -i input.png -o output.webp -q 85
```

**Using ImageMagick**
```bash
# Convert to WebP
magick convert input.png -quality 85 output.webp

# Resize and optimize
magick convert input.png -resize 800x600 -quality 85 output.webp
```

## Optimization Steps

### Step 1: Optimize Project Images

1. **For each project image** (project1.png, project2.png, project3.png):
   - Open in Squoosh or TinyPNG
   - Convert to **WebP format** (or keep PNG if transparency needed)
   - Set quality to **80-85%**
   - Target size: **Under 200KB** per image
   - Recommended dimensions: **800x600px** or **1200x900px** (max)

2. **Save optimized images**:
   - Keep original filenames but change extension to `.webp`
   - Example: `project1.png` → `project1.webp`
   - Or keep `.png` if using PNG format

### Step 2: Optimize Profile Image

1. **For image1.jpg**:
   - Convert to **WebP** or optimize as **JPG**
   - Set quality to **85%**
   - Target size: **Under 150KB**
   - Recommended dimensions: **400x400px** (since it's displayed as a circle)

2. **Save optimized image**:
   - Replace `image1.jpg` with optimized version

### Step 3: Update Code (Optional - for WebP support)

If you converted images to WebP, you can update the code to use WebP with fallbacks:

```jsx
<picture>
  <source srcSet="/projects/project1.webp" type="image/webp" />
  <img src="/projects/project1.png" alt="Project 1" />
</picture>
```

However, modern browsers support WebP natively, so you can just replace the file extensions.

## Recommended Image Sizes

| Image Type | Dimensions | Format | Max Size | Quality |
|------------|-----------|---------|----------|---------|
| Project Screenshots | 1200x900px | WebP | 200KB | 80-85% |
| Profile Photo | 400x400px | WebP/JPG | 150KB | 85% |
| Certificate Images | 1200x900px | WebP | 200KB | 80-85% |
| Tech Stack Icons | 48x48px | PNG/SVG | 10KB | 100% |

## Quick Optimization Checklist

- [ ] Optimize project1.png → project1.webp (target: <200KB)
- [ ] Optimize project2.png → project2.webp (target: <200KB)
- [ ] Optimize project3.png → project3.webp (target: <200KB)
- [ ] Optimize image1.jpg → image1.webp (target: <150KB)
- [ ] Test images load quickly on mobile devices
- [ ] Verify image quality is acceptable
- [ ] Update file paths in code if using WebP

## Testing Performance

After optimizing:

1. **Build your project**:
   ```bash
   cd web
   npm run build
   ```

2. **Test with Lighthouse**:
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run performance audit
   - Aim for **90+ score** on Performance

3. **Check image sizes**:
   - Open Network tab in DevTools
   - Reload page
   - Check image file sizes
   - Should see significant reduction

## Advanced: Responsive Images

For even better performance, you can implement responsive images:

```jsx
<img
  srcSet="/projects/project1-400.webp 400w,
          /projects/project1-800.webp 800w,
          /projects/project1-1200.webp 1200w"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  src="/projects/project1-800.webp"
  alt="Project 1"
  loading="lazy"
/>
```

This requires creating multiple sizes of each image, but provides optimal performance.

## Notes

- **WebP** is supported by all modern browsers (95%+ support)
- **AVIF** has even better compression but less browser support
- Always keep original images as backup
- Test on actual devices, not just desktop
- Consider using a CDN for even faster delivery

## Tools Summary

| Tool | Best For | Ease of Use |
|------|----------|-------------|
| Squoosh | WebP/AVIF conversion | ⭐⭐⭐⭐⭐ |
| TinyPNG | Quick PNG/JPG compression | ⭐⭐⭐⭐⭐ |
| Sharp CLI | Batch processing | ⭐⭐⭐ |
| ImageMagick | Advanced manipulation | ⭐⭐ |

---

**After optimization, your portfolio should load significantly faster while maintaining visual quality!** 🚀
