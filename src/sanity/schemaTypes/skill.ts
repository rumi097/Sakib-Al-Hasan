// schemas/skill.ts
export default {
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Skill Title',
      type: 'string',
    },
    {
      name: 'proficiency',
      title: 'Proficiency (e.g., 1-5, beginner, expert)',
      type: 'string', // Or number, or a custom select field
    },
    {
      name: 'icon',
      title: 'Skill Icon',
      type: 'image',
    },
  ],
};