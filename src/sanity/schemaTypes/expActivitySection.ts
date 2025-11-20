// sanity/schemas/expActivitySection.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'expActivitySection',
  title: 'Experience Activity Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'e.g., "Software Projects", "Research Projects", "Case Studies"',
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
    }),
    defineField({
      name: 'activityGroups',
      title: 'Activity Groups (Subsections)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'activityGroup',
          title: 'Activity Group',
          fields: [
            { name: 'groupTitle', title: 'Group Title', type: 'string' },
            { name: 'groupDescription', title: 'Group Description', type: 'text' },
            {
              name: 'gallery',
              title: 'Image Gallery',
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
})