# Reagan Munene - Tech Portfolio

Full-stack portfolio with a React web app, Express API, Supabase contact storage, Render backend deploy config, and a React Native mobile app.

## Architecture

- `client/` — React (Vite) frontend
- `server/` — Node.js + Express API
- `mobile/` — React Native (Expo) app
- `render.yaml` — Render blueprint for the backend

The Express API is the source of truth for profile, skills, and projects. Both the web and mobile apps call:

- `GET /api/health`
- `GET /api/portfolio`
- `POST /api/contact`

Contact submissions are stored in Supabase (`messages` table) using the service role key on the server only.

## Local setup

### 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Run `server/supabase.sql` in the SQL editor.
3. Copy `server/.env.example` to `server/.env`.
4. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API).

The portfolio pages still load without Supabase. The contact form needs those keys.

### 2. Backend

```bash
cd server
npm install
npm run dev
```

API: http://localhost:5000

### 3. React frontend

```bash
cd client
npm install
npm run dev
```

Web app: http://localhost:5173

Vite proxies `/api` to the Express server in development. For production, set `VITE_API_URL` to your Render URL, for example `https://your-api.onrender.com`.

### 4. React Native

```bash
cd mobile
npm install
npx expo start
```

Then open the project in Expo Go.

- Android emulator: `EXPO_PUBLIC_API_URL=http://10.0.2.2:5000`
- iOS simulator: `EXPO_PUBLIC_API_URL=http://localhost:5000`
- Physical device: use your computer LAN IP, for example `http://192.168.1.20:5000`

Copy `mobile/.env.example` to `mobile/.env` and update the URL.

## Deploy backend on Render

1. Push this repo to GitHub.
2. In Render, create a Web Service from the repo (or use `render.yaml`).
3. Root directory: `server`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:

- `NODE_ENV=production`
- `CLIENT_ORIGIN=https://your-frontend-domain`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Health check path: `/api/health`

## Deploy frontend

Build the React app and host it on Vercel, Netlify, or GitHub Pages:

```bash
cd client
npm run build
```

Set `VITE_API_URL` to the Render API URL before building.

## Customize

Update your name, email, GitHub, LinkedIn, skills, and projects in `server/src/data/portfolio.js`.
