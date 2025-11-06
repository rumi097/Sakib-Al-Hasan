// schemas/home.ts
export default {
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'introText',
      title: 'Introduction Text',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true, // Allows cropping
      },
    },
    {
      name: 'resumeFile',
      title: 'Resume/CV File',
      type: 'file', // For PDF or other document
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{ type: 'url' }], // Or create a dedicated socialLink object
    },
  ],
};