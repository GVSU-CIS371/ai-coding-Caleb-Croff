<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { fetchQuote, fetchProfile, fetchNews } from '../api/finnhub'
import { useWatchlistStore } from '../stores/watchlist'
import StockChart from '../components/StockChart.vue'
import NewsFeed from '../components/NewsFeed.vue'

const route = useRoute()
const store = useWatchlistStore()

const symbol = route.params.symbol.toUpperCase()

const quote = ref(null)
const profile = ref(null)
const news = ref([])
const loading = ref(true)
const error = ref('')

const positive = computed(() => (quote.value?.d ?? 0) >= 0)
const watched = computed(() => store.isWatched(symbol))

function toggleWatch() {
  watched.value ? store.removeStock(symbol) : store.addStock(symbol)
}

onMounted(async () => {
  try {
    const [q, p] = await Promise.all([
      fetchQuote(symbol),
      fetchProfile(symbol),
    ])

    if (!q.c) {
      error.value = `No data found for "${symbol}". Check the ticker symbol.`
      return
    }

    quote.value = q
    profile.value = p
  } catch {
    error.value = 'Failed to load stock data.'
    return
  } finally {
    loading.value = false
  }

  const newsResult = await fetchNews(symbol).catch(() => [])
  news.value = newsResult
})
</script>

<template>
  <main class="stock-view">
    <RouterLink to="/" class="back-link">← Back</RouterLink>

    <div v-if="loading" class="state-msg">Loading {{ symbol }}…</div>
    <div v-else-if="error" class="state-msg error">{{ error }}</div>

    <template v-else>
      <div class="stock-header">
        <div class="stock-identity">
          <h1 class="stock-symbol">{{ symbol }}</h1>
          <span class="stock-name">{{ profile?.name || '—' }}</span>
          <span v-if="profile?.exchange" class="stock-exchange">{{ profile.exchange }}</span>
        </div>
        <div class="stock-price-block">
          <span class="stock-price">${{ quote.c.toFixed(2) }}</span>
          <span class="stock-change" :class="positive ? 'up' : 'down'">
            {{ positive ? '+' : '' }}{{ quote.d.toFixed(2) }}
            ({{ positive ? '+' : '' }}{{ quote.dp.toFixed(2) }}%)
          </span>
        </div>
        <button class="watch-btn" :class="{ active: watched }" @click="toggleWatch">
          {{ watched ? '★ Watching' : '☆ Watch' }}
        </button>
      </div>

      <div class="chart-wrapper">
        <StockChart :symbol="symbol" />
      </div>

      <NewsFeed v-if="news.length" :articles="news" :heading="`${symbol} News`" />
      <p v-else class="state-msg muted">No recent news found.</p>
    </template>
  </main>
</template>

<style scoped>
.stock-view {
  max-width: 860px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.back-link {
  display: inline-block;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  transition: color 0.15s;
}

.back-link:hover {
  color: var(--text);
}

.stock-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.stock-identity {
  flex: 1;
  min-width: 0;
}

.stock-symbol {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text);
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stock-name {
  display: block;
  font-size: 0.95rem;
  color: var(--text-muted);
}

.stock-exchange {
  display: inline-block;
  margin-top: 0.35rem;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  background: var(--border);
  padding: 2px 7px;
  border-radius: 4px;
}

.stock-price-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.stock-price {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1;
}

.stock-change {
  font-size: 1rem;
  font-weight: 500;
}

.up { color: var(--green); }
.down { color: var(--red); }

.watch-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.15s;
  white-space: nowrap;
}

.watch-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.watch-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.chart-wrapper {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.state-msg {
  text-align: center;
  padding: 2rem 0;
  color: var(--text);
}

.state-msg.error { color: var(--red); }
.state-msg.muted { color: var(--text-muted); font-size: 0.9rem; }
</style>
