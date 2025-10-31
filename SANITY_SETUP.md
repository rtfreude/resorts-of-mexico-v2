# Sanity CMS Setup Guide

This guide will help you set up your Sanity project and connect it to this Next.js application.

## Prerequisites

- Node.js 18+ installed
- A Sanity account (free tier available at [sanity.io](https://www.sanity.io))

## Step 1: Create a Sanity Project

1. Visit [sanity.io/manage](https://www.sanity.io/manage) and create a new account or log in
2. Click "Create new project"
3. Choose a name for your project (e.g., "Resort of Mexico")
4. Choose the dataset name (default: "production")
5. Note your **Project ID** - you'll need this for the next step

## Step 2: Configure Environment Variables

Create a `.env.local` file in the root of this project with the following variables:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# For authenticated requests (optional, for preview mode)
SANITY_API_TOKEN=your_api_token_here
```

### Getting Your API Token (Optional)

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to "API" tab
4. Click "Add API token"
5. Give it a name (e.g., "Next.js Preview")
6. Set permissions to "Editor" or "Read"
7. Copy the token to your `.env.local` file

## Step 3: Configure CORS

To allow your Next.js app to communicate with Sanity:

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to "API" tab
4. Under "CORS Origins", click "Add CORS origin"
5. Add the following origins:
   - `http://localhost:3000` (for local development)
   - Your production URL (when deployed)
6. Check "Allow credentials"
7. Save

## Step 4: Access Sanity Studio

Once configured, you can access the Sanity Studio at:

**Local Development:** [http://localhost:3000/studio](http://localhost:3000/studio)

The studio is embedded directly in your Next.js application!

## Step 5: Create Initial Content

1. Navigate to [http://localhost:3000/studio](http://localhost:3000/studio)
2. Click on "Global Settings" in the sidebar
3. Fill in your site information:
   - Site Title
   - Description
   - Brand Colors
   - Logo
   - Social Media Links
   - etc.

## Current Schemas

### Global Settings (Singleton)

The Global Settings schema allows you to manage:
- Site title and description
- Primary and secondary brand colors
- Logo (light and dark versions)
- Font family selection
- Social media links
- Default affiliate ID
- Open Graph image for social sharing

More schemas will be added as development progresses.

## Deploying Sanity Studio

The Sanity Studio is automatically deployed with your Next.js application. No separate deployment needed!

## Troubleshooting

### "Invalid Project ID" Error

Make sure your `.env.local` file has the correct `NEXT_PUBLIC_SANITY_PROJECT_ID` and restart your dev server.

### CORS Error

Add your domain to the CORS origins in the Sanity dashboard (see Step 3).

### Can't Access Studio

Make sure you're logged in to Sanity in your browser. Visit [sanity.io/manage](https://www.sanity.io/manage) and log in first.

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/plugins/next-sanity)
- [Sanity Schema Documentation](https://www.sanity.io/docs/schema-types)
