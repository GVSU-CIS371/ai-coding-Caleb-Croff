import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWatchlistStore = defineStore('watchlist', () => {
  const symbols = ref(JSON.parse(localStorage.getItem('watchlist') || '[]'))

  function addStock(symbol) {
    const upper = symbol.toUpperCase()
    if (!symbols.value.includes(upper)) {
      symbols.value.push(upper)
      persist()
    }
  }

  function removeStock(symbol) {
    symbols.value = symbols.value.filter(s => s !== symbol)
    persist()
  }

  function isWatched(symbol) {
    return symbols.value.includes(symbol.toUpperCase())
  }

  function persist() {
    localStorage.setItem('watchlist', JSON.stringify(symbols.value))
  }

  return { symbols, addStock, removeStock, isWatched }
})
