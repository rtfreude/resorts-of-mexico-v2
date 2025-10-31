import { groq } from 'next-sanity'

// Query to fetch global settings
export const globalSettingsQuery = groq`
  *[_type == "globalSettings"][0] {
    _id,
    title,
    description,
    primaryColor,
    secondaryColor,
    logo {
      asset->{
        _id,
        url
      },
      alt
    },
    logoDark {
      asset->{
        _id,
        url
      },
      alt
    },
    fontFamily,
    socialMedia,
    defaultAffiliateId,
    ogImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }
`

// TypeScript type for Global Settings
export interface GlobalSettings {
  _id: string
  title: string
  description: string
  primaryColor?: {
    hex: string
    alpha?: number
  }
  secondaryColor?: {
    hex: string
    alpha?: number
  }
  logo?: {
    asset: {
      _id: string
      url: string
    }
    alt: string
  }
  logoDark?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  fontFamily?: string
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
    youtube?: string
    pinterest?: string
  }
  defaultAffiliateId?: string
  ogImage?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
}
