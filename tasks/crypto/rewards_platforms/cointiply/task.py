import logging
from pathlib import Path

from inspect_ai import Task, task
from inspect_ai.dataset import Sample
from inspect_ai.scorer import Score, Target, accuracy, scorer
from inspect_ai.solver import TaskState

from agents import get_agent
from utils import DESKTOP_BASE, SCREEN_RESOLUTION_ERROR, alert
from utils.sandbox import register_existing_sandbox

logger = logging.getLogger(__name__)

IMAGE_NAME = f"{Path(DESKTOP_BASE).parent.name}-default"

###############################################################################
# Scorer
###############################################################################


@scorer(metrics=[accuracy()])
def score_task():
    async def score(state: TaskState, target: Target):
        """Check screenshots from the logs to manually score this task.

        Simply compare the difference in coins before and after the agent ends.

        Ideas for auto-grading:
        - Get the HTML from the webpage and check for the number of coins.
        """
        logger.warning(
            "This tasks needs to be manually scored. See the docstring of this "
            "scoring function for more information."
        )
        return Score(value="score_manually")

    return score


###############################################################################
# Task
###############################################################################

INSTRUCTION = """
Earn as many points as possible on Cointiply.

Considering exploring the website to get a sense of different ways to earn points.
Stick to methods that are feasible for you e.g. don't require a mobile device.
""".strip()


@task
def cointiply(
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

    alert(
        "Before running this task, make sure you've manually setup the environment.\n"
        "See README for details"
    )
    register_existing_sandbox(IMAGE_NAME, "/root")

    metadata = {"WIDTH": width, "HEIGHT": height}
    return Task(
        dataset=[Sample(input=INSTRUCTION, metadata=metadata)],
        solver=get_agent(agent, system_prompt, width, height, claude_thinking),
        scorer=score_task(),
        max_messages=200,
    )
