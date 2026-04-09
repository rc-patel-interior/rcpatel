#!/bin/bash
set -e

echo "==> Installing pnpm..."
npm install -g pnpm

echo "==> Installing all dependencies..."
pnpm install --frozen-lockfile

echo "==> Building frontend (React)..."
BASE_PATH=/ NODE_ENV=production pnpm --filter @workspace/rc-patel-interior run build

echo "==> Building API server (Express)..."
pnpm --filter @workspace/api-server run build

echo "==> Pushing database schema..."
pnpm --filter @workspace/db run push

echo "==> Build complete!"
