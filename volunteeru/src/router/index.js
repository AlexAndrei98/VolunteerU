import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Dialog from '@/components/Dialog'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import adminDash from '@/components/adminDash'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: AuthGuard
    },
    {
      path: '/admin',
      name: 'admin',
      component: adminDash,
      beforeEnter: AuthGuard
    },
    {
      path: '/',
      name: 'Dialog',
      component: Dialog
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ],
  mode: 'history'
  
})
