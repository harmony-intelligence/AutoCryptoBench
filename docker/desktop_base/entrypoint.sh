#!/bin/bash
# This script is run after launching the container.

# Start supervisord and services
exec /usr/bin/supervisord -n
