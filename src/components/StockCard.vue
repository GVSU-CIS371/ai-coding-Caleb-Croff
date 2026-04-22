<script setup>
import { computed } from 'vue'
import { useWatchlistStore } from '../stores/watchlist'

const props = defineProps({
  symbol: String,
  name: String,
  price: Number,
  change: Number,
  changePercent: Number,
  updatedAt: Number,
})

const store = useWatchlistStore()
const watched = computed(() => store.isWatched(props.symbol))
const positive = computed(() => props.change >= 0)

const formattedTime = computed(() => {
  if (!props.updatedAt) return '—'
  return new Date(props.updatedAt * 1000).toLocaleTimeString()
})

function toggleWatch() {
  if (watched.value) {
    store.removeStock(props.symbol)
  } else {
    store.addStock(props.symbol)
  }
}
</script>

<template>
  <div class="stock-card">
    <div class="card-header">
      <div>
        <span class="ticker">{{ symbol }}</span>
        <span class="company-name">{{ name || '—' }}</span>
      </div>
      <button class="watch-btn" :class="{ active: watched }" @click="toggleWatch">
        {{ watched ? '★ Watching' : '☆ Watch' }}
      </button>
    </div>

    <div class="card-body">
      <span class="price">${{ price?.toFixed(2) ?? '—' }}</span>
      <span class="change" :class="positive ? 'up' : 'down'">
        {{ positive ? '+' : '' }}{{ change?.toFixed(2) }}
        ({{ positive ? '+' : '' }}{{ changePercent?.toFixed(2) }}%)
      </span>
    </div>

    <div class="card-footer">
      Last updated: {{ formattedTime }}
    </div>
  </div>
</template>

<style scoped>
.stock-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 480px;
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.ticker {
  display: block;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text);
}

.company-name {
  display: block;
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-top: 2px;
}

.watch-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 0.35rem 0.85rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
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

.card-body {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.price {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
}

.change {
  font-size: 1rem;
  font-weight: 500;
}

.up { color: var(--green); }
.down { color: var(--red); }

.card-footer {
  font-size: 0.8rem;
  color: var(--text-muted);
}
</style>
