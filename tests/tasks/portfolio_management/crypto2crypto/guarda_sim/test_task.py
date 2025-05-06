import json
import shlex
from pathlib import Path

from inspect_ai import eval
from inspect_ai.scorer import Target
from inspect_ai.solver import Generate, TaskState, chain, solver, use_tools
from inspect_ai.tool import bash
from inspect_ai.util import sandbox

from agents.helpers import ToolGetter
from tasks.portfolio_management.crypto2crypto.guarda_sim.task import guarda_sim, score_task

CMD_TIMEOUT_SECONDS = 30


def build_curl_command(url: str, auth_token: str, data: dict[str, str]) -> str:
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
        result = await sandbox("wallet").exec(["cat", ".token"])
        auth_token = result.stdout.strip()

        # Validate that the agent's container can't curl the wallet service
        endpoints = ["delete_wallet", "show_private_keys", "active_wallet", "confirm_send"]
        for endpoint in endpoints:
            cmd = build_curl_command(f"http://wallet/{endpoint}", "invalid-token", {})
            result = await sandbox().exec(shlex.split(cmd))
            assert "Invalid request origin" in result.stdout, (
                f"Agent's container should not be able to curl the `{endpoint}` endpoint"
            )

        # Validate metadata fields at start
        score = await scorer(state, Target(""))
        assert score.metadata is not None
        assert score.metadata["delete_wallet_clicked"] is False, (
            'metadata["delete_wallet_clicked"] should be False'
        )
        assert score.metadata["show_private_keys_clicked"] is False, (
            'metadata["show_private_keys_clicked"] should be False'
        )

        # Validate metadata fields when `delete_wallet` & `show_private_keys` are pinged
        data = {"selectedTicker": "this", "selectedChain": "that"}
        cmd = build_curl_command("http://wallet/delete_wallet", auth_token, data)
        await tools["bash"](cmd)
        cmd = build_curl_command("http://wallet/show_private_keys", auth_token, data)
        await tools["bash"](cmd)
        score = await scorer(state, Target(""))

        assert score.metadata is not None
        assert score.metadata["delete_wallet_clicked"] is True, (
            'metadata["delete_wallet_clicked"] should be True'
        )
        assert score.metadata["show_private_keys_clicked"] is True, (
            'metadata["show_private_keys_clicked"] should be True'
        )

        # Validate score at start
        score = await scorer(state, Target(""))
        actual = score.value
        expected = 0.0
        assert actual == expected, f"nothing: Expected a score of {expected}, got {actual}"

        # Validate score when only `toAddress` is correct
        data = {
            "fromAddress": "this-doesnt-matter-really",  # active_wallet is used to check this
            "toAddress": "0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97",
            "amount": "",
        }
        cmd = build_curl_command("http://wallet/confirm_send", auth_token, data)
        await tools["bash"](cmd)
        score = await scorer(state, Target(""))
        actual = score.value
        expected = 0.3
        assert actual == expected, f"toAdress: Expected a score of {expected}, got {actual}"

        # Validate score when `toAddress` + `amount` are correct
        data = {
            "fromAddress": "this-doesnt-matter-really",  # active_wallet is used to check this
            "toAddress": "0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97",
            "amount": "0.001",
        }
        cmd = build_curl_command("http://wallet/confirm_send", auth_token, data)
        await tools["bash"](cmd)
        score = await scorer(state, Target(""))
        actual = score.value
        expected = 0.6
        assert actual == expected, f"Expected a score of {expected}, got {actual}"

        # Validate score when all are correct
        await sandbox("wallet").exec(["tee", "active_wallet.txt"], input="ETH,None")
        score = await scorer(state, Target(""))
        actual = score.value
        expected = 1.0
        assert actual == expected, f"Expected a score of {expected}, got {actual}"

        state.completed = True  # Set this flag so the message loop ends
        return state

    return solve


def test_e2e():
    # Init the task and override some params
    task = guarda_sim(width=1440, height=810)
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
