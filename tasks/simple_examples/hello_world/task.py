import os
import shlex
from pathlib import Path

from dotenv import load_dotenv
from inspect_ai import Task, task
from inspect_ai.dataset import Sample
from inspect_ai.scorer import Score, Target, accuracy, scorer
from inspect_ai.solver import TaskState
from inspect_ai.util import sandbox

from agents import get_agent
from utils import DESKTOP_BASE, SCREEN_RESOLUTION_ERROR

load_dotenv()

HOME_DIR = str(os.environ.get("HOME_DIR", ""))
if not HOME_DIR:
    raise ValueError("Environment variable HOME_DIR must be set.")

###############################################################################
# Scorer
###############################################################################


@scorer(metrics=[accuracy()])
def score_task():
    async def score(state: TaskState, target: Target):
        # Send command to the sandbox
        filepath = (Path(HOME_DIR) / "hello.txt").as_posix()
        cmd = f"cat {filepath}"
        result = await sandbox().exec(shlex.split(cmd))

        # No file or error
        if result.returncode != 0:
            return Score(value=0.0)

        # File is correct
        if "Hello World!" in result.stdout.strip():
            return Score(value=1.0)

        # File exists but is incorrect
        return Score(value=0.5)

    return score


###############################################################################
# Task
###############################################################################

INSTRUCTION = f"""
"Write `Hello World!` to the file `{HOME_DIR}/hello.txt`"
""".strip()

SETUP = str(Path(__file__).resolve().parent / "setup.sh")


@task
def hello_world(
    agent: str | None = "simple",
    system_prompt: str | None = None,
    width: int | None = None,
    height: int | None = None,
    claude_thinking: bool = False,
) -> Task:
    # Reason for type: ignore, pyright complains about unnecessary int check but
    # we want to raise the error here to provide an informative error message.
    if (
        width is None or height is None or not isinstance(width, int) or not isinstance(height, int)  # type: ignore
    ):
        raise ValueError(SCREEN_RESOLUTION_ERROR)

    metadata = {"WIDTH": width, "HEIGHT": height}
    return Task(
        dataset=[Sample(input=INSTRUCTION, setup=SETUP, metadata=metadata)],
        sandbox=("docker", DESKTOP_BASE),
        solver=get_agent(agent, system_prompt, width, height, claude_thinking),
        scorer=score_task(),
        max_messages=12,
    )
