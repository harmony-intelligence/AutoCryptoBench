import os

from dotenv import load_dotenv
from inspect_ai.solver import Solver

from .just_bash import just_bash_agent
from .simple import simple_agent
from .simple_claude_mouse import simple_claude_mouse_agent
from .text_only import text_only_agent

load_dotenv()


def get_agent(
    agent: str | None = "simple",
    system_prompt: str | None = None,
    width: int = 1440,
    height: int = 810,
    claude_thinking: bool = False,
) -> Solver:
    match agent:
        case None | "simple":
            # Use the simple agent by default if none was specified
            return simple_agent(system_prompt, width, height, claude_thinking)
        case "simple_claude_mouse":
            # Check early for a key, as it is needed to use Claude mouse tool
            api_key = str(os.environ.get("ANTHROPIC_API_KEY", ""))
            if not api_key:
                raise ValueError("Environment variable ANTHROPIC_API_KEY must be set.")
            return simple_claude_mouse_agent(system_prompt, width, height)
        case "just_bash":
            return just_bash_agent(system_prompt)
        case "text_only":
            return text_only_agent(system_prompt)
        case _:
            raise ValueError(f"Unknown agent: {agent}")
