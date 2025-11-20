import StudioComponent from './StudioComponent'

export const dynamic = 'force-static'
export const revalidate = false
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <StudioComponent />
}
