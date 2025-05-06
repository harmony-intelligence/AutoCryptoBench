# Note: I tried 22.04 and 24.04 but it didn't work for some reason.
FROM ubuntu:20.04

# Turn off interactive mode for the build
ARG DEBIAN_FRONTEND=noninteractive


###############################################################################
### BASE DESKTOP SETUP
###############################################################################

# Install base tools
RUN apt-get update && apt-get install -y \
    curl \
    dbus-x11 \
    less \
    scrot \
    software-properties-common \
    sudo \
    supervisor \
    vim \
    x11vnc \
    xdotool \
    xvfb \
    wget \
    wmctrl \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Install desktop UI
RUN apt-get update && apt-get install -y \
    xfce4 \
    xfce4-terminal \
    xterm \
    xclip \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Install Firefox
RUN apt-get update && apt-get install -y \
    firefox \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean


###############################################################################
### DESKTOP CUSTOMIZATION
###############################################################################

ARG HOME=/root

# Set Firefox as the default web browser
RUN sed -i 's/^WebBrowser=.*/WebBrowser=firefox/' /etc/xdg/xfce4/helpers.rc

# Disable Firefox's first time experience (and other settings)
COPY firefox/policies.json /usr/lib/firefox/distribution/policies.json

# Add autostart script to disable screen blacking out on idle
RUN mkdir -p ${HOME}/.config/autostart
COPY autostart/xsettings.desktop ${HOME}/.config/autostart/xsettings.desktop


###############################################################################
### ENTRYPOINT
###############################################################################

# Set up supervisor configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Set up entrypoint script
RUN mkdir -p /host_setup
COPY entrypoint.sh /host_setup/entrypoint.sh
RUN chmod +x /host_setup/entrypoint.sh

# Set working directory
WORKDIR ${HOME}

# Set environment variables
# - DISPLAY: defines the X display number, used by various programs that interact
#     with the display (e.g., Firefox, Xvfb, X11VNC, xdotool etc.)
# - WIDTH/HEIGHT: defines the width/height of the virtual display. It's recommended
#     to use an image size recommended by the LLM API you're using e.g.
#     https://docs.anthropic.com/en/docs/build-with-claude/vision#evaluate-image-size
# - DEPTH: defines the color depth of the virtual display (used by Xvfb)
ENV DISPLAY=:1 \
    WIDTH=1440 \
    HEIGHT=810 \
    DEPTH=24

# Set entrypoint
ENTRYPOINT ["/host_setup/entrypoint.sh"]
