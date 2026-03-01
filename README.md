# SVDNEB Website (V2 Redesign)

A modern, high-impact Single Page Application (SPA) redesign for the SVDNEB (Societas Verbi Divini - Nederlands-Belgische Provincie) website. 

The website features a striking Black, White, and Teal aesthetic inspired by `svdmissions.org`, complete with a full-stack Content Management System (CMS) for managing news and blog posts.

## 🎨 V2 Design System 
- **Color Palette**: Shifted to a high-contrast palette. Primary colors are **Deep Black** and **Stark White**, accented heavily by **Teal (`#00aeb5`)** and a touch of **Gold (`#b9975b`)**.
- **Typography Engine**: Upgraded to **Montserrat**, a modern sans-serif. We introduced giant, dual-tone headers for maximum impact. 
- **Signature Elements**: Implemented the signature **colored dots** (gold and teal) trailing at the end of every major heading and CTA button to match the reference site.
- **Layout Structure**: Utilized 50/50 alternating blocks for content (image on one side, solid dark block with text on the other).

## 📄 Refactored Pages
All key areas of the website have been rebuilt to match this new system:
1. **Home (`/`)**: A massive new Hero section with dark overlay, giant centered text with Teal highlights, and 50/50 split sections.
2. **Over Ons (`/over-ons`)**: Refactored to use stark contrast between the main body (white) and sidebar cards (black/teal).
3. **Communiteiten (`/communiteiten`)**: Updated the grid layout to match the new bold card aesthetics.
4. **SVD Apostolaat (`/apostolaat`)**: Minimalist iconography with stark white backgrounds and black/teal sidebars.
5. **Nieuws & Blog (`/nieuws`)**: Stylized feed utilizing the new typography and black footer sections.
6. **Steun Ons (`/steun-ons`)**: A structured page detailing ways to support the mission, with alternating light/dark cards.
7. **Contact (`/contact`)**: Refactored contact blocks and forms to the new, cleaner V2 aesthetic.

## 🗄️ Full-Stack CMS (SQLite + Express)
To allow non-technical users to edit the news and blog posts on the front page, the site has been upgraded from a static React app to a full-stack application! 

- **Backend Location**: `/server`
- **Database**: SQLite (`database.sqlite`)
- **API Server**: Node.js + Express (running on Port 3000)
- **Authentication**: JWT secured routes for creating, updating, and deleting posts.

### Admin Dashboard (`/admin`)
Non-technical users can navigate to `/admin/login` to securely authenticate. Once inside, they can use the **Nieuws & Blog** manager to visually add, edit, or remove articles. These changes are saved in the SQLite database and instantly reflected on the frontend React application (`/` and `/nieuws`). 

## 🚀 Technology Stack

**Frontend:**
- **React 18** (via Vite)
- **Vanilla CSS** (Custom V2 Design System with CSS variables and gradients)
- **React Router** (Client-side routing)
- **Lucide React** (Iconography)

**Backend:**
- **Node.js & Express** (REST API)
- **SQLite3** (Database for News posts and Admin users)
- **JWT (JSON Web Tokens)** (Secure authentication for the Admin panel)
- **Bcrypt.js** (Password hashing)

**Deployment & Infrastructure:**
- **Docker** & **Docker Compose**
- **Nginx** (Serving the built SPA)

## 🗄️ Project Structure

```text
svdneb/
├── src/                  # React Frontend Source Code
│   ├── components/       # Reusable UI components (Header, Footer)
│   ├── pages/            # Main application pages (Home, OverOns, etc.)
│   │   └── admin/        # Admin Dashboard & Login interfaces
│   ├── store/            # API client utilities (dataStore.js)
│   ├── App.jsx           # Main React Router configuration
│   └── index.css         # Global V2 Design System variables
├── server/               # Node.js/Express Backend Core
│   ├── index.js          # Express application and API routes
│   ├── db.js             # SQLite database initialization and seeding
│   ├── package.json      # Backend dependencies
│   └── Dockerfile        # Backend Docker configuration
├── nginx/
│   └── default.conf      # Nginx configuration for serving the React SPA
├── Dockerfile            # Frontend Multi-stage Docker configuration (Vite -> Nginx)
└── docker-compose.yml    # Orchestrates frontend and backend containers
```

## 🛠️ Local Development (Without Docker)

Because this is now a full-stack project, you need two terminals if testing manually:

### 1. Start the React Frontend
The frontend runs on `http://localhost:5173`.
```bash
npm install
npm run dev
```

### 2. Start the Backend API
The backend runs on `http://localhost:3000`.
```bash
cd server
npm install
node index.js
```
*Note: On the first run, `db.js` will automatically create `database.sqlite` and seed it with exactly one admin account and a few sample news posts.*

## 🐳 Running with Docker (Recommended)

The easiest way to run the entire full-stack application is using Docker Compose. This spins up the Nginx frontend and the Node.js backend simultaneously.

```bash
docker-compose up --build
```
- The website will be accessible at: `http://localhost:5173`
- The backend API will be running internally at: `http://localhost:3000`

> **Note on Data Persistence:** The `docker-compose.yml` is configured to use Docker Volumes for the SQLite database. Any news posts or edits made through the Admin panel will persist even if the containers are stopped or removed.

## 🔐 Admin CMS & Authentication

The website includes a custom CMS built specifically for managing the "Nieuws & Blog" section.

**To access the Admin Panel:**
1. Navigate to `http://localhost:5173/admin/login` (or the equivalent URL if running via Docker).
2. Enter the default credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
3. Use the dashboard to Add, Edit, or Delete posts. Changes are saved to the SQLite database and immediately reflected on the Home and Nieuws pages.
