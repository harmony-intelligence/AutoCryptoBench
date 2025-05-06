import pytest
from inspect_ai.util import sandbox

from utils.sandbox import docker_compose_down, docker_compose_up


@pytest.fixture(scope="module")
def docker_container():
    docker_compose_up()
    yield
    docker_compose_down()


@pytest.mark.asyncio(loop_scope="module")
async def test_no_host_env_vars(docker_container: None):
    result = await sandbox().exec(["env"])

    # Make sure we're actually getting environment variables
    assert "HOME=" in result.stdout

    # Make sure the host's environment variables aren't being passed to the container
    assert "ANTHROPIC_API_KEY" not in result.stdout
