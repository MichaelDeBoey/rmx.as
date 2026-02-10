# rmx.as

Short URLs for rmx.as, powered by Cloudflare Workers.

## How it works

- **`_redirects`** – Defines all redirect rules. One rule per line: `from to [status]`
- **Cloudflare Workers** – Serves redirects at the edge via static assets

### Format

| Syntax      | Example                            |
| ----------- | ---------------------------------- |
| Static      | `/path    https://destination.com` |
| With status | `/old     /new    301`             |

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
