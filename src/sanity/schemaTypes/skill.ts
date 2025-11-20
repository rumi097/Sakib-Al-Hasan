// sanity/schemas/skill.ts
export default {
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    { name: 'title', title: 'Skill Title', type: 'string' },
    { 
      name: 'icon', 
      title: 'Skill Icon (optional)', 
      type: 'image',
      description: 'Download icons from sites like svgrepo.com or simpleicons.org'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Select the category this skill belongs to',
      options: {
        list: [
          { title: 'Software Skills', value: 'software' },
          { title: 'Academic Skills', value: 'academic' },
          { title: 'Soft Skills', value: 'soft' },
        ],
        layout: 'radio', // This makes it easy to select
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'icon',
    },
  },
}