const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY
const BASE = 'https://finnhub.io/api/v1'

export async function searchSymbols(query) {
  const res = await fetch(`${BASE}/search?q=${encodeURIComponent(query)}&token=${API_KEY}`)
  if (!res.ok) throw new Error('Failed to search symbols')
  const data = await res.json()
  return (data.result ?? []).filter(r => r.type === 'Common Stock' || r.type === 'ETP')
}

export async function fetchQuote(symbol) {
  const res = await fetch(`${BASE}/quote?symbol=${symbol}&token=${API_KEY}`)
  if (!res.ok) throw new Error('Failed to fetch quote')
  return res.json()
}

export async function fetchProfile(symbol) {
  const res = await fetch(`${BASE}/stock/profile2?symbol=${symbol}&token=${API_KEY}`)
  if (!res.ok) throw new Error('Failed to fetch profile')
  return res.json()
}

export async function fetchCandles(symbol, days = 90) {
  const to = Math.floor(Date.now() / 1000)
  const from = to - days * 24 * 60 * 60
  const res = await fetch(`${BASE}/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=${API_KEY}`)
  if (!res.ok) throw new Error('Failed to fetch candles')
  return res.json()
}

export async function fetchMarketNews() {
  const res = await fetch(`${BASE}/news?category=general&token=${API_KEY}`)
  if (!res.ok) throw new Error('Failed to fetch market news')
  return res.json()
}

export async function fetchNews(symbol) {
  const to = new Date()
  const from = new Date()
  from.setDate(from.getDate() - 7)
  const fmt = d => d.toISOString().split('T')[0]
  const res = await fetch(`${BASE}/company-news?symbol=${symbol}&from=${fmt(from)}&to=${fmt(to)}&token=${API_KEY}`)
  if (!res.ok) throw new Error('Failed to fetch news')
  return res.json()
}
