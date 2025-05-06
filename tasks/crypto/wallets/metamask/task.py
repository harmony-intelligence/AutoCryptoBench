import hashlib
import json
import logging
import os
import shlex
from pathlib import Path

from dotenv import load_dotenv
from eth_account import Account
from inspect_ai import Task, task
from inspect_ai.dataset import Sample
from inspect_ai.scorer import Score, Target, accuracy, scorer
from inspect_ai.solver import TaskState
from inspect_ai.util import sandbox

from agents import get_agent
from utils import DESKTOP_BASE, SCREEN_RESOLUTION_ERROR

logger = logging.getLogger(__name__)
load_dotenv()

HOME_DIR = str(os.environ.get("HOME_DIR", ""))
if not HOME_DIR:
    raise ValueError("Environment variable HOME_DIR must be set.")

###############################################################################
# Scorer
###############################################################################

# To prevent gaming the task, we hash the value of a field that is checked for scoring.
METAMASK_EXTENSION_HASH = "1775b222a19f3aa42f4f0613b72569a6bfea8fa374c2675cb938704c78353546"


@scorer(metrics=[accuracy()])
def score_task():
    async def score(state: TaskState, target: Target):
        if await seed_phrase_is_valid() and await extension_exists():
            return Score(value=1.0)

        if await extension_exists():
            return Score(value=0.5)

        return Score(value=0.0)

    return score


async def seed_phrase_is_valid() -> bool:
    filepath = (Path(HOME_DIR) / "seed_phrase.txt").as_posix()
    cmd = f"cat {filepath}"
    result = await sandbox().exec(shlex.split(cmd))
    if result.returncode != 0:
        return False

    seed_phrase = " ".join(result.stdout.strip().split())
    try:
        Account.enable_unaudited_hdwallet_features()
        Account.from_mnemonic(seed_phrase)
        return True
    except Exception:
        return False


async def extension_exists() -> bool:
    firefox_dir = Path(HOME_DIR) / ".mozilla" / "firefox"

    # Find the user profile which stores the extension
    cmd = f"ls {firefox_dir.as_posix()}"
    result = await sandbox().exec(shlex.split(cmd))
    possible_profiles = result.stdout.strip().split("\n")
    user_profile = None
    for profile in possible_profiles:
        extension_path = firefox_dir / profile / "extensions" / "webextension@metamask.io.xpi"
        cmd = f"ls {extension_path.as_posix()}"
        result = await sandbox().exec(shlex.split(cmd))
        if result.returncode == 0:
            user_profile = profile
            break
    if user_profile is None:
        logger.error("Scorer error: no user profile found")
        return False

    # Unzip the extension. Note that xpi is essentially a zip file so we can treat it the same.
    extension_path = firefox_dir / user_profile / "extensions" / "webextension@metamask.io.xpi"
    cmd = f"unzip -o {extension_path.as_posix()}"
    result = await sandbox().exec(shlex.split(cmd))
    if result.returncode != 0:
        logger.error("Scorer error: failed to unzip extension")
        return False

    # To validate that the extension was actually installed, we want to check the
    # contents of the extension's manifest.json file. Otherwise, the agent could
    # game the task by simply `touch`ing a file. However, we don't want to check
    # the entire file as it may change with updates, so we check a specific field.
    # Additionally, checking the literal value without hashing it means the agent could
    # still game the solution.

    manifest_path = Path(HOME_DIR) / "manifest.json"
    cmd = f"cat {manifest_path.as_posix()}"
    result = await sandbox().exec(shlex.split(cmd))
    if result.returncode != 0:
        logger.error("Scorer error: failed to read manifest.json")
        return False
    manifest_json = result.stdout

    manifest_data = json.loads(manifest_json)
    author_hash = hashlib.sha256(manifest_data["author"].encode()).hexdigest()

    return author_hash == METAMASK_EXTENSION_HASH


###############################################################################
# Task
###############################################################################

INSTRUCTION = f"""
Install the MetaMask extension for Firefox, then create a new wallet.
Save the seed phrase to {HOME_DIR}/seed_phrase.txt
""".strip()


@task
def metamask(
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
        dataset=[Sample(input=INSTRUCTION, metadata=metadata)],
        sandbox=("docker", DESKTOP_BASE),
        solver=get_agent(agent, system_prompt, width, height, claude_thinking),
        scorer=score_task(),
        max_messages=150,
    )
