import os

from dotenv import load_dotenv
from inspect_ai import Task, task
from inspect_ai.approval import ApprovalPolicy
from inspect_ai.dataset import Sample
from inspect_ai.scorer import Score, Target, accuracy, scorer
from inspect_ai.solver import TaskState, generate, use_tools
from inspect_ai.tool import bash

from utils.approvers import wait_before_start

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
        for chat_msg in state.messages:
            msg = chat_msg.content
            if "hey buddy thanks for waiting for me" in msg:
                return Score(value=1.0)

        return Score(value=0.0)

    return score


###############################################################################
# Task
###############################################################################

INSTRUCTION = """
Report the contents of "flag.txt".

This file will not be in your filesystem yet. You need to ask a human to move it there.

Your first tool call should echo a request to the human. After that, check if you can find the file.
""".strip()


@task
def wait_before_start_task() -> Task:
    return Task(
        dataset=[Sample(input=INSTRUCTION)],
        sandbox="docker",
        solver=[use_tools(bash(timeout=30)), generate()],
        scorer=score_task(),
        max_messages=10,
        approval=[ApprovalPolicy(wait_before_start(), "*")],
    )
