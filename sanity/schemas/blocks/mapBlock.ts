import { defineField, defineType } from 'sanity'
import { MdMap } from 'react-icons/md'

export default defineType({
  name: 'mapBlock',
  title: 'Map',
  type: 'object',
  icon: MdMap,
  description: 'Display an interactive map with location markers',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional heading above the map',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional text below the title',
    }),
    defineField({
      name: 'mapType',
      title: 'Map Type',
      type: 'string',
      description: 'Choose between embedded map or static image',
      options: {
        list: [
          { title: 'Google Maps Embed', value: 'embed' },
          { title: 'Static Map Image', value: 'static' },
        ],
        layout: 'radio',
      },
      initialValue: 'embed',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'embedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'Get this from Google Maps > Share > Embed a map',
      hidden: ({ parent }) => parent?.mapType !== 'embed',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          if (parent?.mapType === 'embed' && !value) {
            return 'Embed URL is required for Google Maps embeds'
          }
          return true
        }),
    }),
    defineField({
      name: 'staticImage',
      title: 'Static Map Image',
      type: 'image',
      description: 'Upload a custom map image',
      hidden: ({ parent }) => parent?.mapType !== 'static',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any
          if (parent?.mapType === 'static' && !value) {
            return 'Map image is required for static maps'
          }
          return true
        }),
    }),
    defineField({
      name: 'locations',
      title: 'Location Markers',
      type: 'array',
      description: 'Points of interest to display on the map',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Location Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'address',
              title: 'Address',
              type: 'text',
              rows: 2,
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: '📍 Pin', value: 'pin' },
                  { title: '🏨 Hotel', value: 'hotel' },
                  { title: '✈️ Airport', value: 'airport' },
                  { title: '🏖️ Beach', value: 'beach' },
                  { title: '🍽️ Restaurant', value: 'restaurant' },
                  { title: '🛍️ Shopping', value: 'shopping' },
                  { title: '🎭 Attraction', value: 'attraction' },
                ],
              },
              initialValue: 'pin',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'address',
              icon: 'icon',
            },
            prepare({ title, subtitle, icon }) {
              const iconMap: Record<string, string> = {
                pin: '📍',
                hotel: '🏨',
                airport: '✈️',
                beach: '🏖️',
                restaurant: '🍽️',
                shopping: '🛍️',
                attraction: '🎭',
              }
              return {
                title: `${iconMap[icon] || '📍'} ${title}`,
                subtitle,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'height',
      title: 'Map Height',
      type: 'string',
      description: 'Height of the map container',
      options: {
        list: [
          { title: 'Small (300px)', value: '300' },
          { title: 'Medium (450px)', value: '450' },
          { title: 'Large (600px)', value: '600' },
          { title: 'Extra Large (800px)', value: '800' },
        ],
        layout: 'dropdown',
      },
      initialValue: '450',
    }),
    defineField({
      name: 'showLocationList',
      title: 'Show Location List',
      type: 'boolean',
      description: 'Display a list of locations beside or below the map',
      initialValue: true,
    }),
    defineField({
      name: 'locationListPosition',
      title: 'Location List Position',
      type: 'string',
      description: 'Where to display the location list',
      options: {
        list: [
          { title: 'Right Side', value: 'right' },
          { title: 'Left Side', value: 'left' },
          { title: 'Below Map', value: 'below' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
      hidden: ({ parent }) => !parent?.showLocationList,
    }),
    defineField({
      name: 'borderRadius',
      title: 'Border Radius',
      type: 'boolean',
      description: 'Add rounded corners to the map',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      mapType: 'mapType',
      locationCount: 'locations.length',
    },
    prepare(selection) {
      const { title, mapType, locationCount } = selection
      const typeLabel = mapType === 'embed' ? 'Embed' : 'Static'
      return {
        title: title || 'Map Block',
        subtitle: `${typeLabel} • ${locationCount || 0} locations`,
        media: MdMap,
      }
    },
  },
})
