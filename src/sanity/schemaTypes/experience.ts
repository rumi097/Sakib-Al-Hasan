// schemas/experience.ts
export default {
  name: 'experience',
  title: 'Experience Entry',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
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
      type: 'array',
      of: [{ type: 'block' }], // Rich text for bullet points
    },
  ],
};