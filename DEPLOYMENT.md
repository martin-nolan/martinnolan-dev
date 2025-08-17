# 🚀 Deployment Guide

## Pre-deployment Checklist

### ✅ Environment Variables

1. Copy `.env.example` to `.env`
2. Set your GitHub token:
   ```bash
   GITHUB_TOKEN=your_actual_token_here
   ```
3. Configure EmailJS credentials (optional):
   ```bash
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

### 🔧 Build Test

```bash
npm run test:build
```

## Netlify Deployment

### 1. Connect Repository

- Go to [Netlify](https://netlify.com)
- Click "New site from Git"
- Connect your GitHub repository

### 2. Build Settings

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18.x

### 3. Environment Variables

Add these in Netlify dashboard > Site settings > Environment variables:

- `GITHUB_TOKEN` - Your GitHub Models API token
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` - EmailJS service ID (optional)
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` - EmailJS template ID (optional)
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` - EmailJS public key (optional)

### 4. Deploy

Click "Deploy site" - your site will be live at `https://yoursite.netlify.app`

## Custom Domain (Optional)

1. In Netlify dashboard > Domain settings
2. Add custom domain: `yourdomain.com`
3. Configure DNS with your domain provider

## 🎯 Post-Deployment

- [ ] Test all sections work
- [ ] Test AI chat functionality
- [ ] Test resume download
- [ ] Check mobile responsiveness
- [ ] Verify SEO tags with [OpenGraph.xyz](https://www.opengraph.xyz/)

## 🔄 Future CMS Integration

This setup is ready for Phase 2 CMS integration with Strapi.
