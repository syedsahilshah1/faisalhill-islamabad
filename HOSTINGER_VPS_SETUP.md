# 🚀 Hostinger VPS Deployment & Direct GitHub Push Guide

This guide explains how to set up your **Hostinger VPS (Ubuntu)** so that whenever you run:
```bash
git push origin main
```
GitHub automatically builds and deploys both your **Next.js Frontend** and **Laravel Backend** to your VPS.

---

## 🏗️ Architecture Overview

- **Domain**: `faisalhillsislamabadfh.com` ➔ Proxied to Next.js (port 3000 via PM2)
- **API Domain**: `api.faisalhillsislamabadfh.com` ➔ Served by Nginx + PHP 8.2/8.3-FPM
- **CI/CD**: GitHub Actions connects via SSH and runs `/var/www/faisalhills/deploy.sh` automatically on every push.

---

## 📋 STEP 1: Initial VPS Setup (Run Once on VPS)

Connect to your Hostinger VPS via SSH (using Hostinger Browser Terminal or PuTTY / Terminal):
```bash
ssh root@YOUR_HOSTINGER_VPS_IP
```

### 1.1 Update System & Install Required Packages
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl wget unzip zip nginx certbot python3-certbot-nginx mysql-server
```

### 1.2 Setup 4GB Swap Space (Prevents Next.js build out-of-memory errors)
```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 1.3 Install PHP 8.2 & Extensions for Laravel
```bash
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
sudo apt install -y php8.2-fpm php8.2-cli php8.2-mysql php8.2-curl php8.2-gd php8.2-mbstring php8.2-xml php8.2-zip php8.2-bcmath php8.2-intl
```

Install Composer globally:
```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

### 1.4 Install Node.js 20 & PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

---

## 🗄️ STEP 2: Configure MySQL Database

Open MySQL:
```bash
sudo mysql
```

Run these SQL queries (replace `YourStrongPasswordHere` with a secure password):
```sql
CREATE DATABASE faisal_hills CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'faisal_user'@'localhost' IDENTIFIED BY 'YourStrongPasswordHere';
GRANT ALL PRIVILEGES ON faisal_hills.* TO 'faisal_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 📁 STEP 3: Clone Project & Setup Environment

### 3.1 Clone the Repository
```bash
sudo mkdir -p /var/www/faisalhills
sudo chown -R $USER:$USER /var/www/faisalhills
cd /var/www
git clone https://github.com/syedsahilshah1/faisalhill-islamabad.git /var/www/faisalhills
cd /var/www/faisalhills
```

### 3.2 Setup Laravel Backend
```bash
cd /var/www/faisalhills/backend
cp .env.example .env
nano .env
```
Update your `.env` with:
```env
APP_NAME="Faisal Hills Real Estate"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://api.faisalhillsislamabadfh.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=faisal_hills
DB_USERNAME=faisal_user
DB_PASSWORD=YourStrongPasswordHere
```
*(Press `Ctrl + O` to save, then `Enter`, then `Ctrl + X` to exit nano)*

Run Laravel initial commands:
```bash
composer install --optimize-autoloader --no-dev
php artisan key:generate --force
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### 3.3 Setup Next.js Frontend
```bash
cd /var/www/faisalhills/frontend
nano .env.local
```
Add:
```env
NEXT_PUBLIC_API_URL=https://api.faisalhillsislamabadfh.com/api
NEXT_PUBLIC_SITE_URL=https://faisalhillsislamabadfh.com
NODE_ENV=production
PORT=3000
```
Build frontend and start with PM2:
```bash
npm install
npm run build

cd /var/www/faisalhills
pm2 start ecosystem.config.js
pm2 startup
# (Run the generated sudo env command that PM2 prints on screen)
pm2 save
```

---

## 🌐 STEP 4: Configure Nginx & SSL

### 4.1 Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/faisalhills
```
Paste this configuration:
```nginx
# 1. Frontend: Next.js (port 3000)
server {
    listen 80;
    server_name faisalhillsislamabadfh.com www.faisalhillsislamabadfh.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# 2. Backend: Laravel API
server {
    listen 80;
    server_name api.faisalhillsislamabadfh.com;
    root /var/www/faisalhills/backend/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php index.html;
    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

Enable the site and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/faisalhills /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### 4.2 Obtain Free SSL Certificates (Certbot)
Ensure your domain DNS (A records for `@`, `www`, and `api`) are pointed to your Hostinger VPS IP.
```bash
sudo certbot --nginx -d faisalhillsislamabadfh.com -d www.faisalhillsislamabadfh.com -d api.faisalhillsislamabadfh.com
```

---

## ⚡ STEP 5: Setup Automatic GitHub Direct Push (CI/CD)

To allow GitHub Actions to securely deploy directly upon pushing:

### 5.1 Generate an SSH Key Pair on the VPS
On your VPS terminal:
```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions -N ""
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

Display the **Private Key** (you will copy this):
```bash
cat ~/.ssh/github_actions
```
*(Copy the full text starting from `-----BEGIN OPENSSH PRIVATE KEY-----` to `-----END OPENSSH PRIVATE KEY-----`)*

### 5.2 Add GitHub Secrets
1. Go to your GitHub Repository: **`https://github.com/syedsahilshah1/faisalhill-islamabad`**
2. Click **Settings** ➔ **Secrets and variables** ➔ **Actions**.
3. Click **New repository secret** and add the following 4 secrets:

| Secret Name | Value |
|---|---|
| `HOSTINGER_VPS_IP` | Your VPS IP address (e.g. `194.163.xxx.xxx`) |
| `HOSTINGER_VPS_USER` | `root` (or your VPS username) |
| `HOSTINGER_SSH_PRIVATE_KEY` | Paste the private key from `cat ~/.ssh/github_actions` |
| `HOSTINGER_SSH_PORT` | `22` (or your custom SSH port if changed) |

---

## 🚀 How to Deploy Now

From now on, whenever you make changes locally on your computer:
```bash
git add .
git commit -m "Updated website"
git push origin main
```
1. GitHub Actions will automatically start (viewable in the **Actions** tab on your GitHub repo).
2. It SSHs into your Hostinger VPS.
3. Pulls latest changes.
4. Updates Composer, migrates database, clears caches.
5. Builds Next.js and reloads PM2 with zero downtime!
