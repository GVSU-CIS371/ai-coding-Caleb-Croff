<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { searchSymbols } from '../api/finnhub'

const router = useRouter()

const input = ref('')
const results = ref([])
const open = ref(false)
const loading = ref(false)
const activeIndex = ref(-1)

let debounceTimer = null

watch(input, val => {
  clearTimeout(debounceTimer)
  activeIndex.value = -1

  if (!val.trim()) {
    results.value = []
    open.value = false
    return
  }

  loading.value = true
  debounceTimer = setTimeout(async () => {
    try {
      results.value = (await searchSymbols(val.trim())).slice(0, 7)
      open.value = results.value.length > 0
    } catch {
      results.value = []
    } finally {
      loading.value = false
    }
  }, 300)
})

function select(symbol) {
  input.value = ''
  results.value = []
  open.value = false
  router.push(`/stock/${symbol}`)
}

function onSubmit() {
  const sym = input.value.trim().toUpperCase()
  if (!sym) return
  select(sym)
}

function onKeydown(e) {
  if (!open.value) return
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, results.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, -1)
  } else if (e.key === 'Enter' && activeIndex.value >= 0) {
    e.preventDefault()
    select(results.value[activeIndex.value].symbol)
  } else if (e.key === 'Escape') {
    open.value = false
  }
}

function onBlur() {
  setTimeout(() => { open.value = false }, 150)
}

onBeforeUnmount(() => clearTimeout(debounceTimer))
</script>

<template>
  <div class="search-wrap">
    <form class="search-form" @submit.prevent="onSubmit">
      <div class="input-wrap">
        <input
          v-model="input"
          class="search-input"
          type="text"
          placeholder="Search by ticker or company name…"
          autocomplete="off"
          spellcheck="false"
          @keydown="onKeydown"
          @blur="onBlur"
          @focus="open = results.length > 0"
        />
        <div v-if="open" class="dropdown">
          <button
            v-for="(item, i) in results"
            :key="item.symbol"
            class="dropdown-item"
            :class="{ active: i === activeIndex }"
            type="button"
            @mousedown.prevent="select(item.symbol)"
          >
            <span class="item-symbol">{{ item.displaySymbol }}</span>
            <span class="item-name">{{ item.description }}</span>
          </button>
        </div>
      </div>
      <button class="search-btn" type="submit">Search</button>
    </form>
  </div>
</template>

<style scoped>
.search-wrap {
  position: relative;
}

.search-form {
  display: flex;
  gap: 0.75rem;
}

.input-wrap {
  flex: 1;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 0.85rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  font-size: 1.1rem;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.search-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(79, 126, 247, 0.15);
}

.dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  z-index: 50;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.7rem 1rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border);
  color: var(--text);
  cursor: pointer;
  text-align: left;
  transition: background 0.1s;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover,
.dropdown-item.active {
  background: var(--border);
}

.item-symbol {
  font-weight: 700;
  font-size: 0.95rem;
  min-width: 60px;
  color: var(--text);
}

.item-name {
  font-size: 0.85rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-btn {
  padding: 0.85rem 1.75rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
  white-space: nowrap;
}

.search-btn:hover {
  opacity: 0.85;
}
</style>
