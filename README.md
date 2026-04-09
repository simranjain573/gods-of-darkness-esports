# Gods of Darkness Esports (Full-Stack)

Modern esports organization platform for **Gods of Darkness** with React + Tailwind frontend and Node/Express + MongoDB backend.

## Features Included

- Dark neon esports themed responsive UI
- Homepage with hero, about, featured games, tournaments CTA, and social links
- User Signup/Login with JWT auth (IGN and character name merged into one field)
- Player dashboard with profile editing and tournament registrations
- Tournament system (create + join + admin registration view)
- Team section with role-based player cards
- Merchandise store with cart + simple checkout form
- Admin panel with secure admin login and management actions
- Bonus features: leaderboard, match history API, recruitment form endpoint
- Loading states, form validation basics, and success/error notifications

## Project Structure

```bash
.
├── backend
│   ├── config
│   │   └── db.js
│   ├── middleware
│   │   └── auth.js
│   ├── models
│   │   ├── Admin.js
│   │   ├── Product.js
│   │   ├── Registration.js
│   │   ├── Tournament.js
│   │   └── User.js
│   ├── routes
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── tournaments.js
│   │   └── users.js
│   ├── seed
│   │   └── seed.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── index.html
└── README.md
```

## Database Schema / Collections

- **Users**: profile, auth, game details, leaderboard points, match history
- **Tournaments**: game, date, entry fee, max players
- **Registrations**: user ↔ tournament registration map
- **Products**: merch catalog
- **Admins**: admin credentials

## Run Locally

### 1) Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

Backend runs on: `http://localhost:5000`

### 2) Frontend Setup

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

## Test Accounts (Seed Data)

### Admin
- username: `godadmin`
- password: `Password@123`
- admin secret: `godmode123`

### Player
- email: `shadow@godsofdarkness.gg`
- username: `shadow`
- password: `Password@123`

## Key API Routes

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/admin-login`
- `GET /api/users/me`
- `PUT /api/users/me`
- `GET /api/users/leaderboard`
- `GET /api/users/match-history/:id`
- `POST /api/users/recruitment`
- `GET /api/tournaments`
- `POST /api/tournaments` (admin)
- `POST /api/tournaments/:id/register`
- `GET /api/tournaments/registrations/all` (admin)
- `GET /api/products`
- `POST /api/products` (admin)
- `GET /api/admin/stats` (admin)

## Notes

- Checkout is intentionally simple (no real payment integration).
- Social links currently point to platform homepages and should be replaced with real org links.
- Add env hardening, rate limiting, and stronger validation before production use.
