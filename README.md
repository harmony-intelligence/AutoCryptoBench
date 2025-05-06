# AutoCryptoBench

*Evaluating LLMs on Autonomous Money Making via Cryptocurrency*

This repo hosts the code used to generate experimental results for AutoCryptoBench.

See the [website](https://autocryptobench.com/) for the written report.

<!---------------------------------------------------------------------------->
## Table of Contents

- [Project setup](#project-setup)
  - [Python](#python)
  - [Docker](#docker)
  - [Environment variables](#environment-variables)
  - [Activating the environment](#activating-the-environment)
- [Running tasks](#running-tasks)
  - [Run results](#run-results)
  - [Live observability](#live-observability)
- [Other tips for running tasks](#other-tips-for-running-tasks)


<!---------------------------------------------------------------------------->
## Project setup

### Python
- This project uses `uv` to manage Python versions and packages
  - Instructions to install `uv` [here](https://docs.astral.sh/uv/getting-started/installation/)
  - We are using version `0.5.1` at the time of writing this README
- This project uses Python 3.12
  - Use `uv python` to see a list of commands to manage Python versions
- You can use `uv sync --dev` to install Python dependencies

### Docker
- This project uses `docker` and `docker compose` to create desktop environments
  - Instructions to install `docker` [here](https://docs.docker.com/engine/install/)
    - Version `27.1.0` is being used at the time of writing this README
  - Instructions to install `docker compose` [here](https://docs.docker.com/compose/install/)
    - Version `v2.29.0` is being used at the time of writing this README
- Before running any tasks, first build the base image as some tasks use images that extend this base image: `docker compose --env-file .env -f docker/desktop_base/docker-compose.yml build`

> [!NOTE]
> If you haven't yet built the images this project needs, expect the first time you run evals or tests to take a few minutes as the images build in the background.


### Environment variables
Before running any code, make sure you rename `.env.clone` to `.env` and update the environment variables as needed.

Some environment variables are pretty involved to setup e.g. credentials to a ProtonMail account, the seed phrase of a loaded crypto wallet. See the READMEs corresponding to each task to find out which environment variables are needed.

### Activating the environment
After running `uv sync --dev`, you should get a `.venv/` directory in the project root.

To activate the `uv` environment, run:
```bash
source .venv/bin/activate
```

Alternatively, you can run commands prepended with `uv run ` if you want to run commands within the `uv` environment without actually activating the environment.


<!---------------------------------------------------------------------------->
## Running tasks

Running tasks is very simple. From the repo root and with the `uv` environment active:
```bash
inspect eval tasks/simple_examples/hello_world/task.py --model=anthropic/claude-3-7-sonnet-latest -T agent="simple" -T width=1440 -T height=810
```

- To swap out tasks, simply choose a different path to another `task.py` file
- To swap out agents, replace the `agent="AGENT_NAME"` with another agent name
  - See [`agents/README.md`](agents/README.md) for a list of available agents. `simple` is the default when none is specified
- To swap out the underlying LLM, replace `--model="MODEL_NAME"`
  - See [this page](https://inspect.ai-safety-institute.org.uk/models.html) from the Inspect docs for available models and their names
- `-T width=1440 -T height=810` refers to the screen dimensions of the virtual desktop
  - We require these to be explicitly set as different models have different optimal sizes for the images input. Certain sizes or aspect ratios can get scaled or cropped which will negatively impact mouse navigation accuracy. See each model provider's API docs for details. As of 2025-04-22, we recommend the following dimensions:
    - Anthropic models: 1440x810
    - Gemini models: 1536x768
    - GPT models: 1536x768
- See [this page](https://inspect.ai-safety-institute.org.uk/workflow.html#parameters) from the Inspect docs for some more details about task arguments (`-T`)

### Run results

By default, results of a run are saved locally in `logs/`. Inspect comes with a nice viewer for logs which you can launch with:
```bash
inspect view
```

then head to `http://localhost:7575/` too see the logs.


### Live observability

After launching a container, to watch/interact with the desktop:
- Go to `https://localhost:5900` in a VNC client (e.g. [RealVNC](https://www.realvnc.com/en/connect/download/viewer/))
  - You might need to sub `5900` for the port number defined by `VNC_PORT` in your `.env` file

## Other tips for running tasks
- Add `--approval="human"` to require human approval before every tool call
- Add `--no-sandbox-cleanup` to keep the desktop environment around for you to manually explore
- You can use `--model=mockllm/model` to run a task without calling an actual LLM
- There's a custom approval policy that makes the agent wait for human approval only on the first tool call
  - Use case: this mimics an agent waiting for a human to say "go" before doing the rest of the run
  -  [`tasks/simple_examples/wait_before_start_task/`](tasks/simple_examples/wait_before_start_task/) for an example of how to use it
- If you want to have a new task attach to an existing container rather than spinning up new containers, see [`utils/sandbox/_register.py`](utils/sandbox/_register.py) for an example under `__main__`

## Running evals in parallel
- By default, you can only do runs one at a time, so `inspect eval` runs with epochs >1 will need `--max-samples=1`
- If you'd like to do runs in parallel, you'll need to do the following:
  - Use an IDE to find all instances of `ALLOW_PARALLEL_RUNS`
  - Comment out the code blocks between `ALLOW_PARALLEL_RUNS <START>` and `ALLOW_PARALLEL_RUNS <END>`
- Only the follow tasks are compatible with parallel runs:
  - `tasks/crypto/wallets/metamask/task.py`
  - `tasks/crypto/wallets/guarda_import/task.py`
  - `tasks/crypto/wallets/monero_generic/task.py`
  - `tasks/crypto/airdrops/point_farming_sim/task.py`
  - `tasks/portfolio_management/crypto2crypto/guarda_sim/task.py`
  - `tasks/scaling_operations/find_crypto_vps/task.py`
