# M.O. Trading Bot Dashboard - Starter (Next.js)

This repo contains a Next.js starter app and minimal API routes to run the remote dashboard + MT5 bridge.

What you get:
- Frontend React pages (Next.js) with controls: On/Off, Daily trade limit, Broker & Account fields.
- Minimal backend API routes (Next.js API) that mimic the Express API contract (in-memory store).
- An amusing robot SVG in /public as the AI mascot.
- Prisma schema placeholder (for Postgres) and Dockerfile to help deploy.

IMPORTANT: This package does NOT deploy to the internet. I cannot host a live website for you.
To get a live website you can:
1) Deploy this repo to Vercel (recommended) — connect GitHub and push the repo.
2) Or deploy the Docker container to a VPS (DigitalOcean, Render, etc.).

Local run:
```bash
cd m-o-trading-dashboard
npm install
npm run dev
```

Then open http://localhost:3000

For deployment guidance and connecting to MT5 WebRequest, see the canvas document (updated) or ask me to walk you through Vercel/DigitalOcean steps.
