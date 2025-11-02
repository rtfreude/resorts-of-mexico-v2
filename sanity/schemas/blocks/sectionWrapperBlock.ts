import { defineField, defineType } from 'sanity'
import { MdViewModule } from 'react-icons/md'

export default defineType({
  name: 'sectionWrapperBlock',
  title: 'Section Wrapper',
  type: 'object',
  icon: MdViewModule,
  description: 'A container to group content blocks with background styling and spacing options',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Internal title to identify this section (not displayed on frontend)',
    }),
    defineField({
      name: 'content',
      title: 'Content Blocks',
      type: 'array',
      description: 'Blocks to display within this section',
      of: [
        { type: 'textBlock' },
        { type: 'imageBlock' },
        { type: 'textImageBlock' },
        { type: 'cardGridBlock' },
        { type: 'accordionBlock' },
        { type: 'statsBlock' },
        { type: 'quoteBlock' },
        { type: 'imageGalleryBlock' },
        { type: 'videoBlock' },
        { type: 'tabBlock' },
        { type: 'pricingCardBlock' },
        { type: 'testimonialCarouselBlock' },
        { type: 'headingBlock' },
        { type: 'amenitiesBlock' },
        { type: 'spacerBlock' },
      ],
      validation: (Rule) => Rule.min(1).required(),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Background color for the section',
      options: {
        list: [
          { title: 'None (Transparent)', value: 'transparent' },
          { title: 'White', value: 'white' },
          { title: 'Light Grey', value: 'grey.50' },
          { title: 'Medium Grey', value: 'grey.100' },
          { title: 'Primary Light', value: 'primary.light' },
          { title: 'Primary Main', value: 'primary.main' },
          { title: 'Primary Dark', value: 'primary.dark' },
          { title: 'Secondary Light', value: 'secondary.light' },
          { title: 'Secondary Main', value: 'secondary.main' },
          { title: 'Gradient (Primary to Secondary)', value: 'gradient' },
        ],
        layout: 'radio',
      },
      initialValue: 'transparent',
    }),
    defineField({
      name: 'paddingTop',
      title: 'Padding Top',
      type: 'string',
      description: 'Space above content',
      options: {
        list: [
          { title: 'None', value: '0' },
          { title: 'Small (24px)', value: '3' },
          { title: 'Medium (48px)', value: '6' },
          { title: 'Large (72px)', value: '9' },
          { title: 'Extra Large (96px)', value: '12' },
        ],
        layout: 'dropdown',
      },
      initialValue: '6',
    }),
    defineField({
      name: 'paddingBottom',
      title: 'Padding Bottom',
      type: 'string',
      description: 'Space below content',
      options: {
        list: [
          { title: 'None', value: '0' },
          { title: 'Small (24px)', value: '3' },
          { title: 'Medium (48px)', value: '6' },
          { title: 'Large (72px)', value: '9' },
          { title: 'Extra Large (96px)', value: '12' },
        ],
        layout: 'dropdown',
      },
      initialValue: '6',
    }),
    defineField({
      name: 'containerWidth',
      title: 'Container Width',
      type: 'string',
      description: 'Maximum width constraint',
      options: {
        list: [
          { title: 'Full Width (No container)', value: 'full' },
          { title: 'Standard (1200px)', value: 'lg' },
          { title: 'Wide (1536px)', value: 'xl' },
          { title: 'Narrow (900px)', value: 'md' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'lg',
    }),
    defineField({
      name: 'addTopBorder',
      title: 'Add Top Border',
      type: 'boolean',
      description: 'Add a decorative border at the top of the section',
      initialValue: false,
    }),
    defineField({
      name: 'addBottomBorder',
      title: 'Add Bottom Border',
      type: 'boolean',
      description: 'Add a decorative border at the bottom of the section',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      backgroundColor: 'backgroundColor',
      contentLength: 'content.length',
    },
    prepare(selection) {
      const { title, backgroundColor, contentLength } = selection
      const bgLabel = backgroundColor === 'transparent' ? 'No BG' : backgroundColor
      return {
        title: title || 'Section Wrapper',
        subtitle: `${contentLength || 0} blocks • ${bgLabel}`,
        media: MdViewModule,
      }
    },
  },
})
