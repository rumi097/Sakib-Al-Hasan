// schemas/organization.ts
export default {
  name: 'organization',
  title: 'Organization/Affiliation',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Organization Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Your Role/Position',
      type: 'string',
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    },
    {
      name: 'endDate',
      title: 'End Date (leave empty if current)',
      type: 'date',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'logo',
      title: 'Organization Logo',
      type: 'image',
    },
  ],
};