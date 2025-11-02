import { defineType } from 'sanity'
import { MdPhotoLibrary } from 'react-icons/md'

export default defineType({
  name: 'imageGalleryBlock',
  title: 'Image Gallery',
  type: 'object',
  icon: MdPhotoLibrary,
  fields: [
    {
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      description: 'Optional heading above the gallery',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Grid (Equal Height)', value: 'grid' },
          { title: 'Masonry (Pinterest Style)', value: 'masonry' },
          { title: 'Carousel (Slideshow)', value: 'carousel' },
        ],
      },
      initialValue: 'grid',
    },
    {
      name: 'columns',
      title: 'Number of Columns',
      type: 'string',
      description: 'For grid and masonry layouts',
      options: {
        list: [
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
          { title: '4 Columns', value: '4' },
          { title: 'Auto (Responsive)', value: 'auto' },
        ],
      },
      initialValue: '3',
      hidden: ({ parent }) => parent?.layout === 'carousel',
    },
    {
      name: 'gap',
      title: 'Gap Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'medium',
    },
    {
      name: 'aspectRatio',
      title: 'Image Aspect Ratio',
      type: 'string',
      description: 'For grid layout only',
      options: {
        list: [
          { title: '1:1 (Square)', value: '1/1' },
          { title: '4:3', value: '4/3' },
          { title: '16:9', value: '16/9' },
          { title: 'Original', value: 'original' },
        ],
      },
      initialValue: '16/9',
      hidden: ({ parent }) => parent?.layout !== 'grid',
    },
    {
      name: 'showCaptions',
      title: 'Show Captions',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'enableLightbox',
      title: 'Enable Lightbox',
      type: 'boolean',
      description: 'Allow clicking images to view full-size',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      imageCount: 'images.length',
      layout: 'layout',
      media: 'images.0',
    },
    prepare({ title, imageCount, layout, media }) {
      return {
        title: title || 'Image Gallery',
        subtitle: `${imageCount || 0} images - ${layout} layout`,
        media,
      }
    },
  },
})
