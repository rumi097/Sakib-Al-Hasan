// sanity/schemas/publication.ts
export default {
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    { 
      name: 'title', 
      title: 'Publication Title', 
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'category',
      title: 'Topic / Category',
      type: 'string',
      // I REMOVED THE OPTIONS LIST HERE.
      // Now you can type any category name you want (e.g., "Machine Learning", "Bioinformatics").
      description: 'Type the category name. Be consistent with spelling to group them correctly.',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'journalCover',
      title: 'Journal Cover Image',
      type: 'image',
      options: { hotspot: true }
    },
    { 
      name: 'abstract', 
      title: 'Abstract', 
      type: 'text',
      rows: 4
    },
    { 
      name: 'authors', 
      title: 'Authors', 
      type: 'array', 
      of: [{ type: 'string' }] 
    },
    { 
      name: 'journalName', 
      title: 'Journal Name', 
      type: 'string' 
    },
    { 
      name: 'year', 
      title: 'Publication Year', 
      type: 'number' 
    },
    { 
      name: 'doi', 
      title: 'DOI Link (URL)', 
      type: 'url',
      description: 'Full URL e.g., https://doi.org/10.1016/...' 
    },
    {
      name: 'manualCitationCount',
      title: 'Manual Citation Count',
      type: 'number',
      description: 'Use this if the auto-fetch fails.'
    }
  ],
}