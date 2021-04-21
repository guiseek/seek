#!/bin/bash

npx lighthouse http://localhost:8080 --chrome-flags="--headless" --only-categories=accessibility,best-practices,performance --output=html --output-path=./dist/report.html --save-assets
