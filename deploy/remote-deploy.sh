#!/usr/bin/env bash
# Upgrade the EXISTING Compose service on OCI my-free-server (158.180.71.120).
# The old release directory is retained for first-deployment rollback.
set -Eeuo pipefail

commit="${1:-}"
if [[ ! "$commit" =~ ^[0-9a-f]{40}$ ]]; then
  echo "Invalid commit SHA" >&2
  exit 2
fi

project="jaehun-portfolio"
service="web"
container="jaehun-portfolio-web-1"
root="$HOME/portfolio"
image="ghcr.io/sksqlrlek/jaehun-portfolio-web:$commit"
archive="$root/releases/$commit.tar.gz"
compose="$root/compose.yaml"
staged_compose="$root/compose.yaml.next"
previous_compose=""
previous_image=""
previous_env_exists=false
previous_compose_exists=false
had_existing_container=false

command -v docker >/dev/null || { echo "Docker is not installed" >&2; exit 1; }
docker compose version >/dev/null || { echo "Docker Compose is required" >&2; exit 1; }
command -v curl >/dev/null || { echo "curl is required for HTTP health checks" >&2; exit 1; }
[[ -r "$archive" && -r "$staged_compose" ]] || {
  echo "Missing uploaded Docker archive or staged compose.yaml.next" >&2
  exit 1
}

# Protect the preexisting 8780 deployment before making any changes.
if docker container inspect "$container" >/dev/null 2>&1; then
  had_existing_container=true
  old_project="$(docker inspect --format '{{index .Config.Labels "com.docker.compose.project"}}' "$container")"
  old_service="$(docker inspect --format '{{index .Config.Labels "com.docker.compose.service"}}' "$container")"
  [[ "$old_project" == "$project" && "$old_service" == "$service" ]] || {
    echo "Existing container does not belong to the expected Compose project/service" >&2
    exit 1
  }

  previous_image="$(docker inspect --format '{{.Config.Image}}' "$container")"
  previous_compose="$(docker inspect --format '{{index .Config.Labels "com.docker.compose.project.config_files"}}' "$container")"
  # Current deployment path observed: /home/ubuntu/jaehun-portfolio-releases/release-mQOob3/compose.yaml
  if [[ -z "$previous_compose" || "$previous_compose" == "<no value>" ]]; then
    echo "Existing container lacks a rollback Compose file reference" >&2
    exit 1
  fi
  if [[ "$previous_compose" != "$compose" && ! -r "$previous_compose" ]]; then
    echo "Original Compose file missing; refusing to replace existing container: $previous_compose" >&2
    exit 1
  fi
  echo "Replacing existing $container (image: $previous_image)"
  echo "Rollback Compose source: $previous_compose"
fi

# The action has already built and smoke-tested this exact image.
gzip -dc "$archive" | docker load
docker image inspect "$image" >/dev/null

if [[ -f "$compose" ]]; then
  cp -p "$compose" "$root/compose.yaml.previous"
  previous_compose_exists=true
fi
if [[ -f "$root/.env" ]]; then
  cp -p "$root/.env" "$root/.env.previous"
  previous_env_exists=true
fi

# Stage config before swapping it, so future deployments keep a backup.
mv -f "$staged_compose" "$compose"
printf 'PORTFOLIO_IMAGE=%s\n' "$image" > "$root/.env.next"
chmod 600 "$root/.env.next"
mv -f "$root/.env.next" "$root/.env"

rollback() {
  echo "::error::Portfolio health check failed; attempting to restore previous Compose service" >&2
  if [[ "$had_existing_container" != true ]]; then
    echo "No previous service was found; leaving the new deployment for investigation" >&2
    return
  fi

  if [[ "$previous_compose" != "$compose" ]]; then
    # Initial migration: the original release directory and Compose file are unchanged.
    docker compose --project-name "$project" -f "$previous_compose" up -d --no-build "$service" || true
  else
    # Subsequent deployments: restore previous file and image tag.
    if [[ "$previous_compose_exists" == true ]]; then
      cp -p "$root/compose.yaml.previous" "$compose"
    fi
    if [[ "$previous_env_exists" == true ]]; then
      cp -p "$root/.env.previous" "$root/.env"
    else
      printf 'PORTFOLIO_IMAGE=%s\n' "$previous_image" > "$root/.env"
    fi
    docker compose --project-name "$project" -f "$compose" --env-file "$root/.env" up -d --no-build "$service" || true
  fi
}

echo "Updating existing Compose service $project/$service at port 8780"
if ! docker compose --project-name "$project" -f "$compose" --env-file "$root/.env" up -d --no-build "$service"; then
  rollback
  exit 1
fi

healthy=false
for attempt in $(seq 1 20); do
  if curl --fail --silent http://127.0.0.1:8780/ 2>/dev/null | grep -q 'Han Jaehun'; then
    healthy=true
    break
  fi
  sleep 2
done

if [[ "$healthy" != true ]]; then
  rollback
  exit 1
fi

# Confirm this is the same Compose service (not an extra :8781 container).
current_image="$(docker inspect --format '{{.Config.Image}}' "$container" 2>/dev/null || true)"
if [[ "$current_image" != "$image" ]]; then
  echo "New image is not running under $container" >&2
  rollback
  exit 1
fi

printf '%s\n' "$commit" > "$root/deployed-commit"
rm -f "$archive"
echo "Successfully deployed $image to existing $container on http://127.0.0.1:8780/"
