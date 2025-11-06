// schemas/schema.ts
import { type SchemaTypeDefinition } from 'sanity'

import home from './home';
import skill from './skill';
import education from './education';
import experience from './experience';
import publication from './publication';
import organization from './organization';
import contact from './contact';

export const schema: { types: SchemaTypeDefinition[] } = {
  // Add all your imported schemas to this array
  types: [
    home,
    skill,
    education,
    experience,
    publication,
    organization,
    contact,
  ],
}