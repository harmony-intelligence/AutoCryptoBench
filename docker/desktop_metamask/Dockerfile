FROM desktop_base-default:latest

# Install selenium and it's dependencies
RUN apt-get update && apt-get install -y \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install selenium==4.9.1

# Set up architecture detection and install appropriate geckodriver
ARG TARGETARCH
RUN if [ "$TARGETARCH" = "amd64" ]; then \
        wget https://github.com/mozilla/geckodriver/releases/download/v0.35.0/geckodriver-v0.35.0-linux64.tar.gz \
        && tar -xvzf geckodriver-v0.35.0-linux64.tar.gz \
        && chmod +x geckodriver \
        && mv geckodriver /usr/local/bin/ \
        && rm geckodriver-v0.35.0-linux64.tar.gz; \
    elif [ "$TARGETARCH" = "arm64" ]; then \
        wget https://github.com/mozilla/geckodriver/releases/download/v0.35.0/geckodriver-v0.35.0-linux-aarch64.tar.gz \
        && tar -xvzf geckodriver-v0.35.0-linux-aarch64.tar.gz \
        && chmod +x geckodriver \
        && mv geckodriver /usr/local/bin/ \
        && rm geckodriver-v0.35.0-linux-aarch64.tar.gz; \
    else \
        echo "Unsupported architecture: $TARGETARCH" && exit 1; \
    fi

# Set policy to install MetaMask on first launch
COPY policies.json /usr/lib/firefox/distribution/policies.json

# Copy over the MetaMask wallet preloading script
COPY metamask_preloader.py /host_setup/metamask_preloader.py
