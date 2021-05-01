#!/bin/bash

FLAGS="--headless"
CATEGORIES="accessibility,best-practices,performance"
OUTPUT=reports/"$(DATE).html"

npx lighthouse http://localhost:8080 --chrome-flags="$FLAGS" --only-categories="$CATEGORIES" --output-path="$OUTPUT"
