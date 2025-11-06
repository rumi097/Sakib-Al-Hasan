import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schema } from './src/sanity/schemaTypes/schema' // This imports your schemas

// Get the project ID and dataset from environment variables.
// Prefer NEXT_PUBLIC_* so values are available to the browser build when needed.
// Hardcoding the Project ID and Dataset
const projectId = 'ixzfhm0y'
const dataset = 'production'

if (!projectId) {
  throw new Error(
    'Sanity configuration error: missing projectId. Set NEXT_PUBLIC_SANITY_PROJECT_ID (or SANITY_PROJECT_ID) in your environment or hardcode the projectId in `sanity.config.ts`.'
  )
}

if (!dataset) {
  throw new Error(
    'Sanity configuration error: missing dataset. Set NEXT_PUBLIC_SANITY_DATASET (or SANITY_DATASET) in your environment or hardcode the dataset in `sanity.config.ts`.'
  )
}

export default defineConfig({
  basePath: '/studio', // The URL for your embedded studio
  name: 'default',
  title: 'My Client Portfolio', // You can change this title

  projectId,
  dataset,

  plugins: [deskTool()],

  schema: {
    types: schema.types,
  },
})