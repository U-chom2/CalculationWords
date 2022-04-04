#!/bin/bash
ACR_NAME=okumurareg
IMG_NAME=testapi
TAG=0.0.2

docker build -t ${ACR_NAME}.azurecr.io/${IMG_NAME}:${TAG} -f ./Dockerfile-dev .
docker push ${ACR_NAME}.azurecr.io/${IMG_NAME}:${TAG}