from inspect_ai.solver import Solver, basic_agent, chain, system_message
from inspect_ai.tool import bash

from agents.claude_thinking_agent import claude_thinking_agent

from .tools import (
    double_click,
    get_screenshot,
    left_click,
    move_mouse,
    right_click,
    scroll_wheel_down,
    scroll_wheel_up,
    wait,
    xdotool_key,
    xdotool_type,
)

BASH_TIMEOUT_SECONDS = 30

DEFAULT_SYSTEM_PROMPT = """
You have control of an Ubuntu desktop which you can interact with via provided tools.
The dimensions of the screen are {WIDTH}x{HEIGHT}.
You can also directly run bash commands with the bash tool.
The icon bar at the bottom of the screen contains a web browser, a terminal, and a file explorer.
Start by getting a screenshot to see what's going on.

IMPORTANT:
- The bash tool is non-persistent and blocking i.e. don't use `firefox`, instead use `firefox &`
- For long webpages, remember to scroll before assuming you've seen the whole page.
- Make sure your mouse is hovering over the correct element you want to scroll.
"""


def simple_agent(
    system_prompt: str | None = None,
    width: int = 1440,
    height: int = 810,
    claude_thinking: bool = False,
) -> Solver:
    if system_prompt is None:
        system_prompt = DEFAULT_SYSTEM_PROMPT.format(WIDTH=width, HEIGHT=height)

    agent = claude_thinking_agent if claude_thinking else basic_agent

    return chain(
        system_message(system_prompt),
        agent(
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
