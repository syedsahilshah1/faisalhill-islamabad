# Hostinger Deployment Guide for faisalhillsislamabadfh.com

This guide provides the exact steps to deploy your website on **Hostinger hPanel** for your domain **`faisalhillsislamabadfh.com`**.

---

## 🌐 Domain & Architecture Setup

| Service | Target URL | Location / Platform |
|---|---|---|
| **Frontend (Next.js)** | `https://faisalhillsislamabadfh.com` | Hostinger Node.js App OR Vercel (Recommended) |
| **Backend (Laravel API)** | `https://api.faisalhillsislamabadfh.com` | Hostinger hPanel Subdomain (`public_html/api`) |
| **Admin Dashboard** | `https://faisalhillsislamabadfh.com/ubaid/admin/login` | Frontend Admin Portal |

---

## 🗄️ PART 1: Deploy Laravel Backend on Hostinger hPanel

### Step 1.1: Create the Subdomain in Hostinger
1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com/websites/faisalhillsislamabadfh.com).
2. Go to **Domains** -> **Subdomains**.
3. Create a subdomain named: **`api`**
   - The full subdomain will be: **`api.faisalhillsislamabadfh.com`**
   - Leave the directory as `public_html/api` (or default).
   - Click **Create**.

---

### Step 1.2: Create MySQL Database in Hostinger
1. In hPanel, go to **Databases** -> **Management**.
2. Under **Create a New MySQL Database and Database User**:
   - **Database Name**: e.g., `u123456_faisalhills`
   - **Database Username**: e.g., `u123456_admin`
   - **Password**: Enter a strong password (save this!).
3. Click **Create** and copy the exact Database Name, Username, and Password.

---

### Step 1.3: Upload Backend Files to Hostinger
1. On your local machine, zip the contents of the `backend/` folder (select everything inside `backend`, except `node_modules`).
2. In Hostinger hPanel, go to **Files** -> **File Manager**.
3. Navigate into `public_html/api`.
4. Upload your zip file and **Extract** it directly into `public_html/api`.

---

### Step 1.4: Configure `.env` on Hostinger
1. In File Manager inside `public_html/api`, create or edit the file named **`.env`**.
2. Paste the following configuration, replacing the database credentials with your Hostinger values:

```env
APP_NAME="Faisal Hills Real Estate"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://api.faisalhillsislamabadfh.com

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

# Hostinger MySQL Database Credentials
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=YOUR_HOSTINGER_DATABASE_NAME
DB_USERNAME=YOUR_HOSTINGER_DATABASE_USER
DB_PASSWORD=YOUR_HOSTINGER_DATABASE_PASSWORD

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=public
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
```

---

### Step 1.5: Run Migrations & Cache in Hostinger SSH / Terminal
1. In hPanel, go to **Advanced** -> **SSH Access** and enable it, or use the **Web Terminal**.
2. Connect to your server and run:
```bash
cd public_html/api
composer install --optimize-autoloader --no-dev
php artisan key:generate --force
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
```
3. Test your backend in your browser: `https://api.faisalhillsislamabadfh.com/api/blocks` — it should return your JSON data!

---

## 🖥️ PART 2: Deploy Next.js Frontend

You have two easy ways to deploy the Next.js frontend for `faisalhillsislamabadfh.com`:

### Method A: Deploy via Vercel (Recommended — Free & 1-Click SSL)
1. Push your repository to GitHub / GitLab.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your repository and select:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js
4. In **Environment Variables**, add:
   - `NEXT_PUBLIC_API_URL` = `https://api.faisalhillsislamabadfh.com/api`
   - `NEXT_PUBLIC_SITE_URL` = `https://faisalhillsislamabadfh.com`
5. Click **Deploy**.
6. In Vercel **Settings -> Domains**, add `faisalhillsislamabadfh.com` and `www.faisalhillsislamabadfh.com`.
7. In Hostinger hPanel DNS Zone, point the A record for `@` to Vercel IP (`76.76.21.21`) or CNAME to `cname.vercel-dns.com`.

---

### Method B: Deploy on Hostinger Node.js Application
If your Hostinger plan includes Node.js:
1. In hPanel, go to **Advanced** -> **Node.js**.
2. Click **Create Application**:
   - **Node.js version**: `18.x` or `20.x`
   - **Application root**: `frontend`
   - **Application startup file**: `node_modules/next/dist/bin/next`
3. In `frontend/.env.local`, set:
   ```env
   NEXT_PUBLIC_API_URL=https://api.faisalhillsislamabadfh.com/api
   NEXT_PUBLIC_SITE_URL=https://faisalhillsislamabadfh.com
   NODE_ENV=production
   ```
4. Run `npm install` and `npm run build`.
5. Start the Node.js application.

---

## 🔐 PART 3: Admin Dashboard Access

Once deployed, access your live Admin Dashboard at:
- **URL**: `https://faisalhillsislamabadfh.com/ubaid/admin/login`
- **Username**: `ubaid` or `ubaid@faisalhills.com`
- **Password**: `admin123`
