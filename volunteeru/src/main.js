// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './router'
import Vue from 'vue'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import Dialog from './components/Dialog'
import { store } from './store'
const AlertCmp = () => import('./components/Shared/Alert.vue')


Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('appAlert', AlertCmp)
Vue.component('dialogBox', Dialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
  
})
