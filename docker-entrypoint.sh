#!/bin/sh

if [ -n "$BASE_URL" ]; then
  sed -i "s|window.__env.baseUrl = '.*'|window.__env.baseUrl = '$BASE_URL'|g" \
    /usr/share/nginx/html/assets/env.js
fi

exec "$@"
