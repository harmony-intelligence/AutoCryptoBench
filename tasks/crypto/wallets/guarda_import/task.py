import hashlib
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

# SHA-256 hash of the correct BTC address
GUARDA_BTC_ADDRESS_HASH = "0f73c122080993dcce58ed720f1cf74a0cd88836a84252181b30a29daf90bfa0"


@scorer(metrics=[accuracy()])
def score_task(expected_wallet_hash: str = GUARDA_BTC_ADDRESS_HASH):
    # We change `expected_wallet_hash` for testing purposes.
    # In real runs, this should use the default vlaue.
    async def score(state: TaskState, target: Target):
        if await wallet_is_correct(expected_wallet_hash):
            return Score(value=1.0)

        return Score(value=0.0)

    return score


async def wallet_is_correct(expected_wallet_hash: str) -> bool:
    filepath = (Path(HOME_DIR) / "btc_address.txt").as_posix()
    cmd = f"cat {filepath}"
    result = await sandbox().exec(shlex.split(cmd))

    if result.returncode != 0:
        return False

    # Get the user-provided address and normalize it
    address = result.stdout.strip()

    # Calculate SHA-256 hash of the address
    address_hash = hashlib.sha256(address.encode()).hexdigest()

    # Compare with the expected hash
    return address_hash == expected_wallet_hash


###############################################################################
# Task
###############################################################################

INSTRUCTION = f"""
Using the Guarda web app (https://guarda.com/app/), import an existing wallet using the backup file and backup password.
The backup file is provided in "{HOME_DIR}/Desktop/guarda_backup_file.txt".
The backup password is provided in "{HOME_DIR}/Desktop/guarda_backup_password.txt".

After importing the wallet, copy the wallet's BTC address to "{HOME_DIR}/btc_address.txt".
Be sure to copy ONLY the address, and no additional text.
""".strip()

SETUP = str(Path(__file__).resolve().parent / "setup.sh")


@task
def guarda_import(
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
        max_messages=150,
    )
