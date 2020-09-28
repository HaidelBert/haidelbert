#!/bin/bash

echo "Waiting for port $1..."

while ! nc -z localhost $1; do
  sleep 0.1 # wait for 1/10 of the second before check again
done

echo "Port $1 available"
