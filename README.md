# Faisal Hills Real Estate Platform (Full-Stack Next.js & Laravel)

This is a high-performance, modern, ultra-luxury full-stack web application built for **Faisal Hills Real Estate**, matching the **"Maroon Elegance"** design system specifications.

It is structured as a monorepo:
* **`frontend/`**: Next.js (App Router) client-side application.
* **`backend/`**: Laravel 11.x REST API server.

---

## Technical Stack & Features

* **Frontend**: Next.js, React, Tailwind CSS, Lucide Icons.
* **Backend**: Laravel 11.x, Eloquent ORM, MySQL (XAMPP).
* **Database Scaffold**: Fully automated migrations and database seeders.
* **Luxury UI**: Deep Maroon (`#570000`) & Gold (`#735c00`) color accents, Glassmorphism, Google Fonts (`Playfair Display` & `Inter`).
* **SEO Optimized**: Server-rendered SEO page titles and meta-descriptions queried dynamically from the Laravel database.
* **Admin Dashboard**: Live management control panel for:
  * Checking & deleting customer inquiry leads.
  * Adding and deleting gallery images.
  * Modifying plot status (`Available`, `Reserved`, `Sold`) and pricing.
  * Modifying site-wide SEO metadata parameters.
  * Modifying global verification timestamps.

---

## Installation & Setup

### Prerequisite Checklist
* **PHP**: 8.2+ (XAMPP is suitable)
* **Composer**
* **Node.js & npm**
* **MySQL Database Server** (XAMPP control panel)

---

### Step 1: Run the Backend (Laravel)

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. The `.env` file has been pre-configured for a MySQL database named `faisal_hills` with XAMPP defaults (`root` user, no password). If you need to make changes, edit `backend/.env`.

3. Install Laravel dependencies (done automatically during setup, but in case):
   ```bash
   composer install
   ```

4. Since the database was already created and seeded during setup, you can launch the local development server:
   ```bash
   php artisan serve
   ```
   The backend server will run on `http://127.0.0.1:8000`.

---

### Step 2: Run the Frontend (Next.js)

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Make sure the `.env.local` file points to the Laravel server URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

3. Launch the Next.js development server:
   ```bash
   npm run dev
   ```
   The frontend application will run on `http://localhost:3000`.

---

## Administrative Credentials

Access the admin dashboard at: `http://localhost:3000/ubaid/admin/login`

* **Username/Email**: `ubaid` or `ubaid@faisalhills.com`
* **Password**: `admin123`

You can use the **Quick Demo Login** button on the screen for instant access.

---

## Project Structure Details

### Database Migrations (`backend/database/migrations`)
* `create_blocks_table`: Block meta-parameters, amenities, FAQs, and progress timelines.
* `create_plots_table`: Coordinates on the master vector plan, sizes, facings, prices, and status.
* `create_leads_table`: Web page contact & booking inquiries.
* `create_gallery_items_table`: Image URLs and descriptions.
* `create_site_settings_table`: Global verification timestamps and KPIs.
* `create_seo_configs_table`: Page-by-page SEO meta tags.

### API Integration Client (`frontend/src/data/faisalHillsData.ts`)
Contains the complete list of async functions calling Laravel API endpoints (e.g. `fetchBlocks`, `fetchPlots`, `submitLead`, `adminLogin`, `apiUpdatePlot`, `apiUpdateSeo`, etc.). Includes safe local fallback objects to ensure the site compiles cleanly even if the backend is temporarily offline.


{price in square feet}
sqFeet: plot.size.includes('5 Marla') ? '1,125 Sq. Ft' :
        plot.size.includes('8 Marla') ? '1,800 Sq. Ft' :
        plot.size.includes('10 Marla') ? '2,250 Sq. Ft' :
        plot.size.includes('14 Marla') ? '3,150 Sq. Ft' :
        plot.size.includes('1 Kanal') ? '4,500 Sq. Ft' :
        plot.size.includes('4 Marla') ? '900 Sq. Ft' : 'Standard Area',
