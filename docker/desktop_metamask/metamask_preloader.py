# This file is run inside a Docker container and not on the host machine. We can safely
# ignore import errors here.
# type: ignore[import]

# This script is used to preload the Metamask extension with a seed phrase and password.
# I've run this at least 10 times before PR#11 and it hasn't failed on me yet.
# Note: if this starts to break, try pinning the version of the Metamask extension in the Dockerfile.

# If sys.argv[1] == "op", it will switch to the Optimism network after importing the wallet.

import os
import sys
from time import sleep

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait

METAMASK_SEED_PHRASE = os.environ["METAMASK_SEED_PHRASE"]
METAMASK_PASSWORD = os.environ["METAMASK_PASSWORD"]

# Initialize the driver
firefox_options = Options()
driver = webdriver.Firefox(options=firefox_options)
driver.maximize_window()

# Create a WebDriverWait instance with a longer timeout for extension loading
wait = WebDriverWait(driver, 15)

# Wait for MetaMask tab, close the first tab, then switch to the MetaMask tab
wait.until(lambda d: len(driver.window_handles) > 1)
driver.switch_to.window(driver.window_handles[0])
driver.close()
driver.switch_to.window(driver.window_handles[-1])

# Click the onboarding terms checkbox
wait.until(
    lambda d: len(d.find_elements(By.CSS_SELECTOR, '[data-testid="onboarding-terms-checkbox"]')) > 0
)
checkbox = driver.find_element(By.CSS_SELECTOR, '[data-testid="onboarding-terms-checkbox"]')
checkbox.click()

# Click import button
wait.until(
    lambda d: len(d.find_elements(By.CSS_SELECTOR, '[data-testid="onboarding-terms-checkbox"]')) > 0
)
import_button = driver.find_element(By.CSS_SELECTOR, '[data-testid="onboarding-import-wallet"]')
import_button.click()

# Handle metrics opt-in
wait.until(lambda d: len(d.find_elements(By.ID, "metametrics-opt-in")) > 0)
checkbox = driver.find_element(By.ID, "metametrics-opt-in")
checkbox.click()

wait.until(lambda d: d.find_element(By.CSS_SELECTOR, '[data-testid="metametrics-i-agree"]'))
agree_button = driver.find_element(By.CSS_SELECTOR, '[data-testid="metametrics-i-agree"]')
agree_button.click()

# Enter seed phrase
for i, word in enumerate(METAMASK_SEED_PHRASE.split()):
    wait.until(
        lambda d, i=i: d.find_element(By.CSS_SELECTOR, f'[data-testid="import-srp__srp-word-{i}"]')
    )
    text_box = driver.find_element(By.CSS_SELECTOR, f'[data-testid="import-srp__srp-word-{i}"]')
    text_box.send_keys(word)

# Confirm seed phrase
wait.until(lambda d: d.find_element(By.CSS_SELECTOR, '[data-testid="import-srp-confirm"]'))
confirm_button = driver.find_element(By.CSS_SELECTOR, '[data-testid="import-srp-confirm"]')
confirm_button.click()

# Set up password
wait.until(lambda d: d.find_element(By.CSS_SELECTOR, '[data-testid="create-password-new"]'))
new_password = driver.find_element(By.CSS_SELECTOR, '[data-testid="create-password-new"]')
new_password.send_keys(METAMASK_PASSWORD)

wait.until(
    lambda d: d.find_element(
        By.CSS_SELECTOR, '[data-testid="create-password-confirm"][type="password"]'
    )
)
confirm_password = driver.find_element(
    By.CSS_SELECTOR, '[data-testid="create-password-confirm"][type="password"]'
)
confirm_password.send_keys(METAMASK_PASSWORD)

# Accept terms
wait.until(lambda d: d.find_element(By.CSS_SELECTOR, ".mm-checkbox__input"))
checkbox = driver.find_element(By.CSS_SELECTOR, ".mm-checkbox__input")
checkbox.click()

# Complete import process
wait.until(lambda d: d.find_element(By.CSS_SELECTOR, '[data-testid="create-password-import"]'))
import_button = driver.find_element(By.CSS_SELECTOR, '[data-testid="create-password-import"]')
import_button.click()

# Handle final steps
wait.until(lambda d: d.find_element(By.CSS_SELECTOR, '[data-testid="onboarding-complete-done"]'))
done_button = driver.find_element(By.CSS_SELECTOR, '[data-testid="onboarding-complete-done"]')
done_button.click()

wait.until(lambda d: d.find_element(By.CSS_SELECTOR, '[data-testid="pin-extension-next"]'))
next_button = driver.find_element(By.CSS_SELECTOR, '[data-testid="pin-extension-next"]')
next_button.click()

wait.until(lambda d: d.find_element(By.CSS_SELECTOR, '[data-testid="pin-extension-done"]'))
done_button = driver.find_element(By.CSS_SELECTOR, '[data-testid="pin-extension-done"]')
done_button.click()

# Wait until the spinner goes away
wait.until(lambda d: "spinner" not in d.page_source)
sleep(1)

if len(sys.argv) > 1 and sys.argv[1] == "op":
    # Switch to the Optimism network
    wait.until(lambda d: d.find_element(By.CSS_SELECTOR, '[data-testid="network-display"]'))
    network_selector = driver.find_element(By.CSS_SELECTOR, '[data-testid="network-display"]')
    network_selector.click()

    wait.until(
        lambda d: d.find_element(
            By.CSS_SELECTOR, '[data-testid="network-redesign-modal-search-input"]'
        )
    )
    search_bar = driver.find_element(
        By.CSS_SELECTOR, '[data-testid="network-redesign-modal-search-input"]'
    )
    search_bar.send_keys("op mainnet")
    sleep(1)
    add_buttom = driver.find_element(By.CSS_SELECTOR, '[data-testid="test-add-button"]')
    add_buttom.click()

    wait.until(
        lambda d: d.find_element(By.CSS_SELECTOR, '[data-testid="confirmation-submit-button"]')
    )
    confirm_button = driver.find_element(
        By.CSS_SELECTOR, '[data-testid="confirmation-submit-button"]'
    )
    confirm_button.click()
    sleep(5)
