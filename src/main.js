import Vue from 'vue'
import App from './App'
import store from './store'
import Habbit from 'pages/index/habit/habit.vue'
import Home from 'pages/index/home/home.vue'
import BottonNavigation from 'components/BottomNavigation.vue'

Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
