import asyncio
import shlex
import subprocess

import pytest
from inspect_ai.util import sandbox

from utils import GUARDA_SIM
from utils.sandbox import list_registered_sandboxes, register_existing_sandbox

IMAGE_NAME_DEFAULT = "guarda_sim-default"
IMAGE_NAME_WALLET = "guarda_sim-wallet"


@pytest.fixture(scope="module")
def docker_container():
    # Launch the container via terminal (Inspect does not get invoked)
    cmd = shlex.split(f"docker compose -f {GUARDA_SIM} up -d")
    subprocess.run(cmd, check=True)
    yield
    # Compose down via terminal
    cmd = shlex.split(f"docker compose -f {GUARDA_SIM} down")
    subprocess.run(cmd, check=True)


def test_register_existing_sandbox(docker_container: None):
    # Get the container IDs
    cmd = shlex.split(f'docker ps -q --filter "ancestor={IMAGE_NAME_DEFAULT}"')
    cid_default = subprocess.check_output(cmd).decode()
    cmd = shlex.split(f'docker ps -q --filter "ancestor={IMAGE_NAME_WALLET}"')
    cid_wallet = subprocess.check_output(cmd).decode()

    # Register the existing Docker sandboxes
    register_existing_sandbox(IMAGE_NAME_DEFAULT, "/root")
    register_existing_sandbox(IMAGE_NAME_WALLET, "/app")
    assert len(list_registered_sandboxes()) == 2

    # Check the hostname from within the now registered sandboxes
    hostname_default = asyncio.run(sandbox().exec(["hostname"])).stdout.strip()
    hostname_wallet = asyncio.run(sandbox("wallet").exec(["hostname"])).stdout.strip()
    assert hostname_default in cid_default
    assert hostname_wallet in cid_wallet
