# My Developer Blog

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Repository Description

This repository contains a Docusaurus-based DevSecOps portfolio and learning journal. It is configured for environment-driven settings, customizable docs and blog content, and automatic deployment to GitHub Pages through a prepared GitHub Actions workflow.

## Table of Contents

- [My Developer Blog](#my-developer-blog)
    - [Repository Description](#repository-description)
    - [Table of Contents](#table-of-contents)
    - [Prerequisites](#prerequisites)
    - [Quickstart](#quickstart)
    - [Usage](#usage)
        - [Configuration and Configurability](#configuration-and-configurability)
        - [Building the Project](#building-the-project)
        - [Deployment](#deployment)
            - [Automated Deployment via GitHub Actions](#automated-deployment-via-github-actions)
            - [Manual Deployment to GitHub Pages](#manual-deployment-to-github-pages)
            - [Self-Hosting with Docker and NGINX](#self-hosting-with-docker-and-nginx)
    - [Repository Structure](#repository-structure)

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [pnpm](https://pnpm.io/) (package manager for faster and more efficient dependency handling)

## Quickstart

Get the project running locally in two steps:

1. Installation

   ```
   $ pnpm install
   ```

2. Local Development

   ```
   $ pnpm start
   ```

   This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

That's it for local development. For configuration, building a production version, and every supported way to deploy the project (GitHub Actions, manual `pnpm deploy`, or self-hosting with Docker/NGINX), see the [Usage](#usage) section below.

## Usage

This section goes beyond the Quickstart above and explains configuration, configurability, and all supported deployment paths in more detail — including how to modify relevant files to get different results.

### Configuration and Configurability

The central configuration file is `docusaurus.config.ts` in the project root. The most relevant fields:

| Field | Purpose | Example                                        |
|---|---|------------------------------------------------|
| `title` / `tagline` | Site title and subtitle, shown in the browser tab and meta tags | `title: '<your-portfolio-title>'`              |
| `url` | The actual domain the site is served from (no port, no sub-path) | `url: '<your-email-adress>'`                   |
| `baseUrl` | The sub-path the site is served under — must exactly match the GitHub repository name for GitHub Pages | `baseUrl: '/devscop-blog/'`                    |
| `organizationName` | GitHub user/organization name, required for `pnpm deploy` | `organizationName: '<your-organisation-name>'` |
| `projectName` | GitHub repository name, also required for `pnpm deploy` | `projectName: '<your-github-repository>'`      |

**Important:** `url` and `baseUrl` must be consistent with each other and with the actual deployment target. Mixing them up (e.g. putting a port or sub-path into `url` instead of `baseUrl`) is a common source of build/runtime errors and broken links after deployment.

**Adjusting displayed content:** content shown by components such as the header navigation, hero bio, skills list, project list, and contact links is kept separate from the rendering logic and lives in dedicated data files inside the respective component folders under `src/components/` (e.g. a `data/` subfolder per component). To change what's displayed — add a project, edit a skill's description, update a contact link — it's usually enough to edit the relevant data file directly; the component markup itself does not need to change, as long as the existing data shape (see each component's `types.ts`) is respected.

**Adjusting docs and blog content:** as noted in [Repository Structure](#repository-structure), new pages are added by dropping markdown files into `docs/` (referenced via `sidebars.ts`) or `blog/` (picked up automatically) — no changes to `docusaurus.config.ts` are needed for ordinary content additions.

### Building the Project

```
$ pnpm build
```

This produces a fully static build in the `build/` directory (plain HTML, CSS, and JS), which can be handed to any static file host or web server.

To verify the production build locally before deploying it:

```
$ pnpm serve
```

This serves exactly the contents of `build/`, unlike the dev server, which includes extra development-only behavior.

### Deployment

There are three supported ways to get this project live, depending on the target.

#### Automated Deployment via GitHub Actions

This is the default, already-configured path for this repository: a GitHub Actions workflow builds the site and publishes it to GitHub Pages automatically on every push to `main` — no manual steps are required.

Before relying on it, make sure `url`, `baseUrl`, `organizationName`, and `projectName` in `docusaurus.config.ts` are correct (see [Configuration and Configurability](#configuration-and-configurability)); a mismatch here is the most common reason a deployed page loads with broken assets or a "wrong baseUrl" warning even though the Actions run itself succeeded.

#### Manual Deployment to GitHub Pages

Useful for a one-off deploy without pushing to `main`, or for testing deploy credentials locally. Docusaurus' built-in deploy command needs a `GIT_USER` environment variable set to your GitHub username:

**macOS/Linux:**

```bash
GIT_USER=<your-github-username> pnpm deploy
```

**Windows (CMD):**

```cmd
set GIT_USER=<your-github-username>
pnpm deploy
```

**Windows (PowerShell):**

```powershell
$env:GIT_USER = "<your-github-username>"
pnpm deploy
```

To avoid the platform-specific syntax above entirely, use [`cross-env`](https://www.npmjs.com/package/cross-env):

```json
// package.json
"scripts": {
  "deploy": "cross-env GIT_USER=<your-github-username> docusaurus deploy"
}
```

Afterwards, `pnpm deploy` works the same way on any OS. The command builds the site and pushes `build/` to the `gh-pages` branch of the repository configured via `organizationName`/`projectName`.

#### Self-Hosting with Docker and NGINX

For hosting the site outside of GitHub Pages (e.g. on your own server):

1. Build the image (a multi-stage build: Node to build, NGINX to serve):

   ```bash
   docker build -t devscop-blog .
   ```

2. Run the container:

   ```bash
   docker run -d -p 3000:80 --name devscop-blog devscop-blog
   ```

3. **If `baseUrl` is not `/`:** every generated link/asset in the build expects to be served under that exact sub-path, so the build output must be copied into a matching subfolder inside the image, e.g.:

   ```dockerfile
   COPY --from=builder /app/build /usr/share/nginx/html/devscop-blog
   ```

   The site is then reachable at `http://<host>:3000/devscop-blog/` — not at the container root.

4. **If a separate NGINX also runs directly on the host** (e.g. for TLS termination or a custom domain in front of the container), it must not bind the same port the container already publishes (`-p 3000:80`). Instead, have it reverse-proxy to the container:

   ```nginx
   server {
       listen 80;
       server_name example.com;
       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

   Two services both trying to `listen` on the same port (one inside Docker, one as a host-level NGINX site) results in `bind() ... Address already in use`, and only one of them will start.

## Repository Structure

The repository is organized as follows:

- `blog/`: Contains markdown files for blog posts. Blog-related metadata is automatically picked up by the Docusaurus configuration.
- `docs/`: Contains markdown files for documentation. These files are referenced in `sidebars.ts` to define the sidebar structure.
- `src/`: Contains custom React components, CSS, and JavaScript for additional functionality or theming. Editable content for individual components (nav links, skills, projects, contact details, etc.) is kept in dedicated `data/` files per component — see [Configuration and Configurability](#configuration-and-configurability).
- `static/`: Stores static assets (e.g., images, icons) served directly without processing.
- `sidebars.ts`: Configures the structure of sidebars in the documentation section.
- `docusaurus.config.ts`: Main configuration file for customizing and managing Docusaurus behavior.
- `build/`: Generated after running the `pnpm build` command. Contains the static website files ready for deployment.

New content can be added as follows:

- Add new documentation files to the `docs/` folder.
- Add new blog posts to the `blog/` folder. No additional configuration is required.
