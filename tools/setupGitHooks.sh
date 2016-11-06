#!/bin/sh

# Sets up git hooks to prevent bad checkins from being uploaded to the origin
echo "Symlinking hooks..."
# Find root of git project
BASEDIR=$(git rev-parse --show-toplevel)
# Symbolic link to git hook
ln -s "${BASEDIR}/tools/pre-push" "${BASEDIR}/.git/hooks"
echo "Complete"
