<script setup>
import { ref, onMounted } from 'vue'
import { fetchMarketNews } from '../api/finnhub'
import NewsFeed from '../components/NewsFeed.vue'
import MarketBar from '../components/MarketBar.vue'
import SearchBar from '../components/SearchBar.vue'

const news = ref([])

onMounted(async () => {
  try {
    news.value = await fetchMarketNews()
  } catch {
    // best-effort
  }
})
</script>

<template>
  <main class="home">
    <div class="hero">
      <SearchBar />
    </div>

    <MarketBar />

    <NewsFeed v-if="news.length > 0" :articles="news" heading="Market News" />
  </main>
</template>

<style scoped>
.home {
  max-width: 700px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
}

.hero {
  margin-bottom: 1.5rem;
}
</style>
