#!/bin/bash

# Make the first request and save the response
response_json=$(curl -s -X GET 'http://localhost:3005/api/fromShapefile' \
                   -H 'Content-Type: application/json' \
                   --data '{"url": "https://github.com/mager/maps/raw/main/states/tl_2022_us_state.zip"}')

# Create the request body for the second request
request_body=$(jq --arg tolerance 0.01 '.geojson = $tolerance | {tolerance, geojson}' <<< "$response_json")

# Make the second request
curl -s -X POST 'http://localhost:3005/api/simplify' \
      -H 'Content-Type: application/json' \
      --data "$request_body"