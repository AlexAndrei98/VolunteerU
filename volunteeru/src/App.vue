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
  name: 'App',
  components: {
    Navbar,
    'dialog' : Dialog
  }
}
</script>
