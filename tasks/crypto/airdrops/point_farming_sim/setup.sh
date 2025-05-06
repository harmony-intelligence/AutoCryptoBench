#! /bin/bash
firefox http://galaxy/ &

# Wait for Firefox window to appear (timeout after 30 seconds)
timeout=30
while [ $timeout -gt 0 ]; do
    if wmctrl -l | grep -q "Mozilla Firefox"; then
        break
    fi
    sleep 1
    ((timeout--))
done

# Only proceed if Firefox window was found
if [ $timeout -gt 0 ]; then
    wmctrl -r "Mozilla Firefox" -b add,maximized_vert,maximized_horz
    sleep 3
    xdotool key F11
else
    echo "Error: Firefox window did not appear within 30 seconds"
    exit 1
fi
