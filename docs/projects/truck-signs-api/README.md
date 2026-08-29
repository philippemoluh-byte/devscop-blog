# Signs for Trucks

<div align="center">

![Python version](https://img.shields.io/badge/Python-3.12.0-4c566a?logo=python&&longCache=true&logoColor=white&colorB=pink&style=flat-square&colorA=4c566a) ![Django version](https://img.shields.io/badge/Django-5.2.8-4c566a?logo=django&&longCache=truelogoColor=white&colorB=pink&style=flat-square&colorA=4c566a) ![Django-RestFramework](https://img.shields.io/badge/Django_Rest_Framework-3.16.1-red.svg?longCache=true&style=flat-square&logo=django&logoColor=white&colorA=4c566a&colorB=pink)

![Truck Signs](./screenshots/Truck_Signs_logo.png)

__Signs for Trucks__ is an online store for buying pre-designed vinyls with custom lines of lettering (often called truck letterings).
The store also allows clients to upload their own designs and customize them directly on the website.

</div>

## Table of Contents

- [Signs for Trucks](#signs-for-trucks)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Quickstart](#quickstart)
    - [Local Setup (without Docker)](#local-setup-without-docker)
    - [How to Build the Image](#how-to-build-the-image)
  - [Usage](#usage)
    - [Settings](#settings)
    - [Creating a Superuser](#creating-a-superuser)
    - [Models](#models)
    - [Brief Explanation of the Views](#brief-explanation-of-the-views)
  - [Project Structure](#project-structure)
  - [Screenshots of the Django Backend Admin Panel](#screenshots-of-the-django-backend-admin-panel)
    - [Mobile View](#mobile-view)
    - [Desktop View](#desktop-view)
  - [Additional Information](#additional-information)
    - [Postgresql Database](#postgresql-database)
    - [Docker](#docker)
    - [Django and DRF](#django-and-drf)
    - [Miscellaneous](#miscellaneous)

## Prerequisites

- [Python 3.12.0](https://www.python.org/downloads/release/python-3120/)
- [Git](https://git-scm.com/install/)

## Quickstart

### Local Setup (without Docker)

1. Clone the repo:

```bash
git clone git@github.com:Developer-Akademie-DevSecOpsKurs/truck-signs-api.git
cd truck-signs-api
```

1. Copy the example file and fill in your own values:

> [!NOTE]
> The `example.env` file in the project root gives an overview of the configuration values that can be set for the app.

```bash
cp example.env .env
```

1. Create a virtual environment:

```bash
python -m venv <venv_name>
```

1. Activate the virtual environment:

```bash
source <venv_name>/scripts/activate
```

1. Install the requirements:

```bash
pip install -r requirements.txt
```

1. Migrate the database:

```bash
python src/manage.py makemigrations
python src/manage.py migrate
```

1. Collect static files:

```bash
python src/manage.py collectstatic
```

1. Start the Python development server:

```bash
python src/manage.py runserver
```

### How to Build the Image

If you prefer to run the app in a container instead of setting up a local Python environment, you can build the Docker image directly from the provided `Dockerfile`:

```bash
docker build -t truck-signs-api .
```

Then start the container:

```bash
docker run --env-file .env -d -p 8000:8000 --name truck-signs-api truck-signs-api
```

The app should then be reachable at [localhost:8000](http://localhost:8000).

## Usage

### Settings

The `settings.py` file inside the `src/tsa_app` folder contains the different settings configurations for the application.

> [!NOTE]
> The application settings can be controlled via environment variables. The database can be switched using `MODE`:
>
> - `MODE=prod` switches the database to PostgreSQL, using `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, and `DB_PORT` from `.env`.
> - `MODE` unset, or `MODE=dev`, switches the database to SQLite at `src/db.sqlite3`; no DB environment variables are needed in that case.

`SECRET_KEY` is Django's secret key, used for cryptographic signing. To generate a new one, see this [Stack Overflow answer](https://stackoverflow.com/questions/41298963/is-there-a-function-for-generating-settings-secret-key-in-django).

`EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD` are the credentials used to send emails from the website when a client makes a purchase. This feature is currently disabled, but the code to activate it can be found, commented out, in the create-order view in `views.py`. Any valid email and password will work in the meantime.

The repository ships with a `Dockerfile` (based on `python:3.12-slim`) and an `entrypoint.sh` script that:

1. Waits for the database to become reachable.
2. Runs `python manage.py migrate --noinput`.
3. Runs `python manage.py collectstatic --noinput`.
4. Optionally creates a superuser from the `DJANGO_SUPERUSER_*` environment variables, if provided.
5. Starts the app with `gunicorn`.

Build the image from the project root:

```bash
docker build -t truck-signs-api:latest .
```

Optional build arguments (defined as `ARG` in the `Dockerfile`) can be overridden at build time, for example to change the internal port the app listens on:

```bash
docker build \
  --build-arg APP_PORT=8020 \
  -t truck-signs-api:latest .
```

Optionally, the image can also be built and run using Docker Compose:

```bash
docker compose --env-file .env up --build -d
```

### Creating a Superuser

Locally (without Docker):

```bash
python src/manage.py createsuperuser
```

In the container (with the Dockerfile):

```bash
docker exec -it truck-signs-api python manage.py createsuperuser
```

In the container (with Docker Compose):

```bash
docker compose exec web python manage.py createsuperuser
```

### Models

Most of the models do what can be inferred from their names. The notes below clarify the purpose of some of them:

- __Category Model:__ The category of the vinyls in the store. It contains the title of the category as well as the basic properties shared among products that belong to the same category. For example, _Truck Logo_ is a category for all vinyls that have a logo of a truck plus some lines of lettering (note that the vinyls are instances of the _Product_ model). Another category is _Fire Extinguisher_, for all vinyls that have a logo of a fire extinguisher.
- __Lettering Item Category:__ The category of the lettering, for example: _Company Name_, _VIN Number_, ... Each has a different pricing.
- __Lettering Item Variations:__ Contains a foreign key to the __Lettering Item Category__ and the text added by the client.
- __Product Variation:__ Has the original product as a foreign key, plus the lettering lines (instances of the __Lettering Item Variations__ model) added by the client.

### Brief Explanation of the Views

Most of the views are CBVs (class-based views) imported from _rest_framework.generics_, and they allow the backend API to perform the basic CRUD operations expected of it, inheriting from _ListAPIView_, _CreateAPIView_, _RetrieveAPIView_, and so on.

The behavior of some views had to be modified to address functionality such as order creation and payment: both operations are implemented within the same view, which therefore inherits from _GenericAPIView_ instead. Another example is the _UploadCustomerImage_ view, which takes the vinyl template uploaded by a client and creates a new product based on it.

:::info

To create truck vinyls with truck logos, first create the __Category__ "Truck Sign", and then the __Product__ (it can have any name). This ensures the frontend retrieves the truck vinyls for display in the product grid, since it only fetches products belonging to the "Truck Sign" category.

:::

## Screenshots of the Django Backend Admin Panel

### Mobile View

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="mobile" label="Mobile" default>
    ![alt text](./screenshots/Admin_Panel_View_Mobile.png)
  </TabItem>
  <TabItem value="mobile 2" label="Mobile 2">
    ![alt text](./screenshots/Admin_Panel_View_Mobile_2.png)
  </TabItem>
  <TabItem value="mobile 3" label="Mobile 3">
    ![alt text](./screenshots/Admin_Panel_View_Mobile_3.png)
  </TabItem>
</Tabs>




### Desktop View

<Tabs>
  <TabItem value="view 1" label="View 1" default>
    ![alt text](./screenshots/Admin_Panel_View.png)
  </TabItem>
  <TabItem value="view 2" label="View 2">
    ![alt text](./screenshots/Admin_Panel_View_2.png)
  </TabItem>
  <TabItem value="view 3" label="View 3">
    ![alt text](./screenshots/Admin_Panel_View_3.png)
  </TabItem>
</Tabs>



## Additional Information

### Postgresql Database

- Database setup: [DigitalOcean guide for Django deployment on a VPS](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04)

### Docker

- [Docker Official Documentation](https://docs.docker.com/)
- Dockerizing Django, PostgreSQL, Gunicorn, and Nginx:
  - GitHub repo by sunilale0: [Link](https://github.com/sunilale0/django-postgresql-gunicorn-nginx-dockerized/blob/master/README.md#nginx)
  - Article by Michael Herman on testdriven.io: [Link](https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/)

### Django and DRF

- [Django Official Documentation](https://docs.djangoproject.com/en/5.2/)
- Generate a new secret key: [Stack Overflow link](https://stackoverflow.com/questions/41298963/is-there-a-function-for-generating-settings-secret-key-in-django)
- Modify the Django Admin:
  - Small modifications (add searching, columns, ...): [Link](https://realpython.com/customize-django-admin-python/)
  - Modify templates and CSS: [Link from Medium](https://medium.com/@brianmayrose/django-step-9-180d04a4152c)
- [Django REST Framework Official Documentation](https://www.django-rest-framework.org/)
- More about nested serializers: [Stack Overflow link](https://stackoverflow.com/questions/51182823/django-rest-framework-nested-serializers)
- More about generic views: [testdriven.io link](https://testdriven.io/blog/drf-views-part-2/)

### Miscellaneous

- Create a virtual environment with Virtualenv and Virtualenvwrapper: [Link](https://docs.python-guide.org/dev/virtualenvs/)
- [Configure CORS](https://www.stackhawk.com/blog/django-cors-guide/)
- [Set up Django with Cloudinary](https://cloudinary.com/documentation/django_integration)

## Further References

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition
link="https://github.com/philippemoluh-byte/truck-signs-api"
type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>
