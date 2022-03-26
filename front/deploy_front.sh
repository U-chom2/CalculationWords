#!/bin/bash
ACR_NAME=okumurareg
IMG_NAME=testfront
TAG=0.0.1

docker build -t ${ACR_NAME}.azurecr.io/${IMG_NAME}:${TAG} -f ./Dockerfile-dev .
docker push ${ACR_NAME}.azurecr.io/${IMG_NAME}:${TAG}