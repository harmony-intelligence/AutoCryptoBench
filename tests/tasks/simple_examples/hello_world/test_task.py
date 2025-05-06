from pathlib import Path

from inspect_ai import eval
from inspect_ai.scorer import Target
from inspect_ai.solver import Generate, TaskState, chain, solver, use_tools
from inspect_ai.tool import bash

from agents.helpers import ToolGetter
from tasks.simple_examples.hello_world.task import hello_world, score_task

CMD_TIMEOUT_SECONDS = 30


@solver
def manual_solver():
    async def solve(state: TaskState, generate: Generate):
        """Manually solves the task."""
        scorer = score_task()
        tools = ToolGetter(state.tools)

        # Validate score when no file
        score = await scorer(state, Target(""))
        actual = score.value
        expected = 0.0
        assert actual == expected, f"no_file: Expected a score of {expected}, got {actual}"

        # Validate score when a file exists with incorrect contents
        cmd = "echo This is not the correct content > hello.txt"
        await tools["bash"](cmd)
        score = await scorer(state, Target(""))
        actual = score.value
        expected = 0.5
        assert actual == expected, f"incorrect_file: Expected a score of {expected}, got {actual}"

        # Validate score when a file exists with correct contents
        cmd = "echo Hello World! > hello.txt"
        await tools["bash"](cmd)
        score = await scorer(state, Target(""))
        actual = score.value
        expected = 1.0
        assert actual == expected, f"correct_file: Expected a score of {expected}, got {actual}"

        state.completed = True  # Set this flag so the message loop ends
        return state

    return solve


def test_e2e():
    # Init the task and override some params
    task = hello_world(width=1440, height=810)
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
