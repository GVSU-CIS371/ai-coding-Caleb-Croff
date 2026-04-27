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


## Prompts Used

1. Create a Vue + Vite app in this directory
2. Now please read the file instructions.md and come up with a plan to create this webpage.
3. Everything looks good, but don't worry about deployment. I will simply do npm run build and npm run deploy to deploy to github pages.
4. I updated the .env.example file to just be .env and put in the API key
5. What features would really make this app pop?
6. Lets do the news feed on the home page
7. I would like to have news show up without having to search. Right now the home page is very empty.
8. Can you change the name of this site to "Tickr"
9. What are your suggestions to make this homepage look better?
10. Please implement all of those suggestions.
11. Now when you search for a ticker, the results show up under the market bar, which is easy to miss and seems like the search did not work. I think if you search a stock, it should take you to its own page with news related to that ticker and show the price and maybe a graph.
12. When searching I get the error "Failed to load stock data."
13. That works better. The chart says "Chart data unavailable" though
14. It still says "Chart data unavailable" on localhost. Are there any other options or should we stop trying for graphs
15. Now, when you type in a ticker, I would like to see a drop down of matching tickers, so you can click on one. Since people may not remember a ticker exactly
16. Now please edit the README to include: which AI tools you used, which stock data service or API you used, which features are working, which features are incomplete, any deployment limitations or API issues you encountered
17. Now please make broad git commits of all of these changes
18. Can you make npm run deploy work?
19. Is there anything we missed in the instructions.md file? Don't make changes yet if so

