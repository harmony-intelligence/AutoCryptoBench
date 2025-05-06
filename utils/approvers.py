from inspect_ai.approval import Approval, ApprovalDecision, Approver, approver
from inspect_ai.approval._human.console import console_approval  # type: ignore (missing stubs)
from inspect_ai.approval._human.panel import panel_approval  # type: ignore (missing stubs)
from inspect_ai.solver import TaskState
from inspect_ai.tool import ToolCall, ToolCallView


@approver(name="wait_before_start")
def wait_before_start() -> Approver:
    """Wait for human approval before starting the task.

    Mechanistically, the first tool call will require human approval. Once the
    first approval has been given, the task will continue without human approval.

    Usage example:
    ```python
    from inspect_ai.approval import ApprovalPolicy
    from utils.approvers import wait_before_start
    # ... other imports

    task = Task(
        dataset=...,
        solver=...,
        scorer=...,
        approval=[ApprovalPolicy(wait_before_start(), "*")],
    )
    ```
    """

    async def approve(
        message: str,
        call: ToolCall,
        view: ToolCallView,
        state: TaskState | None = None,
    ) -> Approval:
        # If the first approval hasn't happened, wait for human approval
        if state is not None and "first_approval_done" not in state.metadata:
            state.metadata["first_approval_done"] = True
            choices: list[ApprovalDecision] = ["approve", "reject", "terminate"]

            try:
                return await panel_approval(message, call, view, state, choices)
            except NotImplementedError:
                return console_approval(message, view, choices)

        # Continue the run otherwise
        return Approval(decision="approve", explanation="Automatic decision.")

    return approve
