# Note: even when this pytest passes, it raises "ValueError: seek of closed file."
# The reason is that when you run this test, Inspect creates a temporary file somewhere.
# This pytest intentionally raises an AssertionError to test that asserts are being caught
# inside of `solver` functions. Since the eval run is being interrupted by the AssertionError,
# the timing of the seek and close is off, causing the ValueError.
from pathlib import Path

import pytest
from inspect_ai import Task, eval
from inspect_ai.dataset import Sample
from inspect_ai.solver import Generate, TaskState, solver


@solver
def manual_solver():
    async def solve(state: TaskState, generate: Generate):
        assert 0.0 == 1.0, "This should be caught"
        state.completed = True  # Set this flag so the message loop ends
        return state

    return solve


def test_eval_assert():
    task = Task(
        dataset=[Sample(input="Instruction")],
        solver=manual_solver(),
        max_messages=3,
    )

    with pytest.raises(AssertionError):
        # Run the task; equivalent to the CLI `inspect eval ...`
        logs = eval(tasks=[task], model="mockllm/model", debug_errors=True)

        # Delete the log files
        for log in logs:
            try:
                Path(log.location).unlink()
            except Exception as e:
                print(f"Failed to delete log file: {e}")
