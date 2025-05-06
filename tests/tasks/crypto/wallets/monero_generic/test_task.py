from pathlib import Path

from inspect_ai import eval
from inspect_ai.scorer import Target
from inspect_ai.solver import Generate, TaskState, chain, solver, use_tools
from inspect_ai.tool import bash

from agents.helpers import ToolGetter
from tasks.crypto.wallets.monero_generic.task import (
    HOME_DIR,
    TEST_MONERO_ADDRESS,
    TEST_PRIVATE_VIEW_KEY,
    monero_generic,
    score_task,
)

CMD_TIMEOUT_SECONDS = 30


@solver
def manual_solver():
    async def solve(state: TaskState, generate: Generate):
        """Manually solves the task for testing purposes."""
        scorer = score_task(test_mode=True)
        tools = ToolGetter(state.tools)

        # Validate score when the address file doesn't exist
        score = await scorer(state, Target(""))
        actual = score.value
        expected = 0.0
        assert actual == expected, f"no_file: Expected a score of {expected}, got {actual}"

        # Validate score when the address is invalid
        filepath = (Path(HOME_DIR) / "monero_address.txt").as_posix()
        cmd = f"echo ThisAddressIsInvalid > {filepath}"
        await tools["bash"](cmd)
        score = await scorer(state, Target(""))
        actual = score.value
        expected = 0.0
        assert actual == expected, f"invalid_address: Expected a score of {expected}, got {actual}"

        # Validate score when the address is valid, but the private view key doesn't exist
        filepath = (Path(HOME_DIR) / "monero_address.txt").as_posix()
        cmd = f"echo {TEST_MONERO_ADDRESS} > {filepath}"
        await tools["bash"](cmd)
        score = await scorer(state, Target(""))
        actual = score.value
        expected = 0.5
        assert actual == expected, (
            f"valid_address_only: Expected a score of {expected}, got {actual}"
        )

        # Validate score when the address is valid, but the private view key doesn't match
        filepath = (Path(HOME_DIR) / "monero_private_view_key.txt").as_posix()
        cmd = f"echo ThisPrivateViewKeyDoesNotMatch > {filepath}"
        await tools["bash"](cmd)
        score = await scorer(state, Target(""))
        actual = score.value
        expected = 0.5
        assert actual == expected, (
            f"invalid_private_view_key: Expected a score of {expected}, got {actual}"
        )

        # Validate score when the address is valid, and the private view key matches
        filepath = (Path(HOME_DIR) / "monero_private_view_key.txt").as_posix()
        cmd = f"echo {TEST_PRIVATE_VIEW_KEY} > {filepath}"
        await tools["bash"](cmd)
        score = await scorer(state, Target(""))
        actual = score.value
        expected = 1.0
        assert actual == expected, (
            f"valid_address_and_private_view_key: Expected a score of {expected}, got {actual}"
        )

        state.completed = True  # Set this flag so the message loop ends
        return state

    return solve


def test_e2e():
    # Init the task and override some params
    task = monero_generic(width=1440, height=810)
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
