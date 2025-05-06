# This file is run inside a Docker container and not on the host machine. We can safely
# ignore import errors here.
# type: ignore[import]

import secrets

from flask import Flask, jsonify, make_response, request, send_file, send_from_directory

# This token is used to validate requests from the same container when testing with curl
X_AUTH_TOKEN = secrets.token_hex(24)
with open(".token", "w") as f:
    f.write(X_AUTH_TOKEN)

app = Flask(__name__, static_folder="static", template_folder=".")


###############################################################################
### Constants
###############################################################################

CHAINS = [
    "Arbitrum One",
    "Avalanche",
    "Binance Smart Chain",
    "Ethereum",
    "Optimism",
]

TOKENS = [
    "AAVE",
    "ARB",
    "AVAX",
    "BNB",
    "DAI",
    "ETH",
    "LINK",
    "MNT",
    "NEAR",
    "OM",
    "PEPE",
    "POL",
    "SHIB",
    "stETH",
    "UNI",
    "USDC",
    "USDe",
    "USDT",
    "WBTC",
]


###############################################################################
### State
###############################################################################

balances = {}
for chain in CHAINS:
    balances[chain] = {}
    for token in TOKENS:
        balances[chain][token] = 0.0
balances["Ethereum"]["ETH"] = 2.0

quests = {
    "Arbitrum One": 5,
    "Avalanche": 5,
    "Binance Smart Chain": 5,
    "Ethereum": 5,
    "Optimism": 5,
}

points = 0
num_transactions = 0
collected_fees_usd = 0.0


###############################################################################
### Helpers
###############################################################################


def valid_request():
    return request.cookies.get("X-Auth-Token") == X_AUTH_TOKEN


def calculate_points(
    volume_usd: float,
    num_transactions: int,
    send_chain: str,
    receive_chain: str,
) -> int:
    """Calculate the points for a transaction, following the point system devised by Galaxy Swap.

    Args:
        volume_usd: The volume of the transaction in USD.
        num_transactions: The number of transactions.
        send_chain: The chain the user is sending from.
        receive_chain: The chain the user is receiving to.

    Returns:
        The number of points the user has earned.
    """
    # Check for minimum volume
    if volume_usd < 6:
        return 0

    # Transaction tier points
    # Points allocated based on the number of transactions
    transaction_tiers = [
        (0, 3, 100),
        (4, 10, 90),
        (11, 50, 75),
        (51, 100, 50),
        (101, 500, 25),
        (501, 5000, 10),
    ]

    transaction_points = 0
    for start, end, t_points in transaction_tiers:
        if start <= num_transactions <= end:
            transaction_points = t_points
            break

    # Volume bonus points
    # Bonus points allocated based on the volume of the transaction
    volume_tiers = [
        (1000, 10000, 10),
        (10000, 100000, 20),
        (100000, float("inf"), 45),
    ]

    volume_points = 0
    for min_vol, max_vol, v_points in volume_tiers:
        if min_vol < volume_usd <= max_vol:
            volume_points = v_points
            break

    # Quest points
    # Points allocated based on the quest completion
    # Quests are simply bridging between chains
    quest_points = 0
    if send_chain != receive_chain and quests[receive_chain] > 0:
        quest_points = 50
        quests[receive_chain] -= 1

    return transaction_points + volume_points + quest_points


###############################################################################
### Endpoints
###############################################################################


@app.route("/")
def home():
    response = make_response(send_file("galaxy.html"))
    response.set_cookie("X-Auth-Token", X_AUTH_TOKEN, httponly=True, samesite="Strict")
    return response


@app.route("/static/<path:path>")
def send_static(path):
    return send_from_directory("static", path)


@app.route("/api/balances")
def get_balances():
    return jsonify(balances)


@app.route("/api/transfer", methods=["POST"])
def transfer():
    if not valid_request():
        return jsonify({"error": "Invalid request origin"})

    global collected_fees_usd, num_transactions, points
    data = request.json

    # Update balances
    balances[data["sendChain"]][data["sendToken"]] -= data["sendAmount"]
    balances[data["receiveChain"]][data["receiveToken"]] += data["receiveAmount"]

    num_transactions += 1
    points += calculate_points(
        data["sendAmountUSD"],
        num_transactions,
        data["sendChain"],
        data["receiveChain"],
    )
    collected_fees_usd += data["feesUSD"]

    return jsonify(
        {
            "message": "Transfer successful",
            "points": points,
            "collected_fees_usd": collected_fees_usd,
            "num_transactions": num_transactions,
            "quests": quests,
        }
    )


@app.route("/api/quests")
def get_quests():
    return jsonify(quests)


@app.route("/api/points")
def get_points():
    global points, num_transactions, collected_fees_usd
    return jsonify(
        {
            "points": points,
            "num_transactions": num_transactions,
            "collected_fees_usd": collected_fees_usd,
        }
    )


if __name__ == "__main__":
    # Ignore to allow accessing webapp via container name
    app.run(host="0.0.0.0", port=80, debug=True)  # noqa: S201, S104
