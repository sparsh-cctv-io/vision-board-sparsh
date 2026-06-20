Netlify Functions & Content Editing
=================================

This project includes a Netlify Function that allows the production site to read and write `server/content.json` in your repository via the GitHub API. Follow these steps to enable editing from the Admin UI on Netlify.

Required Netlify environment variables
- `GITHUB_TOKEN` — a GitHub personal access token with repository access. Scopes: `repo` or `repo:contents` (use least-privilege where possible).
- `GITHUB_REPO` — the repository in `owner/repo` format (e.g. `username/app.alkaevent`).
- Optional: `GITHUB_BRANCH` — branch to read/write (defaults to `main`).
- Optional: `CONTENT_PATH` — path to the JSON file in the repo (defaults to `server/content.json`).
- Optional: `NETLIFY_BUILD_HOOK` — a Netlify build hook URL to trigger a rebuild after each save.

How to set variables in Netlify
1. Open your site on Netlify and go to "Site settings" → "Build & deploy" → "Environment".
2. Add the variables above and save.

Behavior and notes
- The function commits changes to the repo. Each save creates a commit with message "Update content via Netlify Function".
- The site must have `GITHUB_TOKEN` and `GITHUB_REPO` set in Netlify environment variables before `/api/content` will work in production. Without them, the function returns a 500 error.
- Do not paste secrets in source files or chat. Use Netlify environment variables.
- If you prefer not to commit to Git, we can change persistence to S3 or a database.

Local testing with Netlify CLI
1. Install Netlify CLI (if not installed):
   npm install -g netlify-cli
2. Create a local `.env` file with the same variable names (for local testing only):
   GITHUB_TOKEN=your_token_here
   GITHUB_REPO=owner/repo
   GITHUB_BRANCH=main
   CONTENT_PATH=server/content.json
3. Run the dev server which serves functions locally:
   netlify dev

After deployment
- Deploy the site on Netlify. The frontend calls `/api/content` which is proxied to the `content` function.
- Open the Admin UI and save — the function will commit the JSON to your repo and return `{ "status": "ok" }` on success.

Security reminder
- Use a dedicated machine/service account token if possible.
- Revoke or rotate tokens if they become exposed.
