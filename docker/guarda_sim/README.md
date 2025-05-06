## Building and using just the mock website

Manually build the Docker image (from repo root):

```bash
docker build -t guarda_sim -f docker/guarda_sim/Dockerfile docker/guarda_sim/
```

Manually launch the web app (from repo root):
```bash
docker run --rm -p 8080:80 guarda_sim
```

Once the container is up, access the mock website in your browser via `http://localhost:8080`.


## Building and using the agent setup

To build (from the root of the repo):
```bash
docker compose --env-file .env -f docker/guarda_sim/docker-compose.yml build
```

To launch a container (from the root of the repo):
```bash
docker compose --env-file .env -f docker/guarda_sim/docker-compose.yml up
```

From inside the `desktop-agent` container, you can access the mock website via `http://wallet/`.
