# Going Live — Sangam Motors CRM

This guide takes the app from local/demo to a real, live system the owner and
staff can use with real data, on both laptop (as a website) and phone (as an
installed app / PWA).

Total cost to start: **₹0** (every service below has a free tier that's enough
for a single dealership).

---

## 1. Create the live database (MongoDB Atlas)

1. Go to https://www.mongodb.com/cloud/atlas and create a free account.
2. Create a free **M0 cluster** (any nearby region, e.g. Mumbai).
3. Under **Database Access**, create a database user (username + password).
4. Under **Network Access**, add `0.0.0.0/0` (allow from anywhere) — fine for
   a small internal tool; you can tighten this later.
5. Click **Connect → Drivers**, copy the connection string. It looks like:
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/sangam_motors_crm`
   Keep this — it's your `MONGO_URI`.

## 2. Deploy the backend (Render)

1. Push this repo to GitHub if you haven't already (`git push`).
2. Go to https://render.com, sign up, click **New → Web Service**, connect
   your GitHub repo.
3. Render will detect `render.yaml` automatically. If not, set manually:
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
4. Add environment variables (Render dashboard → Environment):
   - `MONGO_URI` = the connection string from step 1
   - `JWT_SECRET` = a long random string (Render can auto-generate this)
   - `CORS_ORIGIN` = your frontend URL (you'll fill this in after step 3 —
     leave blank for now and update it later)
5. Deploy. You'll get a URL like `https://sangam-crm-backend.onrender.com`.
   Visit it — you should see `{"status": "Sangam Motors CRM API is running"}`.

## 3. Deploy the frontend (Vercel)

1. Go to https://vercel.com, sign up, click **Add New → Project**, import the
   same GitHub repo.
2. Set the **root directory** to `frontend`.
3. Add environment variable:
   - `REACT_APP_API_URL` = `https://sangam-crm-backend.onrender.com/api`
     (your Render URL from step 2, with `/api` at the end)
4. Deploy. You'll get a URL like `https://sangam-crm.vercel.app`.
5. Go back to Render and set `CORS_ORIGIN` to this Vercel URL, then redeploy
   the backend so it accepts requests from your live frontend.

## 4. Seed real starting data (optional)

If you want to start with the current demo data as a base (then edit/delete
as needed), run once, pointed at your live database:

```bash
cd backend
MONGO_URI="<your Atlas connection string>" npm run seed
```

Otherwise, just start adding real leads/inventory/etc. through the app itself
— an empty database works fine.

## 5. Create logins for the owner and staff

There's no public sign-up (intentional — this is an internal tool). Create
each person's login from your machine, pointed at the live database:

```bash
cd backend
MONGO_URI="<your Atlas connection string>" npm run createuser -- "Vijay Tak" vijay@sangammotors.in "choose-a-strong-password" owner
MONGO_URI="<your Atlas connection string>" npm run createuser -- "Ujjwal" ujjwal@sangammotors.in "another-password" manager
```

Roles: `owner`, `manager`, `staff`. Share each person's email + password with
them directly (not over an insecure channel like SMS/WhatsApp if you can
avoid it) — they should change it if you add a "change password" feature
later.

## 6. Install it as an app on phones

Once the Vercel URL is live:

- **Android (Chrome):** open the site → tap the ⋮ menu → **"Install app"** (or
  **"Add to Home screen"**). It now opens full-screen with its own icon.
- **iPhone (Safari):** open the site → tap the **Share** icon → **"Add to
  Home Screen"**.

On laptops it's just the website — bookmark the Vercel URL.

## 7. Custom domain (optional, later)

Both Render and Vercel let you attach a real domain (e.g.
`crm.sangammotors.in`) for free once you own one. Not required to go live.

---

## What changed in the code for this

- **Authentication**: every `/api/*` route now requires a logged-in user
  (JWT). Login page added at `/login`. Create accounts with
  `npm run createuser`.
- **PWA**: `manifest.json`, app icons, and a service worker were added so the
  app is installable on Android/iPhone. API calls always hit the network
  live data is never cached/stale.
- **CORS**: locked to `CORS_ORIGIN` in production instead of wide open.
- **Deploy configs**: `render.yaml` (backend) and `frontend/vercel.json`
  (frontend, with SPA routing fallback).
