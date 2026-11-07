# CRACAN

## Website: cracan.org

An Oakland pilot taking shape to connect civil rights awareness with meaningful civic action.

React + Vite single-page site on classic Firebase Hosting (project `cracan-web-2026`), with Google sign-in, a private `/dashboard`, and Firestore profiles. Admins (custom claim `admin: true`) get an "Admin: member profiles" panel on the dashboard.

```bash
npm install
npm run dev          # local preview
npm run build        # builds dist/ and writes firebase.json
npm run test:rules   # Firestore rules tests (run inside the emulator, see below)
firebase emulators:exec --only firestore "npm run test:rules"
firebase deploy --only hosting,firestore:rules
```

DNS is on Cloudflare; mail is Zoho. `scripts/connect-domains.mjs` only adds the Firebase records and refuses to run if mail records would change.

Split out of the shared `communitySites` project on November 7, 2026.
