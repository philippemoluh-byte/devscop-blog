# WordPress Setup with Docker Compose

This guide explains how to run a WordPress application with a database using Docker Compose.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quickstart](#quickstart)
    - [Configuration](#configuration)
    - [Run the Project](#run-the-project)
- [Usage](#usage)
    - [Useful Commands](#useful-commands)
_ [Further References](#further-references)

## Prerequisites

Install the following tools before you start:

- Git
- Docker Desktop (includes Docker Compose)

## Quickstart

1. Clone the repository:

```bash
git clone git@github:philippemoluh-byte/wordpress.git
cd wordpress
```

2. Create the environment file for Compose:

```bash
cp exemple.env wordpress_app/.env
```

3. Open the app folder:

```bash
cd wordpress_app
```

### Configuration

Edit `.env` and set values like these:

```env
    DEBUG="1"         # Optional: enable debug mode
    DB_NAME=<your_db_name>
    DB_USER=<your_db_user>
    DB_PASSWORD=<your_db_password>
    DB_HOST=<your_db_host>
    DB_ROOT_PASSWORD=<your_db_root_password>

    WORDPRESS_HOST_PORT=8080
```

### Run the Project

Start all services:

```bash
docker compose up -d
```

Open WordPress in your browser:

```text
http://<your_ip>:8080
```

:::info

If you change `WORDPRESS_HOST_PORT`, use that port instead.

:::

## Usage

- First run: WordPress shows the initial setup page (site title, admin user, password, email).
- Later runs: WordPress shows the login page.

### Useful Commands

Show logs:

```bash
docker compose logs -f
```

Stop containers:

```bash
docker compose down
```

Stop and remove volumes (deletes database data):

```bash
docker compose down -v
```

Restart without rebuilding:

```bash
docker compose restart
```

Recreate services after config changes:

```bash
docker compose up -d
```

## Further References

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition
link="https://github.com/philippemoluh-byte/minecraft"
type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>