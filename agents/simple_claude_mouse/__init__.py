"""Same as `simple` agent but outsources move coordinates calculation to Claude.

Why this agent exists: after running GPT-4o and Gemini 2.0 Flash on our tasks,
we found that those models could not reliably move the mouse accurately.
Even something like a 70% hit rate would compound terribly over a long task,
which many of our tasks are.

In order to test the capabilities of non-Claude models while isolating out
mouse movement accuracy, we created `simple_claude_mouse` which is almost the
same as the `simple` agent except now the `move_mouse` tool outsources the
calculation of pixel coordinates to Claude 3.7 Sonnet.
"""

import asyncio
import shlex

from inspect_ai.model import ContentImage
from inspect_ai.solver import Solver, basic_agent, chain, system_message
from inspect_ai.tool import Content, Tool, ToolError, bash, tool
from inspect_ai.util import sandbox

from agents.helpers import call_scrot
from agents.simple import BASH_TIMEOUT_SECONDS, DEFAULT_SYSTEM_PROMPT
from agents.simple.tools import (
    double_click,
    get_screenshot,
    left_click,
    right_click,
    scroll_wheel_down,
    scroll_wheel_up,
    wait,
    xdotool_key,
    xdotool_type,
)

from .ask_claude import ask_claude_for_coords


@tool(parallel=False)
def move_mouse() -> Tool:
    async def execute(location_description: str) -> list[Content]:
        """Ask an operator to move the mouse to the given location.

        Make sure the description is clear and unambiguous. The operator will not
        have much context so don't assume they know what you mean e.g. they won't know
        the globe icon will open up Firefox, so you need to describe locations as if the
        only information available is in the screenshot. Add lots of clarifying detail.

        Args:
            location_description: A description of the location to move the mouse to.

        Returns:
            A screenshot of the screen
        """
        # Ask Claude for coordinates
        scrot_result = await call_scrot()
        if isinstance(scrot_result[0], ContentImage):
            image = scrot_result[0].image
        else:
            raise ToolError("Could not get screenshot")
        base64_image = image.replace("data:image/png;base64,", "")
        x, y = ask_claude_for_coords(location_description, base64_image)

        # Move the mouse to the coordinates
        cmd = f"xdotool mousemove {x} {y}"
        result = await sandbox().exec(shlex.split(cmd))
        if not result.success:
            raise ToolError(result.stderr)
        await asyncio.sleep(0.5)  # Simple hack to ensure async tool completion before screenshot
        return await call_scrot()

    return execute


def simple_claude_mouse_agent(
    system_prompt: str | None = None,
    width: int = 1440,
    height: int = 810,
) -> Solver:
    if system_prompt is None:
        system_prompt = DEFAULT_SYSTEM_PROMPT.format(WIDTH=width, HEIGHT=height)

    return chain(
        system_message(system_prompt),
        basic_agent(
            tools=[
                get_screenshot(),
                move_mouse(),
                left_click(),
                right_click(),
                double_click(),
                scroll_wheel_down(),
                scroll_wheel_up(),
                wait(),
                xdotool_key(),
                xdotool_type(),
                bash(timeout=BASH_TIMEOUT_SECONDS),
            ],
        ),
    )
