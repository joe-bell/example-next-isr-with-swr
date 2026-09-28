// Serves the demo's two API routes on Cloudflare; everything else is the
// static `next export` output in ./out. Mirrors src/pages/api/*.
import { posts } from "../src/mock-db/posts";

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

const json = (body: unknown) =>
  new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (/^\/api\/posts\/?$/.test(pathname)) {
      return json({ posts });
    }

    const match = pathname.match(/^\/api\/post\/([^/]+)\/?$/);
    if (match) {
      const id = decodeURIComponent(match[1]);
      return json({ post: posts.find((post) => post.id === id) });
    }

    return env.ASSETS.fetch(request);
  },
};
