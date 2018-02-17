import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/components/pages/HomePage'
import GovernmentHomePage from '@/components/pages/GovernmentHomePage'
import CitizenPage from '@/components/pages/CitizenPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    }, {
      path: '/government',
      name: 'government portal',
      component: GovernmentHomePage
    }, {
      path: '/citizen',
      name: 'citizen page',
      component: CitizenPage
    }
  ]
})
