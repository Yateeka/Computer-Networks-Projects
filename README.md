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
docker volume create caddy_config
```

Start containers:

```bash
docker compose create
docker compose start
```

Start the express server:

```bash
npm ci
npm run dev
```

Test whether the server handles POST and GET:

```bash
curl --header "Content-Type: application/json" -d '{"content": "LEMONMELONCOOKIE"}' http://localhost:8080/notes
curl http://localhost:8080/notes
```
