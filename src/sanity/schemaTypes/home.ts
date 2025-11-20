// sanity/schemas/home.ts
export default {
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    // --- Hero Section ---
    { 
      name: 'introText', 
      title: 'Introduction Text (e.g., "Hi There!")', 
      type: 'string' 
    },
    { 
      name: 'name', 
      title: 'Client Name', 
      type: 'string' 
    },
    {
      name: 'shortDescription',
      title: 'Roles (for typing animation)',
      type: 'string',
      description: 'A comma-separated list of roles. e.g., "Research Enthusiast, Backend Developer"'
    },
    { 
      name: 'profileImage', 
      title: 'Profile Image (Hero Section)', 
      type: 'image', 
      options: { hotspot: true } 
    },
    { 
      name: 'resumeFile', 
      title: 'Resume/CV File', 
      type: 'file' 
    },

    // --- NEW Social Links ---
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'Google Scholar', value: 'google-scholar' },
                  { title: 'ResearchGate', value: 'research-gate' },
                  { title: 'Email', value: 'email' },
                  { title: 'Facebook', value: 'facebook' },
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
    },

    // --- About Me Section ---
    {
      name: 'aboutMeImage',
      title: 'About Me Image',
      type: 'image',
      description: 'A different image for the "About Me" section (optional).',
      options: { hotspot: true } 
    },
    {
      name: 'aboutMe',
      title: 'About Me Paragraph',
      type: 'text',
      description: 'The main paragraph for the "About Me" section.'
    },
    {
      name: 'researchInterests',
      title: 'Research Interests',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add a list of your research interests. Each one will be a new item.'
    },
  ],
}