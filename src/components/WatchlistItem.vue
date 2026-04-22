<script setup>
import { ref, onMounted, computed } from 'vue'
import { fetchQuote, fetchProfile } from '../api/finnhub'
import { useWatchlistStore } from '../stores/watchlist'

const props = defineProps({
  symbol: String,
})

const store = useWatchlistStore()

const quote = ref(null)
const profile = ref(null)
const loading = ref(true)
const error = ref(false)

const positive = computed(() => (quote.value?.d ?? 0) >= 0)

onMounted(async () => {
  try {
    ;[quote.value, profile.value] = await Promise.all([
      fetchQuote(props.symbol),
      fetchProfile(props.symbol),
    ])
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="watchlist-item">
    <div v-if="loading" class="loading">Loading {{ symbol }}…</div>
    <div v-else-if="error" class="error">Failed to load {{ symbol }}</div>
    <template v-else>
      <div class="item-info">
        <span class="ticker">{{ symbol }}</span>
        <span class="name">{{ profile?.name || '—' }}</span>
      </div>
      <div class="item-price">
        <span class="price">${{ quote?.c?.toFixed(2) ?? '—' }}</span>
        <span class="change" :class="positive ? 'up' : 'down'">
          {{ positive ? '+' : '' }}{{ quote?.d?.toFixed(2) }}
          ({{ positive ? '+' : '' }}{{ quote?.dp?.toFixed(2) }}%)
        </span>
      </div>
      <button class="remove-btn" @click="store.removeStock(symbol)">Remove</button>
    </template>
  </div>
</template>

<style scoped>
.watchlist-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.loading,
.error {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.error { color: var(--red); }

.item-info {
  flex: 1;
}

.ticker {
  display: block;
  font-weight: 700;
  font-size: 1rem;
  color: var(--text);
}

.name {
  display: block;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.item-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.price {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
}

.change {
  font-size: 0.85rem;
  font-weight: 500;
}

.up { color: var(--green); }
.down { color: var(--red); }

.remove-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.15s;
}

.remove-btn:hover {
  border-color: var(--red);
  color: var(--red);
}
</style>
