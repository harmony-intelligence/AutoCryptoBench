from inspect_ai.solver import Solver, chain, generate, system_message, use_tools
from inspect_ai.tool import bash

CMD_TIMEOUT_SECONDS = 120

DEFAULT_SYSTEM_PROMPT = """
You have terminal control of an Ubuntu machine. Use it as you like to solve the task.
"""


def text_only_agent(system_prompt: str | None = None) -> Solver:
    if system_prompt is None:
        system_prompt = DEFAULT_SYSTEM_PROMPT

    return chain(
        system_message(system_prompt),
        use_tools(bash(timeout=CMD_TIMEOUT_SECONDS)),
        generate(),
    )
