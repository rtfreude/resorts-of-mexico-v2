import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { colorInput } from '@sanity/color-input'
import { schemaTypes } from './sanity/schemas'

// Determine the preview URL based on the environment
const getPreviewUrl = () => {
  // In production, use the site URL from environment variable or infer from window location
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  // Fallback to environment variable
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

export default defineConfig({
  name: 'default',
  title: 'Resort of Mexico',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: getPreviewUrl(),
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
