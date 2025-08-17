# 🚀 Strapi CMS Setup Guide

## Quick Setup (10 minutes)

### 1. Install Strapi Locally

```bash
# In a separate directory (not in your portfolio project)
npx create-strapi-app@latest portfolio-cms --quickstart
cd portfolio-cms
npm run develop
```

This will:

- Create a new Strapi project
- Set up SQLite database (perfect for development)
- Start the admin panel at http://localhost:1337/admin

### 2. Create Admin Account

- Visit http://localhost:1337/admin
- Create your admin account (use your actual email)

### 3. Create Content Types

#### A. Profile (Single Type)

1. Go to Content-Type Builder
2. Create Single Type called "Profile"
3. Add these fields:

```
- fullName: Text (Short text)
- title: Text (Short text)
- company: Text (Short text)
- bio: Rich Text
- heroTitle: Text (Short text)
- heroSubtitle: Text (Long text)
- tagline: Text (Short text)
- email: Email
- website: Text (Short text)
- linkedin: Text (Short text)
- github: Text (Short text)
- seoTitle: Text (Short text)
- seoDescription: Text (Long text)
- skills: Component (repeatable)
  -     : Text (Short text)
```

#### B. Experience (Collection Type)

1. Create Collection Type "Experience"
2. Add these fields:

```
- role: Text (Short text)
- company: Text (Short text)
- period: Text (Short text)
- description: Rich Text
- achievements: Component (repeatable)
  - achievement: Text (Long text)
- order: Number (Integer)
```

#### C. Featured Project (Collection Type)

1. Create Collection Type "Featured Project"
2. Add these fields:

```
- title: Text (Short text)
- role: Text (Short text)
- year: Text (Short text)
- company: Text (Short text)
- description: Rich Text
- category: Text (Short text)
- stack: Component (repeatable)
  - technology: Text (Short text)
- highlights: Component (repeatable)
  - highlight: Text (Long text)
- images: Component (repeatable)
  - src: Text (Short text)
  - description: Text (Short text)
- order: Number (Integer)
```

#### D. Personal Project (Collection Type)

1. Create Collection Type "Personal Project"
2. Add these fields:

```
- title: Text (Short text)
- description: Rich Text
- category: Text (Short text)
- github: Text (Short text)
- stack: Component (repeatable)
  - technology: Text (Short text)
- order: Number (Integer)
```

#### E. Contact Method (Collection Type)

1. Create Collection Type "Contact Method"
2. Add these fields:

```
- title: Text (Short text)
- description: Text (Short text)
- value: Text (Short text)
- href: Text (Short text)
- icon: Text (Short text)
- primary: Boolean
- order: Number (Integer)
```

### 4. Configure API Permissions

1. Go to Settings > Roles > Public
2. Enable these permissions:
   - Profile: find
   - Experience: find, findOne
   - Featured Project: find, findOne
   - Personal Project: find, findOne
   - Contact Method: find, findOne

### 5. Create API Token

1. Go to Settings > API Tokens
2. Create new token:
   - Name: "Portfolio Website"
   - Type: "Read-only"
   - Duration: "Unlimited"
3. Copy the token (you'll need this!)

### 6. Add Environment Variables

In your portfolio project `.env.local`:

```env
STRAPI_API_URL=http://localhost:1337/api
STRAPI_API_TOKEN=your_api_token_here
```

---

## Content Management Guide

### Adding Your First Content

#### 1. Profile (Single Type)

- Go to Content Manager > Profile
- Click "Create new entry"
- Fill in your information:
  - **fullName**: "Martin Nolan"
  - **title**: "Associate Gen AI Software Engineer"
  - **company**: "Sky UK"
  - **bio**: Your full bio in rich text
  - **heroTitle**: "Engineering Generative AI for Real-World Impact"
  - **heroSubtitle**: Your tagline
  - **skills**: Add each skill as a separate component

#### 2. Work Experience

- Go to Content Manager > Experience
- Create entries for each job:
  - **role**: "Associate Gen AI Software Engineer"
  - **company**: "Sky UK"
  - **period**: "Jul 2025 – Present"
  - **order**: 1 (higher = shows first)
  - **achievements**: Add each achievement as component

#### 3. Featured Projects

- Add your Sky projects
- Set **order** field to control which show first
- **Want only 3 Sky projects?** Set order to 1, 2, 3 for the ones you want

#### 4. Personal Projects

- Add your personal projects
- **Want only 2 personal projects?** Set order to 1, 2 for the ones you want

---

## Managing Content (No Code Deployments!)

### ✅ What You Can Change Without Redeployment:

- ✅ **All text content** (bio, descriptions, titles)
- ✅ **Which projects show** (change order field)
- ✅ **How many projects show** (unpublish extras)
- ✅ **Project details** (stack, highlights, descriptions)
- ✅ **Skills list** (add/remove skills)
- ✅ **Contact information**
- ✅ **SEO settings** (titles, descriptions)

### How to Control What Shows:

1. **Show only 3 Sky projects**: Set order 1, 2, 3 on favorites, leave others at 999
2. **Show only 2 personal projects**: Set order 1, 2 on favorites
3. **Hide projects temporarily**: Click "Unpublish"
4. **Reorder projects**: Change the order numbers

### Publishing Changes:

1. Make your changes in Strapi admin
2. Click "Save"
3. Click "Publish"
4. Your website will update within 60 seconds!

---

## Production Deployment (Free Options)

### Option 1: Railway (Recommended)

```bash
# Push your Strapi project to GitHub
# Connect to Railway
# Deploy with PostgreSQL addon
```

### Option 2: Render

```bash
# Deploy to Render with PostgreSQL
# Set environment variables
```

### Option 3: Strapi Cloud (Easiest)

- Visit strapi.io
- Deploy directly from admin panel
- Includes hosting + database

---

## Content Strategy

### Sky Projects (Featured - Show 3):

1. **Cricket Command Centre** (Order: 1)
2. **Tough Mutter** (Order: 2)
3. **News Content Assistant** (Order: 3)
4. **Knowledge Search** (Order: 4, won't show)
5. **Email Processing** (Order: 5, won't show)

### Personal Projects (Show 2):

1. **inTENt-Fitness** (Order: 1)
2. **Blockchain Marketplace** (Order: 2)
3. **Others** (Order: 3+, won't show)

This way you control exactly what shows without touching code!
