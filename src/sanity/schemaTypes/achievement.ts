// src/sanity/schemaTypes/achievement.ts
export default {
  name: 'achievement',
  title: 'Achievements',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Achievement Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Academic', value: 'academic' },
          { title: 'Research', value: 'research' },
          { title: 'Professional', value: 'professional' },
          { title: 'Competition', value: 'competition' },
          { title: 'Award', value: 'award' },
          { title: 'Certification', value: 'certification' },
          { title: 'Other', value: 'other' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'date',
      title: 'Achievement Date',
      type: 'date',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'organization',
      title: 'Awarding Organization',
      type: 'string'
    },
    {
      name: 'images',
      title: 'Achievement Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string'
            }
          ]
        }
      ],
      description: 'Upload multiple images for this achievement'
    },
    {
      name: 'certificateLink',
      title: 'Certificate Link (URL)',
      type: 'url',
      description: 'External link to certificate (optional)'
    },
    {
      name: 'certificatePDF',
      title: 'Certificate PDF',
      type: 'file',
      description: 'Upload certificate as PDF (optional)',
      options: {
        accept: '.pdf'
      }
    },
    {
      name: 'highlights',
      title: 'Key Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List key highlights or accomplishments'
    },
    {
      name: 'featured',
      title: 'Featured Achievement',
      type: 'boolean',
      description: 'Mark this achievement as featured',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first'
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      date: 'date',
      images: 'images'
    },
    prepare(selection: any) {
      const { title, category, date, images } = selection;
      return {
        title: title,
        subtitle: `${category || 'Uncategorized'} - ${date || 'No date'}`,
        media: images && images[0]
      };
    }
  },
  orderings: [
    {
      title: 'Date, New to Old',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }]
    },
    {
      title: 'Date, Old to New',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }]
    },
    {
      title: 'Order',
      name: 'order',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
};
