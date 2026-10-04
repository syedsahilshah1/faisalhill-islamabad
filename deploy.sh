#!/bin/bash
set -e

echo "🚀 Starting Deployment at $(date)..."

# Directory where project is cloned
PROJECT_DIR="/var/www/faisalhills"

if [ ! -d "$PROJECT_DIR" ]; then
  echo "❌ Error: Project directory $PROJECT_DIR does not exist."
  exit 1
fi

cd "$PROJECT_DIR"

echo "📥 Fetching latest changes from GitHub (main)..."
git fetch origin main
git reset --hard origin/main

# -------------------------------------------------------------
# 1. LARAVEL BACKEND DEPLOYMENT
# -------------------------------------------------------------
echo "⚙️ Deploying Laravel Backend..."
cd "$PROJECT_DIR/backend"

if [ -f "composer.json" ]; then
  # Install Composer dependencies
  composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

  # Run Database Migrations
  php artisan migrate --force

  # Clear and cache configurations, routes, and views
  php artisan optimize:clear
  php artisan config:cache
  php artisan route:cache
  php artisan view:cache
  php artisan storage:link || true

  # Set correct permissions
  sudo chown -R www-data:www-data storage bootstrap/cache
  sudo chmod -R 775 storage bootstrap/cache
fi

# -------------------------------------------------------------
# 2. NEXT.JS FRONTEND DEPLOYMENT
# -------------------------------------------------------------
echo "⚙️ Deploying Next.js Frontend..."
cd "$PROJECT_DIR/frontend"

if [ -f "package.json" ]; then
  # Install npm dependencies
  npm install

  # Build the Next.js production bundle
  npm run build

  # Reload or restart with PM2
  cd "$PROJECT_DIR"
  if command -v pm2 &> /dev/null; then
    pm2 reload ecosystem.config.js || pm2 start ecosystem.config.js
    pm2 save
  else
    echo "⚠️ Warning: PM2 is not installed globally. Run 'npm install -g pm2'."
  fi
fi

# -------------------------------------------------------------
# 3. RELOAD WEBSERVER
# -------------------------------------------------------------
echo "🔄 Reloading Nginx & PHP-FPM services..."
sudo systemctl reload nginx || true
sudo systemctl reload php8.2-fpm || sudo systemctl reload php8.3-fpm || true

echo "✅ Deployment completed successfully at $(date)!"
