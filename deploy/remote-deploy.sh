#!/usr/bin/env bash
# Executed over SSH on OCI my-free-server ONLY, by the Portfolio GitHub Actions workflow.
set -Eeuo pipefail

commit="${1:-}"
if [[ ! "$commit" =~ ^[0-9a-f]{40}$ ]]; then
  echo "Invalid commit SHA" >&2
  exit 2
fi

root="$HOME/portfolio"
image="ghcr.io/sksqlrlek/jaehun-portfolio-web:$commit"
archive="$root/releases/$commit.tar.gz"
compose="$root/compose.yaml"

command -v docker >/dev/null || { echo "Docker is not installed on my-free-server" >&2; exit 1; }
docker compose version >/dev/null || { echo "Docker Compose v2 is required" >&2; exit 1; }
command -v curl >/dev/null || { echo "curl is required for health checks" >&2; exit 1; }
[[ -f "$compose" && -r "$archive" ]] || { echo "Missing compose.yaml or uploaded Docker archive" >&2; exit 1; }

# Transfer a tested image from Actions, not a build context or a public package.
gzip -dc "$archive" | docker load
docker image inspect "$image" >/dev/null

mkdir -p "$root"
previous_image="$(docker inspect --format '{{.Config.Image}}' jaehun-portfolio-web 2>/dev/null || true)"
if [[ -f "$root/.env" ]]; then
  cp -f "$root/.env" "$root/.env.previous"
fi

printf 'PORTFOLIO_IMAGE=%s\n' "$image" > "$root/.env.next"
chmod 600 "$root/.env.next"
mv -f "$root/.env.next" "$root/.env"

rollback() {
  echo "Portfolio deployment failed; trying previous image" >&2
  if [[ -n "$previous_image" ]]; then
    printf 'PORTFOLIO_IMAGE=%s\n' "$previous_image" > "$root/.env"
    PORTFOLIO_IMAGE="$previous_image" docker compose -f "$compose" --env-file "$root/.env" up -d --no-build web || true
  else
    docker rm -f jaehun-portfolio-web >/dev/null 2>&1 || true
    rm -f "$root/.env"
  fi
}

echo "Deploying portfolio image $image"
if ! docker compose -f "$compose" --env-file "$root/.env" up -d --no-build web; then
  rollback
  exit 1
fi

healthy=false
for i in $(seq 1 20); do
  if curl --fail --silent --show-error http://127.0.0.1:8781/ 2>/dev/null | grep -q 'Han Jaehun'; then
    healthy=true
    break
  fi
  sleep 2
done

if [[ "$healthy" != true ]]; then
  rollback
  exit 1
fi

printf '%s\n' "$commit" > "$root/deployed-commit"
rm -f "$archive"
echo "Portfolio deployment healthy at http://127.0.0.1:8781/ (OCI my-free-server)"
