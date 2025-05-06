import os
import textwrap
import time
from pathlib import Path


def alert(message: str, width: int = 80, sleep: int = 5) -> None:
    print(f"╔{'═' * (width - 2)}╗")
    print()
    print(textwrap.fill(message, width=width))
    print()
    print(f"╚{'═' * (width - 2)}╝")
    time.sleep(sleep)


def get_repo_root(start_path: str = ".") -> Path:
    """Find the root directory of a git repository by traversing up from the given path.

    Args:
        start_path (str): Starting path to search from. Defaults to current directory.

    Returns:
        Path: Path object pointing to the repository root.
    """
    # Start from the given path or current directory
    current_path = Path(start_path or os.getcwd()).resolve()

    # Traverse up until we find .git directory or reach the root
    while current_path != current_path.parent:
        if (current_path / ".git").exists():
            return current_path
        current_path = current_path.parent

    # Check the root directory as well
    if (current_path / ".git").exists():
        return current_path

    raise FileNotFoundError("Could not find the root of the git repository.")


REPO_ROOT = get_repo_root()

# Docker env filepaths
DESKTOP_BASE = str(REPO_ROOT / "docker" / "desktop_base" / "docker-compose.yml")
DESKTOP_METAMASK = str(REPO_ROOT / "docker" / "desktop_metamask" / "docker-compose.yml")
GUARDA_SIM = str(REPO_ROOT / "docker" / "guarda_sim" / "docker-compose.yml")
POINT_FARMING_SIM = str(REPO_ROOT / "docker" / "point_farming_sim" / "docker-compose.yml")
TEXT_ONLY = str(REPO_ROOT / "docker" / "text_only" / "Dockerfile")

SCREEN_RESOLUTION_ERROR = """
Width and height must be provided and must be integers.

Example:
inspect eval tasks/simple_examples/hello_world/task.py --model=mockllm/model -T width=1536 -T height=768

Recommended screen resolutions:
- Anthropic models: 1440x810
- Gemini models: 1536x768
- GPT-4o models: 1536x768
""".strip()
