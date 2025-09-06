// Minimal in-memory API to mimic the backend from the canvas.
let state = {
  enabled: false,
  dailyTradeLimit: 10,
  broker: '',
  accountId: '',
  todayTrades: 0,
  lifetimeTrades: 0,
  eaStatus: 'disconnected'
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(state)
  } else if (req.method === 'PUT') {
    const { enabled, dailyTradeLimit, broker, accountId } = req.body || {}
    if (typeof enabled === 'boolean') state.enabled = enabled
    if (typeof dailyTradeLimit === 'number') state.dailyTradeLimit = dailyTradeLimit
    if (typeof broker === 'string') state.broker = broker
    if (typeof accountId === 'string') state.accountId = accountId
    res.status(204).end()
  } else {
    res.status(405).end()
  }
}
