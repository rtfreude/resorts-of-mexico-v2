# Deployment Guide - Resort of Mexico

## Overview

This guide provides step-by-step instructions for deploying both the Sanity CMS Studio and the Next.js application to production. All recommended solutions are cost-effective and optimized for this stack.

---

## Table of Contents

1. [Sanity Studio Deployment Options](#sanity-studio-deployment-options)
2. [Next.js Application Deployment Options](#nextjs-application-deployment-options)
3. [Recommended Deployment Architecture](#recommended-deployment-architecture)
4. [Step-by-Step Deployment Guide](#step-by-step-deployment-guide)
5. [Environment Variables Setup](#environment-variables-setup)
6. [Post-Deployment Checklist](#post-deployment-checklist)
7. [Cost Breakdown](#cost-breakdown)
8. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Sanity Studio Deployment Options

### Option 1: Embedded Studio (Current Setup - Recommended) ✅

**What it is:** Your Sanity Studio is already embedded in your Next.js app at `/studio` route.

**Pros:**
- ✅ No additional deployment needed
- ✅ Single URL for everything
- ✅ Easier to manage
- ✅ Free (included with Next.js hosting)
- ✅ Automatically deployed with your app

**Cons:**
- ⚠️ Studio shares resources with main site
- ⚠️ Studio is publicly accessible (but login protected)

**Cost:** $0 (included in Next.js hosting)

**Best for:** This project - you're already set up!

---

### Option 2: Separate Sanity Studio Deployment

**What it is:** Deploy Studio separately from your main site.

**Providers:**
- **Sanity's hosting** (most common)
- **Vercel** (separate project)
- **Netlify** (separate site)

**Pros:**
- ✅ Studio isolated from main site
- ✅ Can have custom domain (e.g., studio.resortofmexico.com)
- ✅ Better for large teams

**Cons:**
- ⚠️ More complex setup
- ⚠️ Need to manage CORS settings
- ⚠️ Additional deployment to maintain

**Cost:** $0 on most platforms

**How to deploy separately:**
```bash
# If you wanted to extract Studio to separate deployment
sanity deploy
```

**Recommendation:** Stick with embedded studio (Option 1) for this project.

---

## Next.js Application Deployment Options

### Option 1: Vercel (Highly Recommended) ⭐

**Why Vercel:**
- Built by Next.js creators
- Zero-configuration deployment
- Automatic HTTPS & CDN
- Perfect Next.js optimization
- Excellent free tier
- Built-in CI/CD from GitHub

**Pricing:**
- **Hobby (Free):** Perfect for this project
  - Unlimited deployments
  - 100 GB bandwidth/month
  - Automatic SSL
  - Preview deployments
  - Edge Functions
- **Pro ($20/month):** Only needed for high traffic
  - 1 TB bandwidth
  - Advanced analytics
  - Password protection

**Pros:**
- ✅ Best Next.js performance
- ✅ Automatic ISR support
- ✅ Zero config needed
- ✅ Generous free tier
- ✅ Excellent DX (developer experience)
- ✅ Preview deployments for PRs
- ✅ Built-in analytics

**Cons:**
- ⚠️ Can get expensive at scale (but unlikely for your use case)

**Best for:** This project (recommended!)

---

### Option 2: Netlify

**Why Netlify:**
- Similar to Vercel
- Good Next.js support
- Generous free tier
- Great for static sites

**Pricing:**
- **Starter (Free):**
  - 100 GB bandwidth/month
  - 300 build minutes/month
  - Automatic SSL
- **Pro ($19/month):**
  - 1 TB bandwidth

**Pros:**
- ✅ Good free tier
- ✅ Easy deployment
- ✅ Form handling built-in
- ✅ Split testing features

**Cons:**
- ⚠️ Not as optimized for Next.js as Vercel
- ⚠️ ISR can be tricky

**Best for:** Alternative if you prefer Netlify

---

### Option 3: Railway

**Why Railway:**
- Modern platform
- Great for full-stack apps
- PostgreSQL included if needed
- Pay-as-you-go pricing

**Pricing:**
- **Starter ($5/month):**
  - $5 credit included
  - Pay for what you use
  - Typically $5-15/month for this project

**Pros:**
- ✅ Affordable
- ✅ Easy to scale
- ✅ Database included
- ✅ Environment variable management

**Cons:**
- ⚠️ Not free tier
- ⚠️ Less Next.js optimization than Vercel

**Best for:** If you need database or backend services

---

### Option 4: DigitalOcean App Platform

**Why DigitalOcean:**
- Reliable infrastructure
- Predictable pricing
- Good for developers who know infrastructure

**Pricing:**
- **Basic ($5/month):**
  - 512MB RAM
  - 1 GB storage
- **Professional ($12/month):**
  - 1 GB RAM
  - Better performance

**Pros:**
- ✅ Predictable pricing
- ✅ Good performance
- ✅ Reliable infrastructure

**Cons:**
- ⚠️ More configuration needed
- ⚠️ Not free tier
- ⚠️ Less Next.js optimization

**Best for:** Developers familiar with DigitalOcean

---

## Recommended Deployment Architecture

### ⭐ Best Solution for This Project:

```
┌─────────────────────────────────────────────┐
│         Vercel (Free Tier)                  │
│  ┌────────────────────────────────────┐    │
│  │   Next.js Application               │    │
│  │   - Main site (/)                   │    │
│  │   - Embedded Studio (/studio)       │    │
│  │   - API Routes (/api)               │    │
│  └────────────────────────────────────┘    │
│                                             │
│  Features:                                  │
│  - Automatic HTTPS                          │
│  - CDN (Edge Network)                       │
│  - ISR (Incremental Static Regeneration)   │
│  - Preview Deployments                      │
└─────────────────────────────────────────────┘
                    ↓
         Connects to Sanity Cloud API
                    ↓
┌─────────────────────────────────────────────┐
│     Sanity Cloud (Free Tier)                │
│  - Content storage                          │
│  - Image CDN (Sanity CDN)                   │
│  - API (GROQ queries)                       │
│  - 3 users included                         │
│  - 10GB bandwidth/month                     │
└─────────────────────────────────────────────┘
```

**Total Monthly Cost: $0** (until you exceed free tier limits)

---

## Step-by-Step Deployment Guide

### Part 1: Prepare Your Repository

#### 1.1 Initialize Git Repository (if not done)

```bash
cd /Users/ryanfreude/Desktop/Resomex/Resort-of-Mexico
git init
git add .
git commit -m "Initial commit - Ready for deployment"
```

#### 1.2 Create GitHub Repository

1. Go to https://github.com/new
2. Create repository: `resort-of-mexico`
3. Don't initialize with README (we already have one)
4. Push your code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/resort-of-mexico.git
git branch -M main
git push -u origin main
```

#### 1.3 Create `.gitignore` (should already exist)

Ensure these are in `.gitignore`:
```
.env.local
.env*.local
node_modules
.next
.DS_Store
```

---

### Part 2: Configure Sanity for Production

#### 2.1 Add Production URL to CORS

1. Go to https://www.sanity.io/manage
2. Select your project: `ou5bzfqd`
3. Go to **API** → **CORS Origins**
4. Add your production URL (you'll get this from Vercel):
   - `https://your-app.vercel.app`
   - Allow credentials: ✅ Yes

#### 2.2 Create Production Dataset (Optional)

You can use separate datasets for staging/production:

```bash
# Create production dataset
sanity dataset create production

# Or use the existing dataset
# (recommended for simplicity)
```

---

### Part 3: Deploy to Vercel

#### 3.1 Sign Up for Vercel

1. Go to https://vercel.com/signup
2. Sign up with GitHub (recommended)
3. Authorize Vercel to access your repositories

#### 3.2 Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository: `resort-of-mexico`
3. Vercel will detect Next.js automatically

#### 3.3 Configure Environment Variables

In Vercel project settings, add these environment variables:

**Required:**
```
NEXT_PUBLIC_SANITY_PROJECT_ID=ou5bzfqd
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=https://YOUR_APP.vercel.app
```

**Optional (for draft/preview mode):**
```
SANITY_API_TOKEN=your_read_token_here
```

**How to get SANITY_API_TOKEN:**
1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to **API** → **Tokens**
4. Click **"Add API Token"**
5. Name: "Vercel Production Read"
6. Permissions: **Viewer** (read-only)
7. Copy the token
8. Add to Vercel environment variables

#### 3.4 Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Your site will be live at: `https://your-app.vercel.app`

#### 3.5 Add Custom Domain (Optional)

1. Buy domain (Namecheap, Google Domains, etc.)
2. In Vercel project: **Settings** → **Domains**
3. Add your domain: `resortofmexico.com`
4. Follow DNS configuration instructions
5. Vercel automatically handles SSL

**Recommended domain registrars:**
- **Namecheap** (~$12/year for .com)
- **Google Domains** (~$12/year for .com)
- **Cloudflare** (~$10/year for .com)

---

### Part 4: Configure Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Push to `main` branch** → Production deployment
- **Open Pull Request** → Preview deployment
- **Push to other branches** → Preview deployment

**Workflow:**
```bash
# Make changes locally
git add .
git commit -m "Update content structure"
git push origin main

# Vercel automatically deploys in ~2 minutes
```

---

## Environment Variables Setup

### Local Development (.env.local)

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=ou5bzfqd
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Site URL (local)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: Preview/Draft Mode
SANITY_API_TOKEN=your_token_here
```

### Production (Vercel Environment Variables)

Same variables, but update:
```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Environment Variable Security

- ✅ `NEXT_PUBLIC_*` variables are safe (exposed to browser)
- ⚠️ `SANITY_API_TOKEN` is private (server-only)
- ⚠️ Never commit `.env.local` to Git

---

## Post-Deployment Checklist

### Immediate Steps After Deployment

- [ ] Test main site loads: `https://your-app.vercel.app`
- [ ] Test Studio access: `https://your-app.vercel.app/studio`
- [ ] Log into Studio with your Sanity account
- [ ] Test creating a test page in Studio
- [ ] Verify page appears on frontend
- [ ] Check that images load correctly
- [ ] Test navigation and links

### SEO Configuration

- [ ] Update `NEXT_PUBLIC_SITE_URL` to production URL
- [ ] Submit sitemap to Google: `https://your-app.vercel.app/sitemap.xml`
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Create `robots.txt` (already done ✅)
- [ ] Test structured data: https://search.google.com/test/rich-results

### Performance Testing

- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Test on mobile devices
- [ ] Test page load times
- [ ] Verify ISR is working (pages regenerate)

### Security

- [ ] Verify HTTPS is working
- [ ] Test that `/studio` requires login
- [ ] Verify environment variables are not exposed
- [ ] Set up CORS correctly in Sanity

---

## Cost Breakdown

### Scenario 1: Basic Launch (Recommended)

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Hobby (Free) | $0/month |
| Sanity | Free Tier | $0/month |
| Domain (optional) | .com domain | $12/year (~$1/month) |
| **Total** | | **~$1/month** |

**Free tier limits:**
- Vercel: 100 GB bandwidth/month (plenty for starting)
- Sanity: 10 GB bandwidth/month, 3 users

---

### Scenario 2: Growing Traffic

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Hobby (Free) | $0/month |
| Sanity | Growth Plan | $99/month |
| Domain | .com domain | $12/year (~$1/month) |
| **Total** | | **~$100/month** |

**When you need this:**
- More than 3 CMS users
- More than 10 GB Sanity bandwidth
- Need advanced Sanity features

---

### Scenario 3: High Traffic

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Pro | $20/month |
| Sanity | Growth | $99/month |
| Domain | .com domain | $12/year (~$1/month) |
| **Total** | | **~$120/month** |

**When you need this:**
- More than 100 GB vercel bandwidth
- Need team features
- Want advanced analytics

---

## Monitoring & Maintenance

### Built-in Monitoring (Free)

**Vercel Dashboard:**
- Deployment history
- Build logs
- Runtime logs
- Basic analytics

**Sanity Dashboard:**
- Content history
- User activity
- API usage
- Dataset size

### Recommended Monitoring Tools

**Free Options:**
1. **Google Analytics 4** (Free)
   - Track page views
   - User behavior
   - Traffic sources

2. **Vercel Analytics** (Included in Pro plan)
   - Core Web Vitals
   - Real user metrics
   - Performance insights

3. **Sentry** (Free tier available)
   - Error tracking
   - Performance monitoring
   - 5,000 events/month free

### Maintenance Tasks

**Weekly:**
- Check Vercel deployments for errors
- Review Sanity API usage

**Monthly:**
- Review bandwidth usage (Vercel + Sanity)
- Check for Next.js updates
- Review error logs

**Quarterly:**
- Update dependencies: `npm update`
- Security audit: `npm audit fix`
- Lighthouse performance audit
- Review and optimize images

---

## Troubleshooting Common Issues

### Issue: Studio loads but can't connect to Sanity

**Solution:**
1. Check CORS settings in Sanity dashboard
2. Add production URL to allowed origins
3. Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct

### Issue: Environment variables not working

**Solution:**
1. Verify variables in Vercel dashboard
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)

### Issue: Images not loading

**Solution:**
1. Verify Sanity image CDN URL in `next.config.js`
2. Check image domains are allowed
3. Test image URL directly in browser

### Issue: ISR not working (content not updating)

**Solution:**
1. Check `revalidate` values in page components
2. Verify Sanity API token has read permissions
3. Test by manually redeploying

### Issue: 404 on dynamic routes

**Solution:**
1. Verify `generateStaticParams` is working
2. Check slug format in Sanity
3. Test route generation locally first

---

## Alternative Deployment Scenarios

### Scenario A: No Custom Domain (Free Forever)

```
Vercel Free Tier: https://resort-of-mexico.vercel.app
Sanity Free Tier
Total: $0/month
```

**Perfect for:**
- Personal projects
- Portfolio sites
- Testing/development

---

### Scenario B: Custom Domain + Free Hosting

```
Vercel Free Tier + Custom Domain
Domain: $12/year
Total: $1/month
```

**Perfect for:**
- Professional sites
- Client projects
- This project (recommended!)

---

### Scenario C: Railway (Alternative to Vercel)

```
Railway: $5-15/month (pay for usage)
Custom domain included
Sanity Free Tier
Total: $5-15/month
```

**Perfect for:**
- Need more backend features
- Prefer usage-based pricing
- Want full control

---

## Backup & Disaster Recovery

### Sanity Backups (Built-in)

Sanity automatically backs up your content:
- Version history for all documents
- Can restore any previous version
- Export dataset anytime:

```bash
sanity dataset export production backup.tar.gz
```

### Code Backups

Your code is backed up in:
- GitHub (version control)
- Vercel (deployment history)
- Local machine

### Disaster Recovery Plan

1. **Content loss:** Restore from Sanity version history
2. **Code issue:** Revert to previous Git commit
3. **Deployment issue:** Rollback in Vercel dashboard
4. **Complete failure:** Redeploy from GitHub in minutes

---

## Next Steps After Deployment

1. **Add Content:**
   - Create 5-10 destination pages
   - Write 10-15 articles
   - Upload optimized images

2. **SEO Setup:**
   - Submit sitemap to search engines
   - Set up Google Search Console
   - Verify structured data

3. **Monitoring:**
   - Set up Google Analytics
   - Monitor Vercel analytics
   - Check error rates

4. **Marketing:**
   - Share site on social media
   - Start building backlinks
   - Create content calendar

---

## Support & Resources

### Official Documentation

- **Vercel:** https://vercel.com/docs
- **Sanity:** https://www.sanity.io/docs
- **Next.js:** https://nextjs.org/docs

### Community Support

- **Vercel Discord:** https://vercel.com/discord
- **Sanity Slack:** https://slack.sanity.io
- **Next.js Discord:** https://nextjs.org/discord

### Paid Support Options

- **Vercel Pro:** Priority support included
- **Sanity Growth:** Email support included
- **Vercel Enterprise:** Dedicated support team

---

## Conclusion

**Recommended Setup for Resort of Mexico:**

1. ✅ Deploy to **Vercel** (Free tier to start)
2. ✅ Keep **embedded Sanity Studio** at `/studio`
3. ✅ Use **Sanity Free tier** (upgrade when needed)
4. ✅ Add **custom domain** when ready ($12/year)
5. ✅ Set up **automatic deployments** from GitHub

**Total Cost to Start: $0/month**
**With Custom Domain: ~$1/month**

This setup is:
- Production-ready
- Scalable
- Easy to maintain
- Cost-effective
- Perfect for this project

You can work on your site from anywhere with internet access:
- Edit content in Sanity Studio
- Push code changes from any machine
- Automatic deployments handle the rest

**Ready to deploy?** Follow the [Step-by-Step Deployment Guide](#step-by-step-deployment-guide) above!
