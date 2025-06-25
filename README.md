# 🛍️ Shoplet

A modern, **responsive** e‑commerce web application built with **React + Vite**. Users can browse products, view detailed information, add items to a wishlist, and more – all wrapped in a fast, mobile‑first experience.

> **⚠️ Project status:** still in active development. Authentication, checkout, and some minor screens are work‑in‑progress.

---

## ✨ Features

| Status | Feature |
|--------|---------|
| ✅ | Product catalogue with categories & search |
| ✅ | Detailed product page & image gallery |
| ✅ | Wishlist (heart) functionality & toast notifications |
| ✅ | Fully responsive layout (mobile ↔ desktop) |
| 🚧 | User authentication & protected routes |
| 🚧 | Orders / checkout flow |

---
## 📸 Screenshots
> Place your screenshots inside the `ScreenShots` folder and replace `imageX` with actual image paths.
<div align="center">
  <img src="https://raw.githubusercontent.com/MennaSayed46/Shoplet/master/public/ScreenShots/Screenshot%202025-06-18%20183521.png" alt="Home Desktop" width="30%" />
  <img src="https://raw.githubusercontent.com/MennaSayed46/Shoplet/master/public/ScreenShots/Screenshot%202025-06-18%20183806.png" alt="Product Details" width="30%" />
  <img src="https://raw.githubusercontent.com/MennaSayed46/Shoplet/master/public/ScreenShots/Desktop%20-%201%20(1).png" alt="Products Mobile" width="30%" />
</div>

---

## 🧰 Tech Stack & Libraries

### Core
- **React 18** + **Vite**
- **Tailwind CSS** – utility‑first styling
- **Material UI (MUI)** – ready‑made components

### Routing & State
- **react‑router‑dom** – SPA routing
- **generate‑react‑cli** – folder / component scaffolding

### Data & Forms
- **axios** – HTTP client
- **Formik** + **Yup** – forms & validation

### UX Enhancements
- **react‑hot‑toast** – toast notifications
- **react‑spinners** – loading indicators
- **@fortawesome/fontawesome‑free** – icon set

---

## 🔗 APIs

| Purpose | Endpoint |
|---------|----------|
| Product & mock data | <https://dummyjson.com/>  ( repo: <https://github.com/Ovi/DummyJSON> ) |
| Authentication      | <https://ecommerce.routemisr.com/api/v1/auth> |

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
$ git clone https://github.com/MennaSayed46/Shoplet.git
$ cd Shoplet

# 2. Install dependencies
$ npm install  # or yarn

# 3. Start a local dev server
$ npm run dev  # Vite will run on http://localhost:5173 by default
# Build static files
$ npm run build

# Preview production build locally
$ npm run preview
##📂 Project Structure (simplified)
src/
 ├─ Components/
 │   ├─ Home/
 │   ├─ ProductDetails/
 │   ├─ ...
 ├─ Context/
 │   ├─ HandleHeartContext.jsx      # Wishlist context provider
 │   ├─ SearchProvider.jsx          # Global search context
 ├─ App.jsx
 └─ main.jsx
