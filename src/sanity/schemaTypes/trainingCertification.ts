// schemas/trainingCertification.ts
export default {
  name: 'trainingCertification',
  title: 'Training & Certification',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Course/Training Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'issuer',
      title: 'Issuing Organization',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Completion Date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'link',
      title: 'Certificate Link (optional)',
      type: 'url',
    },
    {
      name: 'file',
      title: 'Certificate PDF (optional)',
      type: 'file',
    },
    {
      name: 'description',
      title: 'Description (optional)',
      type: 'text',
      rows: 3,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'issuer',
      date: 'date',
    },
    prepare(selection: any) {
      const { title, subtitle, date } = selection;
      return {
        title,
        subtitle: `${subtitle} • ${new Date(date).getFullYear()}`,
      };
    },
  },
};
