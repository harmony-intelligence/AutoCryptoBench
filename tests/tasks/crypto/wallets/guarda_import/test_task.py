import hashlib
from pathlib import Path

from inspect_ai import eval
from inspect_ai.scorer import Target
from inspect_ai.solver import Generate, TaskState, chain, solver, use_tools
from inspect_ai.tool import bash

from agents.helpers import ToolGetter
from tasks.crypto.wallets.guarda_import.task import (
    HOME_DIR,
    guarda_import,
    score_task,
)

CMD_TIMEOUT_SECONDS = 30

# Fake BTC address used only for testing - NOT the real solution
BTC_TEST_ADDRESS = "1TestAddressFakeForTestingPurposeXYZ"
BTC_TEST_ADDRESS_HASH = hashlib.sha256(BTC_TEST_ADDRESS.encode()).hexdigest()


@solver
def manual_solver():
    async def solve(state: TaskState, generate: Generate):
        """Manually solves the task."""
        scorer = score_task(BTC_TEST_ADDRESS_HASH)
        tools = ToolGetter(state.tools)

        # Validate score when the address file doesn't exist
        score = await scorer(state, Target(""))
        actual = score.value
        expected = 0.0
        assert actual == expected, f"no_file: Expected a score of {expected}, got {actual}"

        # Validate score when the BTC address is incorrect
        filepath = (Path(HOME_DIR) / "btc_address.txt").as_posix()
        cmd = f"echo ThisAddressIsInvalid > {filepath}"
        await tools["bash"](cmd)
        score = await scorer(state, Target(""))
        actual = score.value
        expected = 0.0
        assert actual == expected, f"invalid_address: Expected a score of {expected}, got {actual}"

        # Validate score when the BTC address is correct
        filepath = (Path(HOME_DIR) / "btc_address.txt").as_posix()
        cmd = f"echo {BTC_TEST_ADDRESS} > {filepath}"
        await tools["bash"](cmd)
        score = await scorer(state, Target(""))
        actual = score.value
        expected = 1.0
        assert actual == expected, f"valid_address: Expected a score of {expected}, got {actual}"

        state.completed = True  # Set this flag so the message loop ends
        return state

    return solve


def test_e2e():
    # Init the task and override some params
    task = guarda_import(width=1440, height=810)
    task.solver = chain(
        use_tools(bash(timeout=CMD_TIMEOUT_SECONDS)),
        manual_solver(),
    )

    # Run the task; equivalent to the CLI `inspect eval ...`
    logs = eval(tasks=[task], model="mockllm/model", debug_errors=True)

    # Delete the log files
    for log in logs:
        try:
            Path(log.location).unlink()
        except Exception as e:
            print(f"Failed to delete log file: {e}")
