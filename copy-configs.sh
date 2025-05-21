#!/bin/bash

# Check if the target directory is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <target-directory>"
  exit 1
fi

TARGET_DIR="$1"

# Create the target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Copy database.sqlite if it exists
if [ -f database.sqlite ]; then
  cp database.sqlite "$TARGET_DIR"
fi

# Copy all .pem files if any exist
if ls *.pem 1> /dev/null 2>&1; then
  cp *.pem "$TARGET_DIR"
fi

# Copy all .env* files if any exist
if ls .env* 1> /dev/null 2>&1; then
  cp .env* "$TARGET_DIR"
fi

echo "Files copied to $TARGET_DIR" 