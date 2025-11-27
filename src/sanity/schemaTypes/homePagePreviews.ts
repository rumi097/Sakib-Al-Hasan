// src/sanity/schemaTypes/homePagePreviews.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePagePreviews',
  title: 'Home Page Previews',
  type: 'document',
  description: 'Select activity sections to showcase on the home page with their gallery groups.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Home Page Showcase',
      readOnly: true,
    }),
    
    // Skills Preview - Select individual skills for one-row preview
    defineField({
      name: 'showcaseSkills',
      title: 'Showcase Skills',
      type: 'object',
      description: 'Select individual skills to display on home page (one row preview)',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Skills Preview',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'My Skills',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'selectedSkills',
          title: 'Selected Skills',
          type: 'array',
          description: 'Choose individual skills to showcase (Max 8 recommended for one row)',
          validation: Rule => Rule.max(8).warning('Maximum 8 skills recommended for best single-row display'),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'skillGroup',
                  title: 'From Skill Group',
                  type: 'reference',
                  to: [{ type: 'skill' }],
                  description: 'Select which skill group this skill belongs to',
                },
                {
                  name: 'skillIndex',
                  title: 'Skill Number (1, 2, 3...)',
                  type: 'number',
                  description: 'Which skill from the list (1 = first skill, 2 = second, etc.)',
                  validation: Rule => Rule.min(1).integer().required(),
                },
              ],
              preview: {
                select: {
                  groupTitle: 'skillGroup.categoryTitle',
                  skillIndex: 'skillIndex',
                  skillGroup: 'skillGroup',
                },
                prepare({ groupTitle, skillIndex, skillGroup }) {
                  const skillsList = skillGroup?.skillsList || [];
                  const skill = skillsList[skillIndex - 1];
                  return {
                    title: skill?.name || `Skill ${skillIndex}`,
                    subtitle: `${groupTitle} - #${skillIndex}`,
                    media: skill?.icon,
                  };
                },
              },
            },
          ],
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),

    // Experience Activity Groups Preview - Select specific groups
    defineField({
      name: 'showcaseExperience',
      title: 'Showcase Experience Activities',
      type: 'object',
      description: 'Select specific activity groups from experience sections',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Experience Preview',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Experience Highlights',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'selectedGroups',
          title: 'Selected Activity Groups',
          type: 'array',
          description: 'Choose specific activity groups to showcase (Max 4)',
          validation: Rule => Rule.max(4).warning('Maximum 4 groups recommended'),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'section',
                  title: 'Activity Section',
                  type: 'reference',
                  to: [{ type: 'expActivitySection' }],
                },
                {
                  name: 'groupIndex',
                  title: 'Group Number (1, 2, 3...)',
                  type: 'number',
                  description: 'Which activity group to show from this section',
                  validation: Rule => Rule.min(1).integer(),
                },
              ],
              preview: {
                select: {
                  sectionTitle: 'section.title',
                  groupNum: 'groupIndex',
                },
                prepare({ sectionTitle, groupNum }) {
                  return {
                    title: `${sectionTitle} - Group ${groupNum}`,
                  };
                },
              },
            },
          ],
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),

    // Organization Activity Groups Preview - Select specific groups
    defineField({
      name: 'showcaseOrganizations',
      title: 'Showcase Organization Activities',
      type: 'object',
      description: 'Select specific activity groups from organization sections',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Organization Preview',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Organization Highlights',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'selectedGroups',
          title: 'Selected Activity Groups',
          type: 'array',
          description: 'Choose specific activity groups to showcase (Max 4)',
          validation: Rule => Rule.max(4).warning('Maximum 4 groups recommended'),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'section',
                  title: 'Activity Section',
                  type: 'reference',
                  to: [{ type: 'orgActivitySection' }],
                },
                {
                  name: 'groupIndex',
                  title: 'Group Number (1, 2, 3...)',
                  type: 'number',
                  description: 'Which activity group to show from this section',
                  validation: Rule => Rule.min(1).integer(),
                },
              ],
              preview: {
                select: {
                  sectionTitle: 'section.title',
                  groupNum: 'groupIndex',
                },
                prepare({ sectionTitle, groupNum }) {
                  return {
                    title: `${sectionTitle} - Group ${groupNum}`,
                  };
                },
              },
            },
          ],
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),

    // NextGen Activity Groups Preview - Select specific groups
    defineField({
      name: 'showcaseNextGen',
      title: 'Showcase NextGen Activities',
      type: 'object',
      description: 'Select specific activity groups from NextGen sections',
      fields: [
        {
          name: 'enabled',
          title: 'Enable NextGen Preview',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'NextGen Highlights',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'selectedGroups',
          title: 'Selected Activity Groups',
          type: 'array',
          description: 'Choose specific activity groups to showcase (Max 4)',
          validation: Rule => Rule.max(4).warning('Maximum 4 groups recommended'),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'section',
                  title: 'Activity Section',
                  type: 'reference',
                  to: [{ type: 'nextGenSection' }],
                },
                {
                  name: 'groupIndex',
                  title: 'Group Number (1, 2, 3...)',
                  type: 'number',
                  description: 'Which activity group to show from this section',
                  validation: Rule => Rule.min(1).integer(),
                },
              ],
              preview: {
                select: {
                  sectionTitle: 'section.title',
                  groupNum: 'groupIndex',
                },
                prepare({ sectionTitle, groupNum }) {
                  return {
                    title: `${sectionTitle} - Group ${groupNum}`,
                  };
                },
              },
            },
          ],
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),

    // Publications Preview - Keep as individual items
    defineField({
      name: 'showcasePublications',
      title: 'Showcase Publications',
      type: 'object',
      description: 'Select publications to display on home page',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Publications Preview',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Research Publications',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'selectedPublications',
          title: 'Selected Publications (Max 4)',
          type: 'array',
          description: 'Choose up to 4 publications to showcase',
          validation: Rule => Rule.max(4).warning('Maximum 4 entries recommended'),
          of: [
            {
              type: 'reference',
              to: [{ type: 'publication' }],
            },
          ],
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),

    // Achievements Preview
    defineField({
      name: 'showcaseAchievements',
      title: 'Showcase Achievements',
      type: 'object',
      description: 'Select achievements to display on home page',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Achievements Preview',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Key Achievements',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'selectedAchievements',
          title: 'Selected Achievements (Max 4)',
          type: 'array',
          description: 'Choose up to 4 achievements to showcase',
          validation: Rule => Rule.max(4).warning('Maximum 4 entries recommended'),
          of: [
            {
              type: 'reference',
              to: [{ type: 'achievement' }],
            },
          ],
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page Showcase Settings',
      };
    },
  },
});
