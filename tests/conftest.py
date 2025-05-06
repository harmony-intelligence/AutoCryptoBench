# This is to cover:
# `RuntimeError: Event loop is closed ... warnings.warn(pytest.PytestUnraisableExceptionWarning(msg))`
# This is an warning thrown in the cleanup phase of pytest after the tests finish running.
# My understanding is asyncio cleanup isn't handled properly. See: https://stackoverflow.com/a/71668965

import asyncio

import pytest


@pytest.fixture(scope="session")
def event_loop():
    try:
        loop = asyncio.get_running_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()

    yield loop

    pending = asyncio.all_tasks(loop)
    if pending:
        loop.run_until_complete(asyncio.gather(*pending))
    loop.run_until_complete(asyncio.sleep(1))

    loop.close()
