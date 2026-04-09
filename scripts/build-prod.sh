#!/bin/bash
set -e

echo "==> Installing pnpm@10.26.1..."
npm install -g pnpm@10.26.1

echo "==> Installing all dependencies..."
pnpm install --frozen-lockfile

echo "==> Building frontend (React)..."
BASE_PATH=/ NODE_ENV=production pnpm --filter @workspace/rc-patel-interior run build

echo "==> Building API server (Express)..."
pnpm --filter @workspace/api-server run build

echo "==> Build complete!"
