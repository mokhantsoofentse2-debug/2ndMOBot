import Head from 'next/head'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(r => r.json())

export default function Home() {
  const { data, mutate } = useSWR('/api/settings', fetcher, { refreshInterval: 5000 })

  async function toggle() {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled: !data.enabled })
    })
    mutate()
  }

  if (!data) return <div className="p-8">Loading…</div>

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: 24, background: '#0f172a', color:'#e6eef8', minHeight:'100vh' }}>
      <Head><title>M.O. Trading Bot Dashboard</title></Head>
      <header style={{ display:'flex', alignItems:'center', gap:16 }}>
        <img src="/robot.svg" alt="AI Robot" width={84} />
        <div>
          <h1 style={{ margin:0 }}>M.O.'s Trading System PRO</h1>
          <p style={{ margin:0, color:'#9aa8c3' }}>Remote dashboard & MT5 bridge</p>
        </div>
      </header>

      <main style={{ marginTop:24, display:'grid', gridTemplateColumns: '1fr 420px', gap:24 }}>
        <section style={{ padding:20, background:'#071029', borderRadius:12 }}>
          <h2>Control Center</h2>
          <p>Bot status: <strong>{data.enabled ? 'Enabled' : 'Disabled'}</strong></p>
          <button onClick={toggle} style={{ padding:'8px 12px', borderRadius:8 }}>{data.enabled ? 'Turn Off' : 'Turn On'}</button>

          <div style={{ marginTop:16 }}>
            <label>Daily Trade Limit: {data.dailyTradeLimit}</label>
            <input type="range" min="1" max="100" value={data.dailyTradeLimit}
              onChange={e => fetch('/api/settings', { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ dailyTradeLimit: Number(e.target.value) }) }).then(()=>mutate())}
              style={{ width:'100%' }}
            />
          </div>

          <div style={{ marginTop:16 }}>
            <label>Broker</label>
            <input value={data.broker} onChange={e=>fetch('/api/settings',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({broker:e.target.value})}).then(()=>mutate())} />
            <label>Account ID</label>
            <input value={data.accountId} onChange={e=>fetch('/api/settings',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({accountId:e.target.value})}).then(()=>mutate())} />
          </div>

          <div style={{ marginTop:16 }}>
            <h3>Metrics</h3>
            <div>Today Trades: {data.todayTrades}</div>
            <div>Lifetime Trades: {data.lifetimeTrades}</div>
            <div>EA Status: {data.eaStatus}</div>
          </div>
        </section>

        <aside style={{ padding:20, background:'#071029', borderRadius:12 }}>
          <h3>Armored Hero & AI Mascot</h3>
          <p>Replace the hero image in <code>/public/hero.jpg</code> with your licensed art (do NOT use Marvel images without permission).</p>
          <img src="/hero-placeholder.jpg" alt="Hero placeholder" style={{ width:'100%', borderRadius:8, opacity:0.9 }} />
        </aside>
      </main>
    </div>
  )
}
