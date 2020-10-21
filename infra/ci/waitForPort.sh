#!/bin/bash

echo "Waiting for port $1..."

waiting=0;
while ! nc -z localhost $1; do
  sleep 1
  let waiting+=1;
  if [ $waiting -gt $2 ]; then
      echo "Port $1 not available"
      exit 1;
  fi
done

echo "Port $1 available"
