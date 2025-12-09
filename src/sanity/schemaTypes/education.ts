// sanity/schemas/education.ts

export default {
  name: 'education',
  title: 'Education',
  type: 'document', // <-- This "document" type lets your client add unlimited new degrees
  fields: [
    {
      name: 'section',
      title: 'Section',
      type: 'string',
      description: 'Group entries by section, e.g., "College", "University"',
    },
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
            {
              name: 'file',
              title: 'PDF File',
              type: 'file',
              options: { accept: '.pdf' },
              description: 'Upload a PDF version of the certificate (optional).',
            },
          ],
        },
      ],
    },
    {
      name: 'semesters',
      title: 'Semesters',
      description: 'Add semester-wise results and documents (e.g., 1.1, 1.2, Academic Transcript).',
      type: 'array',
      of: [
        {
          name: 'semester',
          title: 'Semester',
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label (e.g., 1.1)',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Title (optional)',
              type: 'string',
              description: 'e.g., First Year First Semester',
            },
            {
              name: 'result',
              title: 'Result / GPA',
              type: 'string',
              description: 'e.g., GPA: 3.85',
            },
            {
              name: 'documents',
              title: 'Documents (PDF or Link)',
              type: 'array',
              of: [
                {
                  name: 'eduDocument',
                  title: 'Document',
                  type: 'object',
                  fields: [
                    { name: 'name', title: 'Name', type: 'string' },
                    { name: 'link', title: 'External Link', type: 'url' },
                    { name: 'file', title: 'PDF File', type: 'file', options: { accept: '.pdf' } },
                  ],
                },
              ],
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