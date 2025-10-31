# Resort of Mexico

A modern, SEO-optimized affiliate travel website showcasing the best destinations in Mexico.

## Overview

Resort of Mexico is a Next.js-based travel site that helps visitors discover amazing destinations across Mexico while providing curated affiliate links for hotels, tours, and activities.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **UI Library**: Material UI (MUI)
- **CMS**: Sanity.io
- **Styling**: Emotion (CSS-in-JS)
- **Deployment**: Vercel (recommended)

## Key Features

- **SEO-First Architecture**: Built with search engine optimization as a priority
- **Dynamic Theming**: Theme colors, fonts, and branding managed via CMS
- **Page Builder**: Flexible block-based content system for editors
- **Affiliate Integration**: Smart affiliate link management and tracking
- **Performance Optimized**: Image optimization, code splitting, and caching
- **Mobile-First**: Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js 18+ (v22.20.0 recommended)
- npm, yarn, or pnpm
- Sanity.io account

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Sanity project details

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
/app              - Next.js App Router pages
/components       - React components
/lib              - Utility functions and configurations
/sanity           - Sanity Studio and schemas
/public           - Static assets
/styles           - Global styles and theme
```

## Development Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly
4. Create a pull request

## CMS Management

The Sanity Studio is accessible at `/studio` when running the development server. All content, including:
- Destinations
- Articles
- Navigation
- Theme settings
- SEO metadata

...is managed through the CMS.

## Deployment

This project is optimized for deployment on Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Documentation

- [Development Plan](./DEVELOPMENT_PLAN.md) - Comprehensive project roadmap
- [Architecture Documentation](./ARCHITECTURE.md) - System design (coming soon)

## Contributing

This is a private project. For any questions or issues, please contact the development team.

## License

Proprietary - All rights reserved
