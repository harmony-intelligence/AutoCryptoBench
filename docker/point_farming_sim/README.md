## Building and using just the mock website

Manually build the Docker image (from repo root):

```bash
docker build -t point_farming_sim -f docker/point_farming_sim/Dockerfile docker/point_farming_sim/
```

Manually launch the web app (from repo root):
```bash
docker run --rm -p 80:80 point_farming_sim
```

Once the container is up, access the mock website in your browser via `http://localhost:80`.


## Building and using the agent setup

To build (from the root of the repo):
```bash
docker compose --env-file .env -f docker/point_farming_sim/docker-compose.yml build
```

To launch a container (from the root of the repo):
```bash
docker compose --env-file .env -f docker/point_farming_sim/docker-compose.yml up
```

From inside the `desktop-agent` container, you can access the mock website via `http://galaxy/`.
