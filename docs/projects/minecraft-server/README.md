# Minecraft Server

This guide walks you through running a Dockerized Minecraft Java server with Docker Compose, environment-based configuration, and persistent world data.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quickstart](#quickstart)
  - [Configure Server and Environment Variables](#configure-server-and-environment-variables)
- [Usage](#usage)
  - [Restarting After Configuration Changes](#restarting-after-configuration-changes)
- [Further References](#further-references)

## Prerequisites

- Git (to clone the repository)
- Docker
- Docker compose

## Quickstart

To quickly get started with the Minecraft server, follow these steps:

1. Clone the Git repository:

```bash
git clone git@github.com:philippemoluh-byte/minecraft.git
```

2. Navigate to the project directory:

```bash
cd minecraft
```

3. Activate the python virtual environment:

```bash
  source venv/bin/activate 
```
4. Then install mcstatus

```bash
# mcstatus is a Python library and command-line tool
# used to query and retrieve the status of Minecraft servers.
pip install mcstatus
````

### Configure Server and Environment Variables

1. Create the configuration file for the Minecraft server:

:::info

The `server.properties` file is the main Minecraft server configuration file.
It controls settings such as game mode, difficulty, maximum players, and MOTD.

:::

```bash
cp server.properties.example minecraft-server/server.properties
```

2. Create the environment variables file:

```bash
cp env.example minecraft-server/.env
```

3. Navigate to the `minecraft-server` directory:

```bash
cd minecraft-server
```

4. Edit the environment variables file (.env):

```bash
# Container Host Port.
MC_PORT=<your_host_port>

# Container-internal Minecraft port (default: 25565).
MC_CONTAINER_PORT=<your_container_port>

# Minecraft container name.
MC_CONTAINER_NAME=<your_container_name>

# URL of the Minecraft server JAR to download during image build.
MC_SERVER_JAVA_URL=<your_server_jar_url_to_download>
```

5. Save the changes and exit the .env file.

6. Start the Minecraft server:

```bash
docker compose --env-file .env up -d
```

## Usage

Check the server status:

```bash
mcstatus <your_host>:<your_port> status
```

Expected Result

```bash
version: <Your Minecraft Version>
motd: <The installed motd>
players: <Number of online Players/ Maximal number of players>
ping: <Minecraft latency (ping)>
```

View server logs:

```bas[entrypoint.sh](minecraft-server%2Fentrypoint.sh)h
docker compose logs -f mc-server
```

Stop the server:

```bash
docker compose down
```

### Restarting After Configuration Changes

:::info

Recreate the service if you edit `server.properties` or change runtime settings such as `port` or `container name` in `.env`:

:::

```bash
docker compose --env-file .env up -d --force-recreate
```

:::tip

Rebuild and recreate the service if you change build-time values such as `MC_SERVER_JAVA_URL` or the Dockerfile.

:::

```bash
docker compose --env-file .env up -d --build --force-recreate
```

## Further References

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition
link="https://github.com/philippemoluh-byte/minecraft"
type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>
