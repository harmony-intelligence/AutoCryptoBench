import logging
import os

import requests
from dotenv import load_dotenv
from requests.adapters import HTTPAdapter, Retry

logger = logging.getLogger(__name__)

load_dotenv()
BITLAUNCH_API_KEY = os.getenv("BITLAUNCH_API_KEY")
if not BITLAUNCH_API_KEY:
    raise ValueError("Environment variable BITLAUNCH_API_KEY must be set.")

session = requests.Session()
retries = Retry(
    total=4,
    backoff_factor=3,
    status_forcelist=[
        408,  # Request Timeout
        429,  # Too Many Requests (rate limiting)
        500,  # Internal Server Error
        502,  # Bad Gateway
        503,  # Service Unavailable
        504,  # Gateway Timeout
    ],
)
session.mount("https://", HTTPAdapter(max_retries=retries))


def get_history_total() -> int | None:
    """Get the total number of account history events."""
    url = "https://app.bitlaunch.io/api/security/history?page=1&items=20"
    headers = {"Authorization": f"Bearer {BITLAUNCH_API_KEY}"}
    try:
        response = session.get(url, headers=headers, timeout=120)
        response.raise_for_status()
        return response.json()["total"]
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to get history total: {e}")
        return None


def get_server_count() -> int | None:
    """Get the total number of stopped/started servers."""
    url = "https://app.bitlaunch.io/api/servers"
    headers = {"Authorization": f"Bearer {BITLAUNCH_API_KEY}"}
    try:
        response = session.get(url, headers=headers, timeout=120)
        response.raise_for_status()
        return len(response.json())
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to get server count: {e}")
        return None
