// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import VotePlugin from './plugins/VotePlugin'

// register our serviceWorker
if ('serviceWorker' in navigator) {
  runtime.register().then(registration => {
    console.info(`[ServiceWorker] Registration successful (scope: ${registration.scope})`)
  }).catch(error => {
    console.error(`[ServiceWorker] Error: ${error.message}`)
  })
}

Vue.use(VotePlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
