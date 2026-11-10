import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

// The original Sites source uses absolute /assets, /downloads and /resume.html.
// Rewrite only the generated GitHub Pages build, preserving source and OCI output.
const root = 'dist';
const prefix = '/Portfolio';
let updated = 0;

async function walk(folder) {
  for (const item of await readdir(folder, { withFileTypes: true })) {
    const filename = path.join(folder, item.name);
    if (item.isDirectory()) {
      await walk(filename);
    } else if (/\.(?:js|css|html)$/.test(filename)) {
      const original = await readFile(filename, 'utf8');
      const rewritten = original.replace(/(?<![a-zA-Z0-9:_])\/(assets\/|downloads\/|resume\.html\b)/g, prefix + '/$1');
      if (rewritten !== original) {
        await writeFile(filename, rewritten);
        updated++;
      }
    }
  }
}
await walk(root);
console.log(`Rewrote public asset URLs in ${updated} Pages build files.`);
