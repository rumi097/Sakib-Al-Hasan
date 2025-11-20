// sanity/schemas/nextGenSection.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'nextGenSection',
  title: 'NextGen Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'e.g., "Workshops & Training", "Community Outreach"',
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      description: 'A brief summary of this category of activities.',
    }),
    defineField({
      name: 'activityGroups',
      title: 'Activity Groups',
      type: 'array',
      description: 'Add one or more groups of activities for this section.',
      of: [
        {
          type: 'object',
          name: 'activityGroup',
          title: 'Activity Group',
          fields: [
            {
              name: 'groupTitle',
              title: 'Group Title',
              type: 'string',
              description: 'e.g., "AI Workshop at BSMRSTU", "Rural Coding Camp"',
            },
            {
              name: 'groupDescription',
              title: 'Group Description',
              type: 'text',
            },
            {
              name: 'gallery',
              title: 'Image Gallery (3-5 images)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'galleryImage',
                  fields: [
                    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
                    { name: 'heading', title: 'Image Heading', type: 'string' },
                    { name: 'description', title: 'Image Description', type: 'string' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})