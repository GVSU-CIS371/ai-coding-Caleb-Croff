<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useWatchlistStore } from '../stores/watchlist'

const store = useWatchlistStore()
const count = computed(() => store.symbols.length)
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/" class="brand">Tickr</RouterLink>
    <div class="nav-links">
      <RouterLink to="/" class="nav-link">Search</RouterLink>
      <RouterLink to="/watchlist" class="nav-link">
        Watchlist
        <span v-if="count > 0" class="badge">{{ count }}</span>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 60px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.brand {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.15s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--text);
}

.badge {
  background: var(--accent);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}
</style>
