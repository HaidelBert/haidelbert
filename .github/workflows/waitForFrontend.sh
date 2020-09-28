#!/bin/bash

echo "Waiting frontend to launch on 4200..."

while ! nc -z localhost 4200; do
  sleep 0.1 # wait for 1/10 of the second before check again
done

echo "Frontend launched"
