import shlex
from pathlib import Path
from time import gmtime, strftime

from inspect_ai.model import ContentImage
from inspect_ai.tool import Content, Tool, ToolDef, ToolError
from inspect_ai.util import sandbox

# This is the dir used in the docker-desktop container.
SCREENSHOTS_DIR = "/tmp/screenshots"  # noqa


class ToolGetter:
    """A wrapper around `list[Tool]` to conveniently get/call tools.

    Used in tests that manually solves tasks by calling tools. It makes reading
    the test code easier as it's clearer which tool is being called, rather than
    seeing `state.tools[3]` or similar.

    Example usage:
    ```python
    async def solve(state: TaskState, generate: Generate):
        tools = ToolGetter(state.tools)  # state.tools: list[Tool]
        result = await tools["mouse_move"](100, 200)
    ```
    """

    def __init__(self, tools: list[Tool]):
        self.tools = {ToolDef(tool).name: tool for tool in tools}

    def __getitem__(self, tool_name: str) -> Tool:
        return self.tools[tool_name]


async def call_scrot() -> list[Content]:
    # Create a filepath for the screenshot
    gmt_string = strftime("%Y-%m-%d_%H-%M-%S_GMT", gmtime())
    filepath = (Path(SCREENSHOTS_DIR) / f"{gmt_string}.png").as_posix()

    # Create the screenshots directory if it doesn't exist
    cmd = f"mkdir -p {SCREENSHOTS_DIR}"
    result = await sandbox().exec(shlex.split(cmd))
    if not result.success:
        raise ToolError(result.stderr)

    # Run `scrot`
    cmd = f"scrot -p {filepath}"
    result = await sandbox().exec(shlex.split(cmd))
    if not result.success:
        raise ToolError(result.stderr)

    # Get the base64 encoding of the screenshot
    cmd = f"base64 -w 0 {filepath}"
    result = await sandbox().exec(shlex.split(cmd))
    if not result.success:
        raise ToolError(result.stderr)
    base64_image = result.stdout.strip()

    # Return the screenshot as a ContentImage
    data_uri = f"data:image/png;base64,{base64_image}"
    content = ContentImage(image=data_uri)
    return [content]
