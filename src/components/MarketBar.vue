<script setup>
import { ref, onMounted } from 'vue'
import { fetchQuote } from '../api/finnhub'

const indices = [
  { symbol: 'SPY',  label: 'S&P 500' },
  { symbol: 'QQQ',  label: 'NASDAQ' },
  { symbol: 'DIA',  label: 'DOW' },
]

const quotes = ref({})

onMounted(async () => {
  const results = await Promise.allSettled(indices.map(i => fetchQuote(i.symbol)))
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') quotes.value[indices[i].symbol] = r.value
  })
})
</script>

<template>
  <div class="market-bar">
    <div
      v-for="index in indices"
      :key="index.symbol"
      class="market-item"
    >
      <span class="market-label">{{ index.label }}</span>
      <template v-if="quotes[index.symbol]">
        <span class="market-price">${{ quotes[index.symbol].c.toFixed(2) }}</span>
        <span
          class="market-change"
          :class="quotes[index.symbol].d >= 0 ? 'up' : 'down'"
        >
          {{ quotes[index.symbol].d >= 0 ? '+' : '' }}{{ quotes[index.symbol].d.toFixed(2) }}
          ({{ quotes[index.symbol].dp >= 0 ? '+' : '' }}{{ quotes[index.symbol].dp.toFixed(2) }}%)
        </span>
      </template>
      <span v-else class="market-loading">—</span>
    </div>
  </div>
</template>

<style scoped>
.market-bar {
  display: flex;
  gap: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.market-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 1rem;
  gap: 0.2rem;
  border-right: 1px solid var(--border);
}

.market-item:last-child {
  border-right: none;
}

.market-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.market-price {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
}

.market-change {
  font-size: 0.8rem;
  font-weight: 500;
}

.market-loading {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.up { color: var(--green); }
.down { color: var(--red); }
</style>
