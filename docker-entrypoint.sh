#!/bin/sh

# Generar env.js con las variables de entorno del contenedor.
# Si BASE_URL no está definida, se usa http://localhost:3000 como fallback.
cat <<EOF > /usr/share/nginx/html/assets/env.js
(function (window) {
  window.__env = window.__env || {};
  window.__env.baseUrl = '${BASE_URL:-http://localhost:3000}';
}(this));
EOF

exec "$@"
