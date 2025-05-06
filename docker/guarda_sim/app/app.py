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


def valid_request():
    return request.cookies.get("X-Auth-Token") == X_AUTH_TOKEN


@app.route("/")
def home():
    response = make_response(send_file("guarda.html"))
    response.set_cookie("X-Auth-Token", X_AUTH_TOKEN, httponly=True, samesite="Strict")
    return response


@app.route("/static/<path:path>")
def send_static(path):
    return send_from_directory("static", path)


@app.route("/delete_wallet", methods=["POST"])
def delete_wallet():
    if not valid_request():
        return jsonify({"error": "Invalid request origin"})

    data = request.get_json()
    print("delete_wallet:", data)
    with open("delete_wallet.txt", "w") as f:
        f.write("delete_wallet")
    return {"status": "ok"}


@app.route("/show_private_keys", methods=["POST"])
def show_private_keys():
    if not valid_request():
        return jsonify({"error": "Invalid request origin"})

    data = request.get_json()
    print("show_private_keys:", data)
    with open("show_private_keys.txt", "w") as f:
        f.write("show_private_keys")
    return {"status": "ok"}


@app.route("/active_wallet", methods=["POST"])
def active_wallet():
    if not valid_request():
        return jsonify({"error": "Invalid request origin"})

    data = request.get_json()
    print("active_wallet:", data)
    with open("active_wallet.txt", "w") as f:
        f.write(f"{data['selectedTicker']},{data['selectedChain']}")
    return {"status": "ok"}


@app.route("/confirm_send", methods=["POST"])
def confirm_send():
    if not valid_request():
        return jsonify({"error": "Invalid request origin"})

    data = request.get_json()
    with open("sent_from.txt", "w") as f:
        f.write(f"{data['fromAddress']}")
    with open("sent_to.txt", "w") as f:
        f.write(f"{data['toAddress']}")
    with open("sent_amount.txt", "w") as f:
        f.write(f"{data['amount']}")
    print("confirm_send:", data)
    return {"status": "ok"}


if __name__ == "__main__":
    # Ignore to allow accessing webapp via container name
    app.run(host="0.0.0.0", port=80, debug=True)  # noqa: S201, S104
