// sanity/schemas/skill.ts
export default {
  name: 'skill',
  title: 'Skill Group',
  type: 'document',
  fields: [
    {
      name: 'categoryTitle',
      title: 'Category Title',
      type: 'string',
      description: 'e.g., "Software Skills", "Academic Skills", "Soft Skills"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'skillsList',
      title: 'List of Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'skillItem',
          title: 'Skill Item',
          fields: [
            { 
              name: 'name', 
              title: 'Skill Name', 
              type: 'string',
              description: 'e.g., "Python", "Leadership"'
            },
            { 
              name: 'icon', 
              title: 'Icon', 
              type: 'image',
              options: { hotspot: true }
            },
            // Optional: If you want to show proficiency
            // { name: 'proficiency', title: 'Proficiency', type: 'string' } 
          ],
          preview: {
            select: {
              title: 'name',
              media: 'icon'
            }
          }
        }
      ]
    }
  ],
}