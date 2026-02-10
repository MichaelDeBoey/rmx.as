import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PADDING = 10;
const REDIRECTS_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "_redirects",
);

interface Entry {
  path: string;
  destination: string;
}

const isCatchAll = (path: string) => path === "/*" || path === "/";
const isDynamic = (path: string) =>
  path.includes("*") || path.includes(":") || isCatchAll(path);

function parseRedirects(contents: string): {
  static: Entry[];
  dynamic: Entry[];
  catchAll: Entry | null;
} {
  const staticEntries: Entry[] = [];
  const dynamicEntries: Entry[] = [];
  let catchAll: Entry | null = null;

  for (const line of contents.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const match = trimmed.match(/^(\S+)\s+(.+)$/);
    if (!match) continue;

    const [, path, destination] = match;
    if (isCatchAll(path)) {
      catchAll = { path, destination };
    } else if (isDynamic(path)) {
      dynamicEntries.push({ path, destination });
    } else {
      staticEntries.push({ path, destination });
    }
  }

  return { static: staticEntries, dynamic: dynamicEntries, catchAll };
}

function formatRedirects(
  staticEntries: Entry[],
  dynamicEntries: Entry[],
  catchAll: Entry | null,
): string {
  staticEntries.sort((a, b) =>
    a.path.localeCompare(b.path, undefined, { sensitivity: "base" }),
  );
  dynamicEntries.sort((a, b) =>
    a.path.localeCompare(b.path, undefined, { sensitivity: "base" }),
  );

  const entries = [...staticEntries, ...dynamicEntries];

  const longest = Math.max(
    0,
    ...entries.map((e) => e.path.length),
    catchAll?.path.length ?? 0,
  );
  const width = longest + PADDING;

  const lines = entries.map((e) => `${e.path.padEnd(width)}${e.destination}`);
  if (catchAll) {
    lines.push("", `${catchAll.path.padEnd(width)}${catchAll.destination}`);
  }

  return lines.join("\n") + "\n\n";
}

const { static: staticEntries, dynamic: dynamicEntries, catchAll } =
  parseRedirects(readFileSync(REDIRECTS_PATH, "utf8"));

writeFileSync(
  REDIRECTS_PATH,
  formatRedirects(staticEntries, dynamicEntries, catchAll),
);
console.log("Formatted _redirects");
