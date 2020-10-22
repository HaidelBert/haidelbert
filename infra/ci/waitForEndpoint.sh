#!/bin/bash

echo "Testing $1"
timeout -s TERM 30 bash -c \
'while [[ "$(curl -s -o /dev/null -L -w ''%{http_code}'' ${0})" != "200" ]];\
do echo "Waiting for ${0}" && sleep 2;\
done' ${1}
echo "${1} OK!"
