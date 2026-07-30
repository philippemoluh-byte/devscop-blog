# Docusaurus Blog Configuration

<!--INSERT YOUR BRIEF DESCRIPTION HERE -->
This repository contains a Docusaurus-based DevSecOps portfolio and learning journal. It is configured for environment-driven settings, customizable docs and blog content, and automatic deployment to GitHub Pages through a prepared GitHub Actions workflow.

## TOC

<!--INSERT YOUR TABLE OF CONTENTS HERE -->

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition
    link="<https://github.com/philippemoluh-byte/devscop-blog>"
    title="Github Tip"
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Quickstart

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [pnpm](https://pnpm.io/) (package manager for faster and more efficient dependency handling)

1. Installation

   ```bash
    pnpm install
   ```

2. Local Development

   ```bash
    pnpm start
   ```

   This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

3. Build

   ```bash
    pnpm build
   ```

   This command generates static content into the `build` directory and can be served using any static contents hosting service.

4. Deployment

   The website is automatically deployed to GitHub Pages using a prepared GitHub Actions workflow.
   The deployment runs whenever a commit is pushed to the main branch.

## Description

I configured the template project as a Docusaurus-based DevSecOps learning journal and portfolio by updating the main site metadata, navigation, footer, and deployment-related settings. The project now uses environment-driven values for the deployment URL, base URL, GitHub repository URL, and optional blog behavior, so the configuration stays reusable and easy to adapt.

The main steps I followed were:

1. I installed the dependencies and checked that the local Docusaurus app started correctly.
2. I changed the default template title and tagline so the site clearly reflects the portfolio and learning journal purpose.
3. I added an environment variable for the repository URL and reused it for the docs edit links, blog edit links, and repository links in the navbar and footer.
4. I updated the production URL and base URL handling so they can be controlled through environment variables instead of hardcoded values.
5. I adjusted the navbar title, logo, and GitHub repository link to match the project branding.
6. I updated the footer by adding the project docs link, removing the community column, keeping the template reference, and customizing the copyright message.
7. I aligned the documentation and README with the automatic deployment flow to GitHub Pages through a prepared GitHub Actions workflow on pushes to the main branch.
8. I validated the result with the standard development and build commands.

## Further References

For implementation details, check the:

1. The main Docusaurus configuration in [docusaurus.config.ts](https://github.com/philippemoluh-byte/devscop-blog/blob/main/docusaurus.config.ts), 
2. the project overview in [README.md](https://github.com/philippemoluh-byte/devscop-blog/blob/main/README.md),
3. and the [repository source](https://github.com/philippemoluh-byte/devscop-blog)files.

These files show how the portfolio structure, environment-based settings, and GitHub Pages deployment were configured.
