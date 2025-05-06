import asyncio
import base64
import imghdr  # type: ignore (package doesn't provide stubs)
import shlex
import warnings

import pytest
from inspect_ai.tool import ContentImage
from inspect_ai.util import sandbox

from agents.simple.tools import (
    double_click,
    get_screenshot,
    left_click,
    move_mouse,
    right_click,
    wait,
    xdotool_key,
    xdotool_type,
)
from utils.sandbox import docker_compose_down, docker_compose_up


@pytest.fixture(scope="module")
def docker_container():
    docker_compose_up()
    yield
    docker_compose_down()


def is_valid_image_base64(base64_string: str) -> bool:
    """Check if a base64 string represents a valid image."""
    # Remove header if present
    if "," in base64_string:
        base64_string = base64_string.split(",")[1]
    try:
        image_data = base64.b64decode(base64_string)
        # This `type: ignore` is for pyright. Resolving the pyright complaint
        # via casting causes Pylance to complain about unnecessary casting.
        # I think this is downstream of `imghdr.what` not having a stub.
        image_type = imghdr.what(None, image_data)  # type: ignore
        return image_type is not None
    except Exception:
        return False


@pytest.mark.filterwarnings("ignore::DeprecationWarning")
async def test_get_screenshot(docker_container: None):
    result = await get_screenshot()()
    if not isinstance(result, list) or not isinstance(result[0], ContentImage):
        raise AssertionError("Expected get_screenshot() tool to return list[ContentImage]")
    base64_str: str = result[0].image
    assert is_valid_image_base64(base64_str)


async def window_cleanup(wmctrl_list: str, substring_match: str):
    windows = wmctrl_list.strip().split("\n")
    for window in windows:
        if substring_match in window:
            window_id = window.split()[0]
            cmd = f"wmctrl -i -c {window_id}"
            await sandbox().exec(shlex.split(cmd))


async def test_double_click(docker_container: None):
    await move_mouse()(x=80, y=300)
    await double_click()()
    await asyncio.sleep(2)
    result = await sandbox().exec(shlex.split("wmctrl -l"))
    assert "File Manager" in result.stdout
    await window_cleanup(result.stdout, "File Manager")


async def test_left_right_click(docker_container: None):
    await move_mouse()(x=80, y=300)
    await right_click()()
    await asyncio.sleep(0.2)
    await move_mouse()(x=85, y=305)
    await left_click()()
    await asyncio.sleep(2)
    result = await sandbox().exec(shlex.split("wmctrl -l"))
    assert "File Manager" in result.stdout
    await window_cleanup(result.stdout, "File Manager")


async def test_xdotool_key_type(docker_container: None):
    terminal_task = asyncio.create_task(sandbox().exec(shlex.split("xfce4-terminal")))
    await asyncio.sleep(2)
    await xdotool_type()("echo Hello World! > hello.txt")
    await asyncio.sleep(0.5)
    await xdotool_key()("Return")
    await asyncio.sleep(0.5)
    result = await sandbox().exec(shlex.split("cat hello.txt"))
    assert "Hello World!" in result.stdout
    await sandbox().exec(shlex.split("rm hello.txt"))
    result = await sandbox().exec(shlex.split("wmctrl -l"))
    await window_cleanup(result.stdout, "Terminal")
    try:
        terminal_task.cancel()
        await terminal_task
    except asyncio.CancelledError:
        pass


async def test_wait(docker_container: None):
    start_time = asyncio.get_event_loop().time()
    await wait()(seconds=3)
    end_time = asyncio.get_event_loop().time()
    assert end_time - start_time >= 3


def test_scroll_wheel():
    """TODO: test not yet implemented.

    Tools to test: scroll_wheel_up, scroll_wheel_down

    Test idea:
    - Open Selenium and go to a long webpage
    - Use `driver.execute_script("return window.pageYOffset;")` to get the page offset
    - Use the tools to scroll the page
    - Check if the page offset changes correctly
    - Would have to launch a Python Selenium script async that continually collects
        page offset, then use the tools while the Python script is running, then check
        if the array of page offsets has changed correctly

    James: I've manually tested the tools and they work, but it would be good
      to have an automated test.
    """
    warnings.warn("TODO: test not yet implemented", stacklevel=1)
