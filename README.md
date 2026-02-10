# rmx.as

Short URLs for rmx.as, powered by Cloudflare Workers.

## How it works

- **`_redirects`** – Defines all redirect rules. One rule per line: `from to [status]`
- **Cloudflare Workers** – Serves redirects at the edge via static assets

### Format

| Syntax            | Example                                    |
| ----------------- | ------------------------------------------ |
| Static            | `/path      https://destination.com`       |
| Catch-all (splat) | `/blog/*    https://remix.run/blog/:splat` |
| With status       | `/old       /new    301`                   |

The `:splat` placeholder captures whatever the `*` matches. So `/blog/2024/my-post` redirects to `https://remix.run/blog/2024/my-post`.

**Reference:** [Cloudflare Workers Redirects](https://developers.cloudflare.com/workers/static-assets/redirects/)

## Deploying

```bash
npm install
npm run deploy
```

## Formatting

Formats the `_redirects` file to ensure consistent spacing and sorting.

```bash
npm run format
```
