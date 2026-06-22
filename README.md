> [!WARNING]
> This url shortener has been deprecated.
>
> For most shorthand redirects `rmx.as/*` -> `remix.run/*` should work.
>
> If you see an official example in any Remix repos using `rmx.as/`, feel free to open up a PR to address it, or otherwise [reach out to the team](https://remix.run/discord).


# rmx.as

Short URLs for rmx.as, powered by Netlify.

## How it works

- **`_redirects`** – Defines all redirect rules. One rule per line: `from to [status]`

### Format

| Syntax            | Example                                    |
| ----------------- | ------------------------------------------ |
| Static            | `/path      https://destination.com`       |
| Catch-all (splat) | `/blog/*    https://remix.run/blog/:splat` |
| With status       | `/old       /new    301`                   |

The `:splat` placeholder captures whatever the `*` matches. So `/blog/2024/my-post` redirects to `https://remix.run/blog/2024/my-post`.

**Reference:** [Cloudflare Pages Redirects](https://developers.cloudflare.com/pages/configuration/redirects/)

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
