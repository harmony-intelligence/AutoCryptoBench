import shlex
import subprocess

# Both type: ignore are for missing stubs
from inspect_ai.util._sandbox.context import sandbox_environments_context_var
from inspect_ai.util._sandbox.docker.docker import DockerSandboxEnvironment  # type: ignore
from inspect_ai.util._sandbox.docker.util import ComposeProject  # type: ignore
from inspect_ai.util._sandbox.environment import SandboxEnvironment


def list_registered_sandboxes() -> dict[str, SandboxEnvironment]:
    """List the registered sandbox environments.

    Returns:
        dict: A dictionary of sandbox environments, where the key is the service name.
    """
    return sandbox_environments_context_var.get({})


def remove_registered_sandbox(service: str) -> None:
    """Remove a registered sandbox environment.

    Args:
        service (str): The service name of the sandbox to remove.
    """
    sandbox_environments = sandbox_environments_context_var.get({})
    sandbox_environments.pop(service, None)
    sandbox_environments_context_var.set(sandbox_environments)


def register_existing_sandbox(image_name: str, working_dir: str) -> None:
    """Register an existing sandbox environment.

    Args:
        image_name (str): The image name in the format 'project-service'.
        working_dir (str): The working directory of the sandbox. Any calls to
            `sandbox().exec()` will be relative to this directory.
    """
    cmd = shlex.split(f'docker ps -q --filter "ancestor={image_name}"')
    if not subprocess.check_output(cmd).decode():
        raise ValueError(f"No running containers with image name '{image_name}'.")

    try:
        project, service = image_name.rsplit("-", maxsplit=1)
    except ValueError:
        raise ValueError("The image name must be in the format 'project-service'.") from None

    docker_env = DockerSandboxEnvironment(
        service=service,
        project=ComposeProject(name=project, config=None, env={}, sample_id=None, epoch=None),
        working_dir=working_dir,
    )

    # Add to the dict of sandbox environments
    sandbox_environments = sandbox_environments_context_var.get({})
    sandbox_environments[service] = docker_env
    sandbox_environments_context_var.set(sandbox_environments)


# Example usage of this module
if __name__ == "__main__":
    from asyncio import run

    from inspect_ai.util import sandbox

    from utils.sandbox import register_existing_sandbox

    # Outside of this script, launch the container
    register_existing_sandbox("desktop_base-default", "/root")

    # Print the hostname (container ID)
    result = run(sandbox().exec(["hostname"]))
    print(result.stdout.strip() + ":")

    # List the contents of the working directory
    result = run(sandbox().exec(["ls"]))
    print(result.stdout)

    # Output:
    # ```
    # jmsdao:~/.../opmm$ docker ps
    # CONTAINER ID   IMAGE                  COMMAND                  CREATED         STATUS                   PORTS                                       NAMES
    # d8d78d0f6374   desktop_base-default   "/host_setup/entrypo…"   7 seconds ago   Up 6 seconds (healthy)   0.0.0.0:5900->5900/tcp, :::5900->5900/tcp   desktop_base-default-1
    # jmsdao:~/.../opmm$ python utils/sandbox/_register.py
    # d8d78d0f6374:
    # Desktop
    # Documents
    # Downloads
    # Music
    # Pictures
    # Public
    # Templates
    # Videos
    #
    # jmsdao:~/.../opmm$
    # ```
    #
    # Things to note:
    # - The container ID printed is the same as the one in the `docker ps` output
    # - Inspect's way of creating a DockerSandboxEnvironment REQUIRES `image_name` to:
    #   - Be in the format 'project-service' (only one hyphen)
    #   - Have a container running who's image name matches the `image_name` argument
