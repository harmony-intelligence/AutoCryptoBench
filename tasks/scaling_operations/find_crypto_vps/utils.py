from pathlib import Path

filepath = Path(__file__).parent / "plausible_vps.txt"
with open(filepath) as f:
    PLAUSIBLE_VPS = set(f.read().splitlines())
