#!/bin/bash

# Ignore changes in 'target' directory or other generated files
EXCLUDE_PATTERN=".*(target|\\.class|\\.log|\\.swp|#).*"

while true; do
    # Watch for changes in .java files
    FILE=$(inotifywait -r -e modify --format '%w%f' --exclude "$EXCLUDE_PATTERN" src/main/java 2>/dev/null)

    if [ -n "$FILE" ]; then
        # Extract the directory of the changed file
        DIR=$(dirname "$FILE")

        # Run Maven compile in the Docker container
        echo "Detected change in $FILE. Compiling in container..."
        docker compose exec -T back ./mvnw compile -Dcompile.source.path="$DIR"
    fi
done
