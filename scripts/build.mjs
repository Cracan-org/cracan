import { build } from 'vite';
import { readFile, writeFile } from 'node:fs/promises';
import { brands } from '../src/brands.js';

// Builds the CRACAN site into dist/ and writes firebase.json for it.
const key = 'cracan';
const brand = brands[key];
const config = JSON.parse(await readFile(`config/${key}.json`, 'utf8'));
if (config.projectId !== brand.project) throw new Error(`Wrong Firebase project for ${key}`);
await build({ define: { __SITE__: JSON.stringify(key), __FIREBASE__: JSON.stringify(config) }, build: { outDir: 'dist', emptyOutDir: true } });

const htmlPath = 'dist/index.html';
let html = await readFile(htmlPath, 'utf8');
html = html
  .replace('<title>A new beginning</title>', `<title>${brand.name} — ${brand.eyebrow.replaceAll('&', '&amp;')}</title>`)
  .replace('A new place for ideas, community, and meaningful action.', brand.description);
await writeFile(htmlPath, html);

// Real robots.txt and sitemap (otherwise the SPA rewrite serves index.html for them).
const site = `https://${brand.domain}`;
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nDisallow: /dashboard\n\nSitemap: ${site}/sitemap.xml\n`);
const pages = [['/', '1.0'], ['/help', '0.9'], ['/volunteer', '0.8'], ['/guidelines', '0.5'], ['/privacy', '0.3']];
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(([p, pr]) => `  <url><loc>${site}${p}</loc><changefreq>monthly</changefreq><priority>${pr}</priority></url>`).join('\n')}\n</urlset>\n`);

await writeFile('firebase.json', JSON.stringify({
  hosting: {
    site: brand.project, public: 'dist', ignore: ['**/.*'],
    rewrites: [{ source: '**', destination: '/index.html' }],
    headers: [
      { source: '**', headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' https://apis.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com; frame-src https://*.firebaseapp.com https://accounts.google.com https://apis.google.com; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'" },
      ] },
      { source: '/assets/**', headers: [{ key: 'Cache-Control', value: 'public,max-age=31536000,immutable' }] },
    ],
  },
  firestore: { rules: 'firestore.rules' },
  auth: { providers: { googleSignIn: {
    oAuthBrandDisplayName: brand.name, supportEmail: 'w3develops@gmail.com',
    authorizedRedirectUris: [
      `https://${brand.project}.firebaseapp.com/__/auth/handler`,
      `https://${brand.project}.web.app/__/auth/handler`,
      `https://${brand.domain}/__/auth/handler`,
      `https://www.${brand.domain}/__/auth/handler`,
    ],
  } } },
  emulators: { firestore: { host: '127.0.0.1', port: 8080 }, auth: { host: '127.0.0.1', port: 9099 }, ui: { enabled: false }, singleProjectMode: true },
}, null, 2) + '\n');
