Netlify deployment instructions

This repository contains a Vite + React single-page frontend (src/) and a small local Express backend (server.js).

Frontend (static site)
- Build command: npm run build
- Publish directory: dist
- Netlify will serve dist/index.html; client-side routing requires a redirect rule (already present in netlify.toml).

Recommended steps to deploy the frontend to Netlify (continuous deploy from GitHub):

1) Log in to Netlify and click "New site from Git".
2) Connect your Git provider (GitHub) and authorize Netlify to access the repository dhanushsp51/portfolio.
3) Pick the repository and in the Build settings use:
   - Build command: npm run build
   - Publish directory: dist
4) Add environment variables (see Backend section) if needed. Save and deploy.

Notes about the backend (contact form)
- The project includes server.js (Express + Nodemailer) for handling contact form submissions. Netlify static deploys cannot run this server directly.
- Recommended options for the backend:
  1) Deploy server.js on a small host (Railway, Render, Fly, Heroku, or a VPS). Set an environment variable in Netlify (e.g., VITE_API_URL) pointing to the deployed backend endpoint (https://your-backend.example.com).
  2) Convert the backend to Netlify Functions (serverless) and place functions in the netlify/functions directory. That requires refactoring server.js into a function handler and moving dependency installation to the functions build.

Environment variables & frontend configuration
- The frontend currently posts to a local endpoint (http://localhost:3000/api/send). For production, update the frontend to use a Vite environment variable like VITE_API_URL and reference it in the code as import.meta.env.VITE_API_URL.
- Example code change (suggested):
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  fetch(`${API_BASE}/api/send`, { method: 'POST', body: JSON.stringify(data) })
- Set VITE_API_URL in Netlify UI under Site settings → Build & deploy → Environment → Environment variables.

Optional: Automatic deploys from main
- Netlify will automatically deploy each push to the branch you select (main by default).

Security
- Do NOT commit secrets (SMTP credentials) into the repo. Use Netlify environment variables for front-end secrets and your backend host's env management for SMTP credentials.

If you want me to:
- Convert server.js into a Netlify Function (I can refactor and add it to netlify/functions), or
- Add a GitHub Action to build and test the site before Netlify deploys,
say which option and I will make the changes and commit them.

That's all — after you connect the repo in Netlify and set any required environment variables, Netlify will build and publish the site automatically.