<template>
  <div id="app">
    <Navbar />
    <div class= "container" >
    <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Dialog from './components/Dialog'

export default {
  components: {
    Navbar,
    'dialog' : Dialog
  },
    data () {
      return {
        sideNav: false
      }
    },
  name: 'App',
  computed: {
      menuItems () {
        let menuItems = [
          // {icon: 'face', title: 'Sign up', link: '/signup'},
          {icon: 'lock_open', title: 'Sign in', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'person', title: 'Mar', link: '/'}
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
