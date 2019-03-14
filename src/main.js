import Vue from 'vue'
import App from './App'
import store from './store/store'
import Fly from 'flyio/dist/npm/wx'

Vue.config.productionTip = false
Vue.prototype.$store = store

let fly = new Fly
Vue.prototype.$fly = fly

App.mpType = 'app'

const app = new Vue(App)

app.$mount()
