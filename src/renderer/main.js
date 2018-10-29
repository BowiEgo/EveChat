import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import SocketIO from './util/socket'

import Dialogue from '@/components/Dialogue'

import Icon from 'vue-svg-icon/Icon.vue'
Vue.component('icon', Icon)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.prototype.$customStore = {}
Vue.prototype.$socketIO = new SocketIO()
Vue.config.productionTip = false

Vue.use(Dialogue)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
