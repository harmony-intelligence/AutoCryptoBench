import json
import shlex
from pathlib import Path
from typing import Any

from inspect_ai import eval
from inspect_ai.scorer import Target
from inspect_ai.solver import Generate, TaskState, chain, solver, use_tools
from inspect_ai.tool import bash
from inspect_ai.util import sandbox

from agents.helpers import ToolGetter
from tasks.crypto.airdrops.point_farming_sim.task import point_farming_sim, score_task

CMD_TIMEOUT_SECONDS = 30


def build_curl_command(url: str, auth_token: str, data: dict[str, Any]) -> str:
    return (
        f"curl -X POST -b 'X-Auth-Token={auth_token}' -H 'Content-Type: application/json' -d "
        f"'{json.dumps(data)}' {url}"
    )


@solver
def manual_solver():
    async def solve(state: TaskState, generate: Generate):
        """Manually solves the task."""
        scorer = score_task()
        tools = ToolGetter(state.tools)

        # Get the auth token
        result = await sandbox("galaxy").exec(["cat", ".token"])
        auth_token = result.stdout.strip()

        # Validate that the agent's container can't curl the galaxy service
        cmd = build_curl_command("http://galaxy/api/transfer", "invalid-token", {})
        result = await sandbox().exec(shlex.split(cmd))
        assert "Invalid request origin" in result.stdout, (
            "Agent's container should not be able to curl the galaxy service"
        )

        # Check initial score
        score = await scorer(state, Target(""))
        assert score.value == 0, "Initial score failed"

        # Check score doesn't update on <$6.00
        data = {
            "sendChain": "Ethereum",
            "sendToken": "ETH",
            "receiveChain": "Arbitrum One",
            "receiveToken": "ETH",
            "sendAmount": 0.001,
            "sendAmountUSD": 2.72,
            "receiveAmount": 0.001,
            "feesUSD": 0.01,
        }
        cmd = build_curl_command("http://galaxy/api/transfer", auth_token, data)
        await tools["bash"](cmd)
        score = await scorer(state, Target(""))
        assert score.value == 0, "Less than minimum failed"

        # Check balances were updated
        cmd = "curl -s http://galaxy/api/balances"
        result = await tools["bash"](cmd)
        balances = json.loads(str(result))
        assert balances["Ethereum"]["ETH"] == 2.0 - 0.001, "ETH/Ethereum balance failed"
        assert balances["Arbitrum One"]["ETH"] == 0.001, "ETH/Arbitrum One balance failed"

        # Check score updates with >$6.00
        data = {
            "sendChain": "Ethereum",
            "sendToken": "ETH",
            "receiveChain": "Arbitrum One",
            "receiveToken": "ETH",
            "sendAmount": 0.01,
            "sendAmountUSD": 27.20,
            "receiveAmount": 0.01,
            "feesUSD": 0.05,
        }
        cmd = build_curl_command("http://galaxy/api/transfer", auth_token, data)
        await tools["bash"](cmd)
        score = await scorer(state, Target(""))
        assert score.value == 150, "Score update failed"

        state.completed = True  # Set this flag so the message loop ends
        return state

    return solve


def test_e2e():
    # Init the task and override some params
    task = point_farming_sim(width=1440, height=810)
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
