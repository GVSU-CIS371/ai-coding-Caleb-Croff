<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  symbol: String,
})

const container = ref(null)

function init() {
  container.value.innerHTML = ''
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
  script.async = true
  script.text = JSON.stringify({
    symbol: props.symbol,
    width: '100%',
    height: 400,
    theme: 'dark',
    style: '3',
    locale: 'en',
    hide_top_toolbar: false,
    hide_legend: true,
    save_image: false,
    calendar: false,
    hide_volume: true,
    support_host: 'https://www.tradingview.com',
  })
  container.value.appendChild(script)
}

onMounted(init)
watch(() => props.symbol, init)
</script>

<template>
  <div ref="container" class="tv-widget" />
</template>

<style scoped>
.tv-widget {
  width: 100%;
  min-height: 400px;
}
</style>
