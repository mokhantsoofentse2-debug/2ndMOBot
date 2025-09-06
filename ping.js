let lastHeartbeat = null

export default function handler(req, res) {
  if (req.method === 'GET') {
    const now = Date.now()
    const alive = lastHeartbeat && (now - lastHeartbeat < 60_000)
    res.status(200).json({ status: alive ? 'connected' : 'disconnected' })
  } else if (req.method === 'POST') {
    lastHeartbeat = Date.now()
    res.status(200).json({ ok: true })
  } else {
    res.status(405).end()
  }
}
