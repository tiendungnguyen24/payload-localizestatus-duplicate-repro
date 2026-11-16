# Payload repro: Duplicate with `localizeStatus` keeps other locales published

Payload 3.93.0, SQLite. Collection `posts` with `versions.drafts.localizeStatus: true`,
locales `en`, `de`, `fr`, `experimental.localizeStatus: true`.

```sh
pnpm install
cp .env.example .env   # DATABASE_URL=file:./app.db, PAYLOAD_SECRET=any
pnpm payload run src/repro.ts
```

The script publishes a post in all locales, then duplicates it as a draft in `en`
(`payload.duplicate({ locale: 'en', draft: true })`, what the admin Duplicate button does).

Output:

```
copy _status: {"en":"draft","de":"published","fr":"published"}
expected    : {"en":"draft","de":"draft","fr":"draft"}
```

The copy is live in `de` and `fr` although nobody published it.
