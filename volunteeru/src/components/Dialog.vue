<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
<!-- 
        <div class="fixed-action-btn">
          <v-btn slot="activator" class="btn-floating btn-large green">
            <i class ="fa fa-plus"></i>        
        </v-btn>
        </div> -->
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>New Upcoming Events</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="show = false">Done</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>Based on your interest in: Nature {{somethingcool}}</v-subheader>
        </v-list>


        <v-divider></v-divider>


        <v-list three-line subheader>
          <v-subheader>Based on your interest in: Technology{{somethingcool}}</v-subheader>
        </v-list>
        
        
        <v-divider></v-divider>


        <v-list three-line subheader>
          <v-subheader>Based on your interest in: Pets{{somethingcool}}</v-subheader>
        </v-list>

      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
  props: {
     value: Boolean
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    },
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false
      }
    }
  }
}
</script>

