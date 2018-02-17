import Vue from 'vue'
import Router from 'vue-router'

import CitizenPage from '@/components/pages/CitizenPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/citizen',
      name: 'citizen',
      component: CitizenPage
    }
  ]
})
