// src/sanity/schemaTypes/personalInfo.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'personalInfo',
  title: 'Personal Information',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "Personal Documents"',
      initialValue: 'Personal Documents',
    }),
    defineField({
      name: 'passport',
      title: 'Passport',
      type: 'object',
      fields: [
        {
          name: 'hasDocument',
          title: 'Has Passport',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'file',
          title: 'Passport File (PDF)',
          type: 'file',
          options: {
            accept: '.pdf',
          },
          hidden: ({ parent }) => !parent?.hasDocument,
        },
        {
          name: 'image',
          title: 'Passport Image',
          type: 'image',
          description: 'Upload an image to show as thumbnail preview',
          options: { hotspot: true },
          hidden: ({ parent }) => !parent?.hasDocument,
        },
        {
          name: 'number',
          title: 'Passport Number (Optional)',
          type: 'string',
          hidden: ({ parent }) => !parent?.hasDocument,
        },
        {
          name: 'expiryDate',
          title: 'Expiry Date',
          type: 'date',
          hidden: ({ parent }) => !parent?.hasDocument,
        },
      ],
    }),
    defineField({
      name: 'nid',
      title: 'National ID (NID)',
      type: 'object',
      fields: [
        {
          name: 'hasDocument',
          title: 'Has NID',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'file',
          title: 'NID File (PDF)',
          type: 'file',
          options: {
            accept: '.pdf',
          },
          hidden: ({ parent }) => !parent?.hasDocument,
        },
        {
          name: 'image',
          title: 'NID Image',
          type: 'image',
          description: 'Upload an image to show as thumbnail preview',
          options: { hotspot: true },
          hidden: ({ parent }) => !parent?.hasDocument,
        },
        {
          name: 'number',
          title: 'NID Number (Optional)',
          type: 'string',
          hidden: ({ parent }) => !parent?.hasDocument,
        },
      ],
    }),
    defineField({
      name: 'birthCertificate',
      title: 'Birth Certificate',
      type: 'object',
      fields: [
        {
          name: 'hasDocument',
          title: 'Has Birth Certificate',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'file',
          title: 'Birth Certificate File (PDF)',
          type: 'file',
          options: {
            accept: '.pdf',
          },
          hidden: ({ parent }) => !parent?.hasDocument,
        },
        {
          name: 'image',
          title: 'Birth Certificate Image',
          type: 'image',
          description: 'Upload an image to show as thumbnail preview',
          options: { hotspot: true },
          hidden: ({ parent }) => !parent?.hasDocument,
        },
        {
          name: 'number',
          title: 'Certificate Number (Optional)',
          type: 'string',
          hidden: ({ parent }) => !parent?.hasDocument,
        },
      ],
    }),
    defineField({
      name: 'characterCertificate',
      title: 'Character Certificate',
      type: 'object',
      fields: [
        {
          name: 'hasDocument',
          title: 'Has Character Certificate',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'file',
          title: 'Character Certificate File (PDF)',
          type: 'file',
          options: {
            accept: '.pdf',
          },
          hidden: ({ parent }) => !parent?.hasDocument,
        },
        {
          name: 'image',
          title: 'Character Certificate Image',
          type: 'image',
          description: 'Upload an image to show as thumbnail preview',
          options: { hotspot: true },
          hidden: ({ parent }) => !parent?.hasDocument,
        },
        {
          name: 'number',
          title: 'Certificate Number (Optional)',
          type: 'string',
          hidden: ({ parent }) => !parent?.hasDocument,
        },
      ],
    }),
    defineField({
      name: 'citizenshipCertificate',
      title: 'Citizenship Certificate',
      type: 'object',
      fields: [
        {
          name: 'hasDocument',
          title: 'Has Citizenship Certificate',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'file',
          title: 'Citizenship Certificate File (PDF)',
          type: 'file',
          options: {
            accept: '.pdf',
          },
          hidden: ({ parent }) => !parent?.hasDocument,
        },
        {
          name: 'image',
          title: 'Citizenship Certificate Image',
          type: 'image',
          description: 'Upload an image to show as thumbnail preview',
          options: { hotspot: true },
          hidden: ({ parent }) => !parent?.hasDocument,
        },
        {
          name: 'number',
          title: 'Certificate Number (Optional)',
          type: 'string',
          hidden: ({ parent }) => !parent?.hasDocument,
        },
      ],
    }),
    defineField({
      name: 'resume',
      title: 'CV/Resume',
      type: 'object',
      fields: [
        {
          name: 'hasDocument',
          title: 'Has Resume',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'file',
          title: 'Resume File (PDF)',
          type: 'file',
          options: {
            accept: '.pdf',
          },
          hidden: ({ parent }) => !parent?.hasDocument,
        },
        {
          name: 'lastUpdated',
          title: 'Last Updated',
          type: 'date',
          hidden: ({ parent }) => !parent?.hasDocument,
        },
      ],
    }),
    defineField({
      name: 'additionalDocuments',
      title: 'Additional Documents',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Document Title',
              type: 'string',
            },
            {
              name: 'file',
              title: 'File (PDF)',
              type: 'file',
              options: {
                accept: '.pdf',
              },
            },
            {
              name: 'image',
              title: 'Preview Image',
              type: 'image',
              description: 'Upload an image to show as thumbnail (recommended)',
              options: { hotspot: true },
            },
            {
              name: 'icon',
              title: 'Icon (Emoji - fallback)',
              type: 'string',
              description: 'e.g., 📄, 🎓, 🏆 (used if no image is uploaded)',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Personal Information',
      };
    },
  },
});
