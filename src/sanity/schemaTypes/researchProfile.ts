// sanity/schemas/researchProfile.ts
export default {
  name: 'researchProfile',
  title: 'Research Profile Links',
  type: 'document',
  fields: [
    {
      name: 'googleScholarUrl',
      title: 'Google Scholar Profile Link',
      type: 'url',
    },
    {
      name: 'researchGateUrl',
      title: 'ResearchGate Profile Link',
      type: 'url',
    }
  ]
}