[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/SI3SuuUn)
# Project Details

Hello students!

For detailed instructions and requirements for this Hackathon, please click the link below:

[Details](https://gvsu-cis371.github.io/projects/hackathon.html)

Please read all instructions carefully before starting your work. If you have any questions, feel free to ask.

Happy coding!

---

# Tickr — Development Note

## AI Tools Used

- **Claude (Anthropic)** — primary tool used for planning, code generation, debugging, and UI design throughout the project

## Stock Data Service

- **Finnhub** (`finnhub.io`) — used for live stock quotes, company profiles, symbol search, and company/market news
- **TradingView Embed Widget** — used for the interactive stock price chart (no API key required)

## Features Working

- Live stock quote lookup (price, change, % change, last updated)
- Symbol search with autocomplete dropdown (search by ticker or company name)
- Dedicated stock detail page with company info and exchange badge
- Interactive 3-month price chart via TradingView embedded widget
- Company news feed on the stock detail page
- General market news feed on the home page (loads on arrival)
- Market summary bar showing live S&P 500 (SPY), NASDAQ (QQQ), and DOW (DIA) prices
- Watchlist — add/remove stocks, persisted to localStorage across sessions
- Navigation between Search and Watchlist pages
- Built with Vue 3, Vue Router, and Pinia

## Features Incomplete

- Portfolio mode (shares owned, buy price, gain/loss tracking) — not implemented
- Auto-refreshing prices on the watchlist page
- Price flash animation when watchlist prices update

## Deployment Limitations / API Issues

- The Finnhub free tier does not include the `/stock/candle` historical OHLCV endpoint, so a self-hosted chart could not be built — TradingView's free embed widget was used as a replacement
- Yahoo Finance's chart API was attempted but blocked by CORS in the browser
- Finnhub's free tier is rate-limited to 60 API calls/minute; loading a large watchlist may approach this limit since each item fetches a quote and profile independently
- The Finnhub API key is stored in a `.env` file and exposed to the client via `VITE_FINNHUB_API_KEY` — this is acceptable for a prototype but the key should be treated as public
