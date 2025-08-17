# 🎯 **Development Setup for CMS Integration**

## Current Status: ✅ CMS-First Architecture Complete

Your portfolio is now **CMS-first** with proper error handling:

### ✅ What's Done:

- **Removed hardcoded fallbacks** - No more outdated content
- **Added proper error handling** - Shows helpful error page when CMS unavailable
- **Smart project limiting** - API automatically shows only 3 Sky + 2 personal projects
- **Order-based control** - Change what shows via CMS order field
- **Built-in revalidation** - Content updates within 60 seconds

### ⚡ Quick Test (Without Strapi):

```bash
npm run dev
```

You'll see the error page saying "CMS not configured" - this is correct!

---

## 🚀 **Next Steps: Set Up Strapi**

### Option 1: Local Development (Recommended for testing)

```bash
# In a separate terminal/folder:
npx create-strapi-app@latest portfolio-cms --quickstart
cd portfolio-cms
npm run develop
```

1. Create admin account at http://localhost:1337/admin
2. Follow the content types setup in `STRAPI-SETUP.md`
3. Add your API token to `.env`
4. Add your content

### Option 2: Production First (Railway/Render)

- Deploy Strapi to Railway/Render first
- Update `STRAPI_API_URL` in `.env` to production URL
- Set up content remotely

---

## 🎨 **Content Control (The Magic!)**

### Show Only 3 Sky Projects:

```
Cricket Command Centre (Order: 1) ✅ Shows
Tough Mutter (Order: 2) ✅ Shows
News Assistant (Order: 3) ✅ Shows
Knowledge Search (Order: 4) ❌ Hidden
Email Processing (Order: 5) ❌ Hidden
```

### Show Only 2 Personal Projects:

```
inTENt-Fitness (Order: 1) ✅ Shows
Blockchain Marketplace (Order: 2) ✅ Shows
Others (Order: 3+) ❌ Hidden
```

### Want to Change What Shows?

1. Open Strapi admin
2. Change the **order** field numbers
3. Click **Save** and **Publish**
4. Your site updates automatically in 60 seconds!

**No code changes needed!** ✨

---

## 📱 **Testing Your Changes**

### Local Testing:

```bash
# Terminal 1: Start Strapi
cd portfolio-cms
npm run develop

# Terminal 2: Start Portfolio
cd martinnolan-dev
npm run dev
```

### Production Testing:

- Make changes in Strapi admin
- Check your live site in 60 seconds
- Changes appear automatically via ISR

---

## 🔧 **Environment Variables Explained**

```env
# Local Development
STRAPI_API_URL=http://localhost:1337/api
STRAPI_API_TOKEN=your_local_token

# Production
STRAPI_API_URL=https://your-strapi.railway.app/api
STRAPI_API_TOKEN=your_production_token
```

When these are set, your portfolio loads from CMS.
When missing, it shows the error page.

**No more outdated hardcoded content!** 🎉
