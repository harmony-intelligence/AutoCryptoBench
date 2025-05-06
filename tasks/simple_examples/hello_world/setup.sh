#!/bin/bash

xfce4-terminal &
sleep 2
xdotool type "echo This is a terminal!"
xdotool key Return
