// schemas/publication.ts
export default {
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Publication Title',
      type: 'string',
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'journalConference',
      title: 'Journal/Conference',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
    },
    {
      name: 'abstract',
      title: 'Abstract (optional)',
      type: 'text',
    },
    {
      name: 'publicationLink',
      title: 'Publication Link',
      type: 'url',
    },
    {
      name: 'documentLink',
      title: 'Document Link (e.g., ResearchGate PDF)',
      type: 'url',
    },
    {
      name: 'category',
      title: 'Category (e.g., Journal, Conference)',
      type: 'string',
    },
  ],
};