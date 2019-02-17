 <template>
  <!-- <v-toolbar
      color="green"
      dark
      extended
    >  
      <v-avatar>
        <img
          src="https://cdn.vuetifyjs.com/images/john.jpg"
          alt="John"
        >
      </v-avatar>
      <v-toolbar-title>{{}}</v-toolbar-title>


      <v-spacer></v-spacer>

      <v-toolbar-title>Total Points: 120</v-toolbar-title>

  </v-toolbar>-->
  <v-toolbar extended dark class="primary" color="green">
    <!-- <v-toolbar-title>
        <router-link to="/dashboard" tag="span" style="cursor: pointer">VolunteerU</router-link>
    </v-toolbar-title>-->
    <div v-if="userIsAuthenticated">
      <v-avatar>
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="Logo">
      </v-avatar>
      <v-toolbar-title>marouen</v-toolbar-title>


    <v-spacer></v-spacer>

    <v-toolbar-title>Total Points: 120</v-toolbar-title>
        </div>
        
    <v-toolbar-items class="hidden-xs-only">
      <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
        <v-icon left dark>{{ item.icon }}</v-icon>

        {{ item.title }}
      </v-btn>
      <v-btn v-if="userIsAuthenticated" flat @click="onLogout">
        <v-icon left dark>exit_to_app</v-icon>

        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

    <script>
import db from "./firebaseInit";
import * as firebase from 'firebase';

export default {
  data() {
    return {
      events: [],
      users: []
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "face", title: "Sign up", link: "/signup" },
        { icon: "lock_open", title: "Sign in", link: "/signin" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [{ icon: "person", title: "Mar", link: "/dashboard" }];
      }
      return menuItems;
    },
    user () {
        return this.$store.getters.user
      },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  },
  created() {
    db.collection("Users")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            username: doc.data().username,
            points: doc.data().points,
            isAdmin: doc.data().isAdmin,
            interests: doc.data().interests,
            eventsRegistered: doc.data().events_registered
          };
          this.events.push(data);
          console.log(this.user)
        });
      });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });
  },

};
</script>

<style lang="stylus">
@import '../stylus/main';
</style>
