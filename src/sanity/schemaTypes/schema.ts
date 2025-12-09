// schemas/schema.ts
import { type SchemaTypeDefinition } from 'sanity'

import home from './home';
import skill from './skill';
import education from './education';
import experience from './experience';
import publication from './publication';
import organization from './organization';
import contact from './contact';
import nextGenSection from './nextGenSection';
import orgActivitySection from './orgActivitySection';
import expActivitySection from './expActivitySection'
import researchProfile from './researchProfile';
import personalInfo from './personalInfo';
import homePagePreviews from './homePagePreviews';
import achievement from './achievement';
import trainingCertification from './trainingCertification';

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
    nextGenSection,
    orgActivitySection,
    expActivitySection,
    researchProfile,
    personalInfo,
    homePagePreviews,
    achievement,
    trainingCertification
  ],
}