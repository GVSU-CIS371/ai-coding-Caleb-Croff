<script setup>
import { computed } from 'vue'

const props = defineProps({
  articles: Array,
  heading: { type: String, default: 'Recent News' },
})

const items = computed(() => props.articles.slice(0, 6))

function formatDate(ts) {
  return new Date(ts * 1000).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}
</script>

<template>
  <section class="news-feed">
    <h2 class="news-heading">{{ heading }}</h2>
    <div class="articles">
      <a
        v-for="article in items"
        :key="article.id"
        :href="article.url"
        target="_blank"
        rel="noopener noreferrer"
        class="article"
      >
        <img
          v-if="article.image"
          :src="article.image"
          :alt="article.headline"
          class="article-img"
        />
        <div class="article-body">
          <p class="article-headline">{{ article.headline }}</p>
          <div class="article-meta">
            <span class="article-source">{{ article.source }}</span>
            <span class="article-date">{{ formatDate(article.datetime) }}</span>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.news-feed {
  margin-top: 2rem;
  width: 100%;
}

.news-heading {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 1rem;
}

.articles {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.article {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  padding: 0.85rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  text-decoration: none;
  transition: border-color 0.15s;
}

.article:hover {
  border-color: var(--accent);
}

.article-img {
  width: 72px;
  height: 52px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
  background: var(--border);
}

.article-body {
  flex: 1;
  min-width: 0;
}

.article-headline {
  font-size: 0.9rem;
  color: var(--text);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 0.4rem;
}

.article-meta {
  display: flex;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.article-source {
  font-weight: 500;
}
</style>
