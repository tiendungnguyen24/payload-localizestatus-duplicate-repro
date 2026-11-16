import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

// 1. Source doc, published in every locale.
const source = await payload.create({ collection: 'posts', locale: 'en', data: { title: 'Source EN', _status: 'published' } })
for (const locale of ['de', 'fr'] as const) {
  await payload.update({ collection: 'posts', id: source.id, locale, data: { title: `Source ${locale.toUpperCase()}`, _status: 'published' } })
}

// 2. Duplicate as a draft while editing `en` (what the admin Duplicate button does).
const copy = await payload.duplicate({ collection: 'posts', id: source.id, locale: 'en', draft: true })

// 3. Status per locale of the copy.
const copyAll = await payload.findByID({ collection: 'posts', id: copy.id, locale: 'all', draft: true, depth: 0 })
console.log('copy _status:', JSON.stringify(copyAll._status))
console.log('expected    :', JSON.stringify({ en: 'draft', de: 'draft', fr: 'draft' }))
process.exit(0)
