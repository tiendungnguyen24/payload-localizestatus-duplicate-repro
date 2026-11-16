import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { useAsTitle: 'title' },
  versions: { drafts: { localizeStatus: true } },
  fields: [{ name: 'title', type: 'text', localized: true }],
}
