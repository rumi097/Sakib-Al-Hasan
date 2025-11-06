// schemas/contact.ts
export default {
  name: 'contact',
  title: 'Contact Information',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone Number (optional)',
      type: 'string',
    },
    {
      name: 'github',
      title: 'GitHub Profile Link',
      type: 'url',
    },
    {
      name: 'linkedin',
      title: 'LinkedIn Profile Link',
      type: 'url',
    },
    // Add other social media or contact details
  ],
};