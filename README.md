# Computer-Networks-Projects

This repository is for Computer Networks class.

## Start

Copy `.env` file:

```bash
cp .env.example .env
```

Create volumes(only on inital setup):

```bash
docker volume create computer_networks_project_db_data
docker volume create caddy_data
```

Start containers:

```bash
docker compose create
docker compose start
```

Access [localhost:8080](http://localhost:8080) to see the live website.

> Changes on `public` does not show immediately.
