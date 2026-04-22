<script setup>
import { useWatchlistStore } from '../stores/watchlist'
import WatchlistItem from '../components/WatchlistItem.vue'
import { RouterLink } from 'vue-router'

const store = useWatchlistStore()
</script>

<template>
  <main class="watchlist">
    <h1 class="page-title">My Watchlist</h1>

    <div v-if="store.symbols.length === 0" class="empty">
      <p>Your watchlist is empty.</p>
      <RouterLink to="/" class="empty-link">Search for stocks to add</RouterLink>
    </div>

    <div v-else class="list">
      <WatchlistItem
        v-for="symbol in store.symbols"
        :key="symbol"
        :symbol="symbol"
      />
    </div>
  </main>
</template>

<style scoped>
.watchlist {
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 2rem;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.empty {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-muted);
}

.empty p {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.empty-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
}

.empty-link:hover {
  text-decoration: underline;
}
</style>
