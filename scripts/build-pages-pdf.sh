#!/usr/bin/env bash
# GitHub Pages serves the historical PDF iframe, not the React site used on OCI.
set -euo pipefail

[[ -s "legacy-pdf/index.html" ]] || {
  echo "::error::Missing original PDF viewer at legacy-pdf/index.html"
  exit 1
}
[[ -s "portfolio.pdf" ]] || {
  echo "::error::Missing original portfolio.pdf"
  exit 1
}
[[ "$(head -c 5 portfolio.pdf)" == "%PDF-" ]] || {
  echo "::error::portfolio.pdf does not begin with the PDF signature"
  exit 1
}
grep -Fq 'iframe src="./portfolio.pdf"' legacy-pdf/index.html || {
  echo "::error::Legacy index.html must embed ./portfolio.pdf"
  exit 1
}
# The PDF viewer must not accidentally become the React/Vite entrypoint.
if grep -Eq 'src="/src/main.jsx"|<div id="root"' legacy-pdf/index.html; then
  echo "::error::GitHub Pages should publish the PDF iframe, not the React app"
  exit 1
fi

mkdir -p dist
cp legacy-pdf/index.html dist/index.html
cp portfolio.pdf dist/portfolio.pdf

cmp legacy-pdf/index.html dist/index.html
cmp portfolio.pdf dist/portfolio.pdf
echo "GitHub Pages original PDF artifact verified: dist/index.html + dist/portfolio.pdf"
