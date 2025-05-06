# Contains helper functions to allow usage of a Docker `sandbox()` outside
# of the Inspect AI eval environment.

import asyncio

from inspect_ai.util import sandbox
from inspect_ai.util._sandbox.context import sandbox_environments_context_var
from inspect_ai.util._sandbox.docker.cleanup import project_cleanup_startup  # type: ignore

# The 4 `type: ignore` below are for missing stub files
from inspect_ai.util._sandbox.docker.compose import compose_build  # type: ignore
from inspect_ai.util._sandbox.docker.docker import DockerSandboxEnvironment  # type: ignore
from inspect_ai.util._sandbox.docker.util import ComposeProject  # type: ignore

from utils import DESKTOP_BASE

TASK_NAME = "dummy_task_name"
CONFIG = DESKTOP_BASE
WORKING_DIR = "/root"


def docker_compose_up(
    config: str = CONFIG,
    working_dir: str = WORKING_DIR,
    name: str = "desktop_base",
) -> None:
    """docker-compose up the sandbox environment."""
    project_cleanup_startup()  # sets a required ContextVar for `.sample_init`

    compose_project = ComposeProject(
        name=name,
        config=config,
        env={},
        sample_id=None,
        epoch=None,
    )
    asyncio.run(compose_build(compose_project))

    dse = DockerSandboxEnvironment(
        service="default",
        project=compose_project,
        working_dir=working_dir,
    )
    coro = dse.sample_init(
        task_name=TASK_NAME,
        config=config,
        metadata={"metadata.key": "metadata.value"},
    )
    service_dse = asyncio.run(coro)

    # Sets a ContextVar so that `sandbox()` will point to your Docker service
    sandbox_environments_context_var.set(service_dse)


def docker_compose_down(config: str = CONFIG) -> None:
    """docker-compose down the sandbox environment."""
    asyncio.run(
        sandbox().sample_cleanup(
            task_name=TASK_NAME,
            config=CONFIG,
            environments={"default": sandbox()},
            interrupted=False,
        )
    )
    sandbox_environments_context_var.set({})


# Example usage of this module
if __name__ == "__main__":
    # compose up so that `sandbox()` will be available
    docker_compose_up()

    # Run arbitrary code here that calls `sandbox()`
    result = asyncio.run(sandbox().exec(["ls"]))
    print(result)

    # compose down when done
    # docker_compose_down()
