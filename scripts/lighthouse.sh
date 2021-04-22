#!/bin/bash

npx lighthouse http://localhost:8080 --chrome-flags="--headless" --only-categories=accessibility,best-practices,performance
