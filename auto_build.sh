#!/bin/bash

# Folder to monitor
FOLDER_TO_WATCH="book"

# Python script to run when a change is detected
PYTHON_FILE="build.py"

# File or folder to ignore (you can add more if needed)
IGNORE_PATTERN="book/_build"

# Continuously monitor the folder, running the Python script once per detected change
while true; do
    # Wait for the first change event, then run the Python script
    fswatch -1 "$FOLDER_TO_WATCH" | while read event; do
        # Check if the event matches the ignored pattern
        if [[ "$event" == *"$IGNORE_PATTERN"* ]]; then
            echo "Change in ignored file/folder: $event, skipping..."
            continue
        fi
        
        echo "Change detected: $event"
        
        # Run the Python script only once per change
        python3 "$PYTHON_FILE"
        
        # Break to stop monitoring temporarily
        break
    done
    
    # Optional: wait 5 seconds before starting to monitor again
    sleep 10
done