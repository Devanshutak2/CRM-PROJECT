# Sangam Motors CRM

A full-stack CRM dashboard built for Sangam Motors — a Honda two-wheeler
dealership — covering lead management, vehicle (two-wheeler) inventory, test
ride scheduling, and the service center, on top of a sales dashboard with
live KPIs.

**Stack:** React.js + Tailwind CSS (frontend) · Node.js + Express + MongoDB (backend)

## What's new in this upgrade

The original project was a single `App.js` with Add/List/Delete for customers only.
This upgrade adds:

- A multi-page React app (sidebar navigation, 5 modules) instead of one screen
- A complete design system — "instrument cluster" theme (gauges, odometer-style
  digit readouts, tachometer redline accents) that ties back to the automotive
  subject matter instead of a generic admin template
- 4 new Mongoose models + full CRUD routes: Vehicle, TestRide, Service (Customer
  model extended with lead-qualification fields)
- A demo-data fallback: if the backend isn't running, the frontend automatically
  shows realistic seeded data instead of a blank screen — useful if your laptop's
  MongoDB isn't connected during the presentation
- Two-wheeler catalog (Activa, Dio, Shine, SP 125, Unicorn, Hornet 2.0) and
  "test ride" terminology throughout, since Sangam Motors deals in
  motorcycles and scooters, not cars

## Folder structure

```
sangam-motors-crm/
├── backend/
│   ├── models/        Customer, Vehicle, TestRide, Service
│   ├── routes/        CRUD routes for each module
│   ├── server.js       Express app entry point
│   └── seed.js          Populates demo data into MongoDB
└── frontend/
    └── src/
        ├── components/  Sidebar, Topbar, Gauge, Funnel, MiniBarChart, Badge, StatCard
        ├── pages/       Dashboard, Leads, Inventory, TestRides, Service
        ├── api/         Axios client with automatic mock-data fallback
        └── data/        Seed/mock data used by the fallback
```

## Running it locally

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env      # edit MONGO_URI if needed
npm run seed               # populates demo leads, vehicles, test rides, jobs
npm run dev                 # starts on http://localhost:5000
```

If you don't have MongoDB running, the server will still boot (for routes/health
check), but data calls will fail — the frontend will quietly fall back to demo
data, so the UI still works for your presentation.

### 2. Frontend

```bash
cd frontend
npm install
npm start                   # opens http://localhost:3000
```

## Presentation tips

- Lead with the **Dashboard** — the speedometer-style gauge tracking monthly sales
  against target is the most distinctive visual; it's a good hook to open with
  (and it doubles as a nod to an actual motorcycle's speedometer).
- Walk through the 5 modules in the sidebar in this order: Dashboard → Leads →
  Inventory → Test Rides → Service — mirrors the actual customer journey at a
  dealership (inquiry → browse → test ride → service after purchase).
- Point out the "Connected to live API" / "Demo data" indicator in the top bar —
  it's a nice talking point about resilient frontend design.
- If asked about scalability: each module is its own Mongoose model + route file,
  so adding a 6th module (e.g. Finance/Insurance) is a contained change.

## Updating your GitHub repo

Copy the contents of `backend/` and `frontend/` over your existing folders of the
same name in `Devanshutak2/CRM-PROJECT`, then commit:

```bash
git add .
git commit -m "Switch CRM to two-wheeler catalog and rename to Sangam Motors"
git push
```
