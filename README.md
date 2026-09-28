# Next.js Incremental Static Regeneration with SWR

> Lightning fast static pages with [ISR](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration), instantly updated with [SWR](https://swr.vercel.app) ⚡️

- 📝 [Read the blog post](https://joebell.co.uk/blog/updating-static-next-js-pages-instantly)
- 🖥️ [View the demo](https://example-next-isr-with-swr.joebell.studio/)

## FYI

This demo uses demo data stored in `src/mock-db`. Changes to posts won't be saved on refresh in this example, but would be if hooked up to a real-world database.

## Deploy

Hosted on Cloudflare Workers: `next export` output served as static assets, with a small Worker (`worker/index.ts`) for the two API routes.

```sh
NODE_OPTIONS=--openssl-legacy-provider npx next build
NODE_OPTIONS=--openssl-legacy-provider npx next export
npx wrangler deploy
```

(`NODE_OPTIONS` is only needed on Node 17+.)
