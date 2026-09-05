
# Beezents Frontend

React/Vite frontend for the Beezents marketing site and staff CMS.

View your app in AI Studio: https://ai.studio/apps/4ffdf525-eb65-4205-98a7-8a4dd9074620

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local`. For local development keep
   `VITE_API_BASE_URL=/backend` and set `VITE_API_PROXY_TARGET` to the backend
   origin, for example `http://localhost:8000` or `http://192.168.0.109:8000`.
3. Set `GEMINI_API_KEY` only if the AI features are enabled.
4. Run the app:
   `npm run dev`

The frontend uses the FastAPI backend's HTTP-only session cookie. It does not
store bearer tokens in localStorage. The Vite proxy keeps development API
requests same-origin, which is required by the backend's `SameSite=lax` cookie.
For a separately hosted production frontend, use a reverse proxy on the same
site or configure HTTPS-compatible cookie/CORS settings on the backend.

Public CMS content is loaded from `/api/v1/projects`, `/case-studies`,
`/services`, and `/solutions`. Staff CMS screens use the corresponding
`/api/v1/admin/*` endpoints, including leads and multipart media uploads.

The public contact and demo forms submit to `/api/v1/leads`. Authentication is
session-cookie based: login/logout/me use the FastAPI HTTP-only cookie and the
frontend never reads or stores the raw session token. The API base URL can also
be changed from the CMS diagnostics/settings screen.

The supplied backend contract does not expose blog, user-administration, or
site-settings endpoints. Those CMS sections are intentionally not presented as
remote CRUD screens; roles remain server-managed and the existing editorial
archive/settings values are local frontend data until matching backend routes
are added.
