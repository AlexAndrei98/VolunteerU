import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewEvent from '@/components/NewEvent'
import ViewEvent from '@/components/ViewEvent'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'newEvent',
      component: NewEvent
    },
    {
      path: '/view',
      name: 'viewEvent',
      component: ViewEvent
    }
  ]
})
