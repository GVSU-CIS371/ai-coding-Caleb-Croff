import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WatchlistView from '../views/WatchlistView.vue'
import StockView from '../views/StockView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/watchlist', component: WatchlistView },
    { path: '/stock/:symbol', component: StockView },
  ],
})
