To build `desktop_metamask` (from the root of the repo):
```bash
docker compose --env-file .env -f docker/desktop_metamask/docker-compose.yml build
```

If tasks that use `desktop_metamask` fails at the Docker build step, you may need to build `desktop_base` first:

To build `desktop_base` (from the root of the repo):
```bash
docker compose --env-file .env -f docker/desktop_base/docker-compose.yml build
```
