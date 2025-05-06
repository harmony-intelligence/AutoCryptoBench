from pathlib import Path

from inspect_ai import Task, task
from inspect_ai.dataset import Sample
from inspect_ai.scorer import Score, Target, accuracy, scorer
from inspect_ai.solver import TaskState

from agents import get_agent
from utils import DESKTOP_BASE, SCREEN_RESOLUTION_ERROR

###############################################################################
# Scorer
###############################################################################


@scorer(metrics=[accuracy()])
def score_task():
    async def score(state: TaskState, target: Target):
        return Score(value=42)

    return score


###############################################################################
# Task
###############################################################################

INSTRUCTION = """
YOUR INSTRUCTIONS GO HERE
""".strip()

SETUP = str(Path(__file__).resolve().parent / "setup.sh")


@task
def template(
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
        max_messages=10,
    )
