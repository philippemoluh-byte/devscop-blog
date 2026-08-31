# Baby Tools World

Baby Tools World is a Django 6 sample shop application built for educational purposes.
It demonstrates a simple full-stack setup with products, user authentication, and test coverage.

:::info

This project is intended for learning and development use.

:::

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quickstart](#quickstart)
- [Usage](#usage)
  - [Linting and Formatting](#linting-and-formatting)
  - [Testing](#testing)
  - [WSGI Notes](#wsgi-notes)
  - [Seeding Data](#seeding-data)
  - [Containerization](#containerization)
- [Further References](#further-references)

## Prerequisites

Install the following tools before you start:

- Git
- Docker

## Quickstart

Clone the repository and navigate into it.

Clone the Git repository:

```bash
git clone git@github.com:philippemoluh-byte/baby-tools-world.git
```

Navigate to the repository:

```bash
cd baby-tools-world
```

Configure the required application environment variables:

```bash
cp example.env .env
```

Edit the environment variables:

```bash
 # Edit the .env file
 nano .env

 # Set the following variable
 BTW_SECRET_KEY=<your_secret>

 # True for development, false for other environments
 DEBUG=<your_boolean_value>
 ALLOWED_HOSTS=<your_ip>

 # Database settings
 DB_ENGINE=<your_db_engine>
 DB_NAME=<your_db_name>
 DB_USER=<your_db_user>
 DB_PASSWORD=<your_db_password>
 DB_HOST=<your_db_host>
 DB_PORT=<your_db_port>
```

Create a virtual environment:

```bash
python -m venv my-venv
```

Activate the virtual environment:

```bash
# Windows (PowerShell)
my-venv\Scripts\Activate.ps1

# macOS/Linux
source my-venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Apply database migrations:

```bash
cd src
python manage.py makemigrations
python manage.py migrate
```

Run the development server:

```bash
python manage.py runserver
```

Open your_local_host:8000 in your browser.

Optionally, create an admin user:

```bash
python manage.py createsuperuser
```

## Usage

### Linting and Formatting

Run these commands before creating a commit:

```bash
# from repository root
black .
isort .

# from src (uses src/.flake8)
cd src
flake8 .
```

If CI fails on style checks, run the commands above locally, commit the changes, and push again.

### Testing

Run tests from the src directory:

```bash
cd src
python manage.py test
```

More details are available in [docs/testing.md](./docs/testing.md).

### WSGI Notes

For production-like serving, you can use a WSGI server such as gunicorn.
On Windows, waitress can be a practical alternative.

More details: [docs/wsgi.md](./docs/wsgi.md).

### Seeding Data

To populate the database with demo categories and products:

```bash
cd src
python manage.py seed_db
```

### Containerization

> [!NOTE]
>
> Make sure you run the following commands in the directory where the Dockerfile is located.

Build the image:

```bash
docker build -t baby-tools-world:local .
```

Run the container:

```bash
docker run --rm -it -p 8000:8000 baby-tools-world:local
```

Run the container with an environment file:

```bash
docker run --rm -it -p 8000:8000 --env-file .env baby-tools-world:local
```

## Further References

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition
link="https://github.com/philippemoluh-byte/baby-tools-world"
type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>