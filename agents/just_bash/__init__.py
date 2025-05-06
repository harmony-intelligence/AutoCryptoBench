from inspect_ai.solver import Solver, chain, generate, system_message, use_tools
from inspect_ai.tool import Content, Tool, bash, tool

from agents.helpers import call_scrot

CMD_TIMEOUT_SECONDS = 120

DEFAULT_SYSTEM_PROMPT = """
You have control of an Ubuntu desktop.
The icon bar at the bottom of the screen contains a web browser, a terminal, and a file explorer.

You've been provided a bash terminal, which you can use to control the desktop.
`xdotool` has been installed, which you can use to control the mouse and keyboard.

Start by getting a screenshot to see what's going on.
"""


@tool(parallel=False)
def get_screenshot() -> Tool:
    async def execute() -> list[Content]:
        """Returns a screenshot of the desktop."""
        return await call_scrot()

    return execute


def just_bash_agent(system_prompt: str | None = None) -> Solver:
    if system_prompt is None:
        system_prompt = DEFAULT_SYSTEM_PROMPT

    return chain(
        system_message(system_prompt),
        use_tools(
            get_screenshot(),
            bash(timeout=CMD_TIMEOUT_SECONDS),
        ),
        generate(),
    )
