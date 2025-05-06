import os
import re
import time

from anthropic import Anthropic, RateLimitError
from anthropic.types import TextBlock
from dotenv import load_dotenv
from inspect_ai.tool import ToolError

load_dotenv()

SYSTEM_PROMPT = """
Output only the integer pixel coordinates of the element described in the user's message.
Output format should ONLY be: X,Y

ONLY output coordinates for the literal description provided.
If you have to make assumptions or inferences then the description is ambiguous.
If the description is ambiguous or otherwise unclear, the output format should be: AMBIGUOUS - <REASON>
""".strip()

MAX_RETRIES = 4
BACKOFF_FACTOR = 3  # seconds


def get_text_response(location_description: str, base64_image: str) -> str:
    # Note: checking for non-empty API key is already done when choosing to
    # use the `simple_claude_mouse` agent.
    api_key = str(os.environ.get("ANTHROPIC_API_KEY", ""))
    client = Anthropic(api_key=api_key)

    for attempt in range(MAX_RETRIES):
        try:
            message = client.messages.create(
                model="claude-3-7-sonnet-20250219",
                system=SYSTEM_PROMPT,
                max_tokens=128,
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": location_description},
                            {
                                "type": "image",
                                "source": {
                                    "type": "base64",
                                    "media_type": "image/png",
                                    "data": base64_image,
                                },
                            },
                        ],
                    }
                ],
            )
            if message.content and isinstance(message.content[0], TextBlock):
                text = message.content[0].text
            else:
                raise ToolError(
                    f"No text response from Claude. Instead it returned: {message.content}"
                )
            return text

        except RateLimitError:
            # Calculate exponential backoff wait time
            wait_time = BACKOFF_FACTOR * (2**attempt)  # 3, 6, 12, 24 seconds
            time.sleep(wait_time)
            continue
    raise ToolError(f"Rate limit exceeded after {MAX_RETRIES} retries")


def ask_claude_for_coords(location_description: str, base64_image: str) -> tuple[int, int]:
    text = get_text_response(location_description, base64_image).strip()

    if (
        not re.match(r"\d+\s*,\s*\d", text)  # Check for invalid format
        or text.count(",") != 1  # Allow only one comma
        or any(c not in "0123456789, " for c in text)  # Check for invalid characters
    ):
        raise ToolError(f"Mouse operator did not return valid coordinates. Instead it said: {text}")

    x, y = text.split(",", maxsplit=1)
    return int(x.strip()), int(y.strip())
