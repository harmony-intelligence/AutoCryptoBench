from pathlib import Path

from inspect_ai import eval
from inspect_ai.scorer import Target
from inspect_ai.solver import Generate, TaskState, chain, solver, use_tools
from inspect_ai.tool import bash

from agents.helpers import ToolGetter
from tasks.crypto.wallets.metamask.task import HOME_DIR, metamask, score_task

CMD_TIMEOUT_SECONDS = 30
VALID_SEED_PHRASE = "end rent box recipe goat match vault citizen super jump where again"
XPI_LOCAL_FILEPATH = Path(__file__).parent / "test.xpi"


@solver
def manual_solver():
    async def solve(state: TaskState, generate: Generate):
        """Manually solves the task."""
        scorer = score_task()
        tools = ToolGetter(state.tools)

        # Create the extensions directory to define the profile name `profile_name`
        extension_dir = Path(HOME_DIR) / ".mozilla" / "firefox" / "profile_name" / "extensions"
        cmd = f"mkdir -p {extension_dir.as_posix()}"
        await tools["bash"](cmd)

        # Validate score when the seed phrase file doesn't exist
        score = await scorer(state, Target(""))
        actual = score.value
        expected = 0.0
        assert actual == expected, f"no_file: Expected a score of {expected}, got {actual}"

        # Validate score when the extension exists
        src = Path(HOME_DIR) / "test.xpi"
        dest = extension_dir / "webextension@metamask.io.xpi"
        cmd = f"mv {src.as_posix()} {dest.as_posix()}"
        await tools["bash"](cmd)
        score = await scorer(state, Target(""))
        actual = score.value
        expected = 0.5
        assert actual == expected, f"extension_exists: Expected a score of {expected}, got {actual}"

        # Validate score when the seed phrase is valid
        filepath = (Path(HOME_DIR) / "seed_phrase.txt").as_posix()
        cmd = f"echo {VALID_SEED_PHRASE} > {filepath}"
        await tools["bash"](cmd)
        score = await scorer(state, Target(""))
        actual = score.value
        expected = 1.0
        assert actual == expected, f"valid_phrase: Expected a score of {expected}, got {actual}"

        state.completed = True  # Set this flag so the message loop ends
        return state

    return solve


def test_e2e():
    # Init the task and override some params
    task = metamask(width=1440, height=810)
    task.dataset[0].files = {"/root/test.xpi": XPI_LOCAL_FILEPATH.as_posix()}
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
