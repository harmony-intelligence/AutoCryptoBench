## Usage

First make sure you've renamed `.env.clone` to `.env` and set your environment variables.

To build (from the root of the repo):
```bash
docker compose --env-file .env -f docker/desktop_base/docker-compose.yml build
```

To launch a container (from the root of the repo):
```bash
docker compose --env-file .env -f docker/desktop_base/docker-compose.yml up
```

After launching a container, to watch/interact with the desktop:
- Go to `https://localhost:5900` in a VNC client (e.g. [RealVNC](https://www.realvnc.com/en/connect/download/viewer/))
  - You might need to sub `5900` for the port number defined by `VNC_PORT` in your `.env` file


## Debugging code that uses `sandbox()`

Inspect's `sandbox` function lets you access the underlying sandbox environment (a Docker container in our case). It's pretty opaque and abstract how it works. See `utils/sandbox.py` for a script that let's you call `sandbox()` outside of running a task.


## Dev note
- Pin the versions of every system level library
