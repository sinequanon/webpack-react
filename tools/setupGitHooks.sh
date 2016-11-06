#!/bin/sh

# Sets up git hooks to prevent bad checkins from being uploaded to the origin
echo "Symlinking hooks..."
BASEDIR=$(cd $(dirname "$1") && pwd -P)/$(basename "$1")
ln -s "${BASEDIR}pre-push" "${BASEDIR}.git/hooks"
echo "Complete"
