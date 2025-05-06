import asyncio
import shlex

from inspect_ai.tool import Content, Tool, ToolError, tool
from inspect_ai.util import sandbox

from agents.helpers import call_scrot


@tool(parallel=False)
def get_screenshot() -> Tool:
    async def execute() -> list[Content]:
        """Returns a screenshot of the desktop."""
        return await call_scrot()

    return execute


@tool(parallel=False)
def move_mouse() -> Tool:
    async def execute(x: int, y: int) -> list[Content]:
        """Move the mouse to the given pixel coodinates.

        Args:
            x: The x-coordinate in pixels.
            y: The y-coordinate in pixels.

        Returns:
            A screenshot of the screen
        """
        cmd = f"xdotool mousemove {x} {y}"
        result = await sandbox().exec(shlex.split(cmd))
        if not result.success:
            raise ToolError(result.stderr)
        await asyncio.sleep(0.5)  # Simple hack to ensure async tool completion before screenshot
        return await call_scrot()

    return execute


@tool(parallel=False)
def left_click() -> Tool:
    async def execute() -> list[Content]:
        """Left click the mouse."""
        cmd = "xdotool click 1"
        result = await sandbox().exec(shlex.split(cmd))
        if not result.success:
            raise ToolError(result.stderr)
        await asyncio.sleep(2)  # Simple hack to ensure async tool completion before screenshot
        return await call_scrot()

    return execute


@tool(parallel=False)
def right_click() -> Tool:
    async def execute() -> list[Content]:
        """Right click the mouse."""
        cmd = "xdotool click 3"
        result = await sandbox().exec(shlex.split(cmd))
        if not result.success:
            raise ToolError(result.stderr)
        await asyncio.sleep(2)  # Simple hack to ensure async tool completion before screenshot
        return await call_scrot()

    return execute


@tool(parallel=False)
def double_click() -> Tool:
    async def execute() -> list[Content]:
        """Double click the mouse."""
        cmd = "xdotool click --repeat 2 --delay 200 1"
        result = await sandbox().exec(shlex.split(cmd))
        if not result.success:
            raise ToolError(result.stderr)
        await asyncio.sleep(5)  # Simple hack to ensure async tool completion before screenshot
        return await call_scrot()

    return execute


@tool(parallel=False)
def scroll_wheel_up() -> Tool:
    async def execute(num_clicks: int) -> list[Content]:
        """Scroll the mouse wheel up by the given number of clicks.

        Args:
            num_clicks: The number of clicks to scroll the wheel up.
        """
        cmd = "xdotool click 4"
        for _ in range(num_clicks):
            result = await sandbox().exec(shlex.split(cmd))
            if not result.success:
                raise ToolError(result.stderr)
            await asyncio.sleep(0.1)
        return await call_scrot()

    return execute


@tool(parallel=False)
def scroll_wheel_down() -> Tool:
    async def execute(num_clicks: int) -> list[Content]:
        """Scroll the mouse wheel down by the given number of clicks.

        Args:
            num_clicks: The number of clicks to scroll the wheel down.
        """
        cmd = "xdotool click 5"
        for _ in range(num_clicks):
            result = await sandbox().exec(shlex.split(cmd))
            if not result.success:
                raise ToolError(result.stderr)
            await asyncio.sleep(0.1)
        return await call_scrot()

    return execute


@tool(parallel=False)
def xdotool_type() -> Tool:
    async def execute(args: str) -> list[Content]:
        """Use the keyboard by running `xdotool type` with the given args.

        Args:
            args: arguments in the form `xdotool type {args}`.
              Cannot handle single quotes; use `xdotool key apostrophe` via the
              xdotool_key tool to press the single quote key.

        Returns:
            A screenshot of the screen

        """
        cmd = f"xdotool type '{args}'"
        result = await sandbox().exec(shlex.split(cmd))
        if not result.success:
            raise ToolError(result.stderr)
        await asyncio.sleep(2)  # Simple hack to ensure async tool completion before screenshot
        return await call_scrot()

    return execute


@tool(parallel=False)
def xdotool_key() -> Tool:
    async def execute(args: str) -> list[Content]:
        """Use the keyboard by running `xdotool key` with the given args.

        Args:
            args: arguments in the form `xdotool key {args}`.

        Returns:
            A screenshot of the screen
        """
        cmd = f"xdotool key {args}"
        result = await sandbox().exec(shlex.split(cmd))
        if not result.success:
            raise ToolError(result.stderr)
        await asyncio.sleep(2)  # Simple hack to ensure async tool completion before screenshot
        return await call_scrot()

    return execute


@tool(parallel=False)
def wait() -> Tool:
    async def execute(seconds: int) -> list[Content]:
        """Wait for the given number of seconds. Useful for waiting for pages to load.

        Args:
            seconds: The number of seconds to wait.
        """
        await asyncio.sleep(seconds)
        return await call_scrot()

    return execute
