// sanity/schemas/education.ts

export default {
  name: 'education',
  title: 'Education',
  type: 'document', // <-- This "document" type lets your client add unlimited new degrees
  fields: [
    {
      name: 'degree',
      title: 'Degree / Program',
      type: 'string',
      description: 'e.g., "Bachelor of Pharmacy", "Higher Secondary Certificate"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'institution',
      title: 'Institution',
      type: 'string',
      description: 'e.g., "Gopalganj Science and Technology University", "Govt. Abdul Jabber College"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "Gopalganj, Bangladesh"',
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      options: {
        dateFormat: 'MMMM YYYY',
      },
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Leave this empty if your client is still studying here.',
      options: {
        dateFormat: 'MMMM YYYY',
      },
    },
    {
      name: 'description',
      title: 'Description',
      description: 'Optional. Add a brief description, e.g., "CGPA: 3.52" or "Key courses..."',
      type: 'text',
    },
    {
      name: 'certificates',
      title: 'Certificates & Documents',
      description: 'Add one or more certificates, marksheets, or documents for this degree.',
      type: 'array', // <-- This lets you add unlimited certificates
      of: [
        {
          name: 'certificate',
          title: 'Certificate',
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Certificate Name',
              description: 'e.g., "Graduation Certificate" or "H.S.C. Marksheet"',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Certificate Image',
              type: 'image',
              description: 'Upload a screenshot or photo of the certificate.',
            },
            {
              name: 'link',
              title: 'Certificate Link',
              description: 'A link to view the certificate online (e.g., on a verification site)',
              type: 'url',
            },
          ],
        },
      ],
    },
  ],
  // This makes the list in Sanity Studio look nice
  preview: {
    select: {
      title: 'degree',
      subtitle: 'institution',
    },
  },
}