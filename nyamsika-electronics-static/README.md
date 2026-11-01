# Nyamsika Electronics — static website

This is a static HTML/CSS/JavaScript website with a lightweight admin editor. It is designed for Cloudflare Pages.

## How the editing works

- The public website is static: HTML, CSS, JavaScript, images and a JSON content file.
- The admin page uses the GitHub Contents API to create/update/delete `content/posts.json` and upload images into `assets/uploads/`.
- Your GitHub repository acts as the content store. A GitHub commit triggers Cloudflare Pages to redeploy the static site.
- Videos are added using a YouTube, Vimeo or other public video URL. This avoids storing large video files in the website repository.

This does not require your personal computer or a Node.js server to stay on.

## 1. Create a GitHub repository

1. Sign in to GitHub and create a new repository, for example `nyamsika-electronics`.
2. You can make it private or public. Cloudflare Pages can deploy from either when connected to your GitHub account.
3. Extract this ZIP and upload all files and folders to the root of that repository. Keep `index.html` at the repository root.

## 2. Configure the website repository

Open `config.js` and replace:
- `YOUR_GITHUB_USERNAME` with your GitHub username.
- `YOUR_REPOSITORY_NAME` with the repository name.
- Keep `branch: "main"` if your default branch is main.

Save and commit the change.

## 3. Create a restricted GitHub token for the admin editor

1. In GitHub, open Settings → Developer settings → Personal access tokens → Fine-grained tokens.
2. Generate a token restricted to ONLY your Nyamsika website repository.
3. Set repository permissions to **Contents: Read and write**. Metadata read-only is normally selected automatically.
4. Set an expiry date. Keep the token private.

The admin page asks you to paste this token when you connect. It is held in session memory for that browser tab and is not saved in the website source or sent to a separate server. Disconnect or close the tab to end the admin session. Do not paste the token into `config.js`, HTML, JavaScript source, or a public message. Use this admin page only from a trusted device.

## 4. Deploy to Cloudflare Pages

1. Sign in to the Cloudflare dashboard.
2. Open Workers & Pages → Create application → Pages → Connect to Git.
3. Connect GitHub and select your `nyamsika-electronics` repository.
4. Framework preset: **None**.
5. Build command: leave empty.
6. Build output directory: `/` (repository root).
7. Start deployment.

After deployment, Cloudflare gives you a `*.pages.dev` address. Add your own domain under the Pages project's Custom domains.

**Important:** Use Git integration, not the drag-and-drop Direct Upload route, so that commits made by the admin editor automatically trigger a new deployment.

## 5. Publish and edit content

1. Open `https://YOUR-DOMAIN/admin/`.
2. Paste your restricted GitHub token and connect.
3. Choose New post.
4. Enter title, category, date and text.
5. Select an image if you want one.
6. Paste a public video link if needed.
7. Click Publish post.

To change an existing post, click Edit. To remove it, click Delete. The change is committed to GitHub and Cloudflare Pages automatically redeploys the website. It may take a short time before visitors see the update.

## 6. Personalise the business details

Before sharing the site with customers, edit `index.html`:
- Replace the sample About Us text with your real business description.
- Update the three sample service cards.
- Replace `YOUR-EMAIL@example.com` with your business email.
- Add your real phone number, WhatsApp link and physical location.
- Replace the sample welcome post in the admin area.

## Important limitations and security

- The public website is static; content editing is powered by the GitHub repository API. GitHub is the content store, not a database server you operate.
- Never put a GitHub token in the website files. Create a narrowly scoped, expiring token and protect the device/browser used for administration.
- Do not grant the token access to other repositories.
- Image uploads are limited to 8 MB by this editor. Optimise large images before uploading.
- For video, use a public YouTube/Vimeo link or a video hosting service such as Cloudflare Stream. Do not commit large video files to the Pages repository.
- This starter editor is intended for a trusted site owner/editor, not multiple public authors or sensitive customer information. For multiple staff accounts, audit trails, or stronger centralised authentication, use a proper CMS or a server-side admin service.
- The sample page contains illustrative business copy and placeholder contact information. Replace it with accurate details.

## Project structure

```text
nyamsika-electronics/
  index.html
  styles.css
  app.js
  config.js
  content/
    posts.json
  assets/
    uploads/
  admin/
    index.html
    admin.css
    admin.js
```
