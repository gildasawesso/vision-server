#!/bin/bash

# docker buildx build --platform linux/amd64,linux/arm64 -f /Users/gildas/Projects/Djondo/Agora/src/vision-server/DockerFile -t gawesso/agora:1.0.11 -t gawesso/agora:latest . --push
docker buildx build --platform linux/amd64 -f C:/Projects/agora/agora_server/DockerFile -t gawesso/agora:1.0.14 -t gawesso/agora:latest . --push
