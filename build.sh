#!/bin/zsh

docker buildx build --platform linux/amd64,linux/arm64 -f /Users/gildas/Projects/Djondo/Agora/src/vision-server/DockerFile -t gawesso/agora:1.0.0 . --push
