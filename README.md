# For App Router (Next.js 13+)
mkdir app
touch app/page.js
touch app/layout.js

# For Pages Router
mkdir pages
touch pages/index.js
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
export const metadata = {
  title: 'M.O. Trading Bot Dashboard',
  description: 'Dashboard for M.O. Trading Bot',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [settings, setSettings] = useState({
    isActive: false,
    dailyTradeLimit: 1000,
    broker: '',
    account: ''
  })
  const [status, setStatus] = useState({})

  useEffect(() => {
    fetchStatus()
  }, [])

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/trading/status')
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error('Error fetching status:', error)
    }
  }

  const updateSettings = async (newSettings) => {
    try {
      const response = await fetch('/api/trading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      })
      const data = await response.json()
      setSettings(data)
      await fetchStatus()
    } catch (error) {
      console.error('Error updating settings:', error)
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>M.O. Trading Bot Dashboard</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Control Panel</h2>
        <button 
          onClick={() => updateSettings({ ...settings, isActive: !settings.isActive })}
          style={{ 
            backgroundColor: settings.isActive ? 'green' : 'red', 
            color: 'white', 
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {settings.isActive ? 'ON' : 'OFF'}
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Settings</h2>
        <div style={{ marginBottom: '1rem' }}>
          <label>Daily Trade Limit: </label>
          <input 
            type="number" 
            value={settings.dailyTradeLimit}
            onChange={(e) => setSettings({ ...settings, dailyTradeLimit: parseInt(e.target.value) })}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Broker: </label>
          <input 
            type="text" 
            value={settings.broker}
            onChange={(e) => setSettings({ ...settings, broker: e.target.value })}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Account: </label>
          <input 
            type="text" 
            value={settings.account}
            onChange={(e) => setSettings({ ...settings, account: e.target.value })}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>
        <button 
          onClick={() => updateSettings(settings)}
          style={{ 
            backgroundColor: 'blue', 
            color: 'white', 
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Save Settings
        </button>
      </div>

      <div>
        <h2>Status</h2>
        <pre>{JSON.stringify(status, null, 2)}</pre>
      </div>
    </div>
  )
}
let currentSettings = {
  isActive: false,
  dailyTradeLimit: 1000,
  broker: '',
  account: ''
}

export async function POST(request) {
  try {
    const newSettings = await request.json()
    currentSettings = { ...currentSettings, ...newSettings }
    return Response.json(currentSettings)
  } catch (error) {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }
}

export async function GET() {
  return Response.json(currentSettings)
}
export async function GET() {
  return Response.json({
    status: 'online',
    lastTrade: new Date().toISOString(),
    performance: '+2.5%',
    tradesToday: 12
  })
}
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="20" width="60" height="60" fill="#4CAF50" rx="10"/>
  <circle cx="35" cy="40" r="5" fill="#FFF"/>
  <circle cx="65" cy="40" r="5" fill="#FFF"/>
  <rect x="35" y="60" width="30" height="5" fill="#FFF" rx="2"/>
</svg>
{
  "name": "m-o-trading-dashboard",
  "version": "1.0.0",
  "description": "M.O. Trading Bot Dashboard",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.1.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "eslint-config-next": "14.1.0"
  }
}
# Create directories
mkdir -p app/api/trading/status public

# Then create each file with the content above
# After creating all files:
git add .
git commit -m "Complete Next.js app for Vercel deployment"
git push origin main
