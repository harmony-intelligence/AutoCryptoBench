FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive
ARG HOME=/root

# Install base tools
RUN apt-get update && apt-get install -y \
    curl \
    less \
    software-properties-common \
    sudo \
    vim \
    wget \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Set working directory
WORKDIR ${HOME}

# Keep the container up
CMD ["sleep", "infinity"]
