import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import SocketIO from './socket'

import Dialogue from '@/components/Dialogue'
import MessageBlur from '@/components/MessageBlur'

// import './assets/styles/color.scss'

import Icon from 'vue-svg-icon/Icon.vue'
Vue.component('icon', Icon)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.prototype.$customStore = {}
Vue.prototype.$socketIO = new SocketIO()
Vue.config.productionTip = false

Vue.use(Dialogue)
Vue.use(MessageBlur)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
