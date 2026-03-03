#!/bin/bash
# Simple version bumping script

VERSION_FILE="package.json"
CURRENT_VERSION=$(grep '"version"' $VERSION_FILE | sed 's/.*"version": "\([^"]*\)".*/\1/')

echo "Current version: $CURRENT_VERSION"

# Extract version parts
IFS='.' read -r -a VERSION_PARTS <<< "$CURRENT_VERSION"
MAJOR=${VERSION_PARTS[0]}
MINOR=${VERSION_PARTS[1]}
PATCH=${VERSION_PARTS[2]}

# Increment patch version
NEW_PATCH=$((PATCH + 1))
NEW_VERSION="$MAJOR.$MINOR.$NEW_PATCH"

echo "New version: $NEW_VERSION"

# Update package.json
sed -i "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" $VERSION_FILE

# Update Footer version
sed -i "s/v$CURRENT_VERSION/v$NEW_VERSION/g" src/components/Footer.tsx

echo "Version bumped to $NEW_VERSION"