import re
from pathlib import Path

filepath = Path(__file__).parent / "bitcoin-vps.txt"
with open(filepath) as f:
    page_content = f.read()

split_marker = "Virtual Private Network providers allow you to tunnel your Internet traffic to their servers using an encrypted link."
vps_content = page_content.split(split_marker)[0]
plausible_vps = set(re.findall(r"\s{4}\b([^-\n]+) - Locations:", vps_content))
plausible_vps = sorted([vps.strip() for vps in plausible_vps])

filepath = Path(__file__).parent / "plausible_vps.txt"
with open(filepath, "w") as f:
    f.write("\n".join(plausible_vps))

# Manually look at plausible_vps.txt and fix things like
# - "Javapipe (now Mochahost)" -> "Mochahost"
# - "BuyVM / Frantech" -> Split into two entries
