 <template>
  <v-toolbar extended dark class="primary" color="green"> 
      <v-avatar v-if="userIsAuthenticated">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="Logo">
      </v-avatar>
      <v-toolbar-title v-if="userIsAuthenticated">{{user.email}}</v-toolbar-title>
        <v-toolbar-title v-else >
        <router-link  to="/dashboard" tag="span" style="cursor: pointer">VolunteerU</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title v-if=userIsAuthenticated> Total Points: 100 </v-toolbar-title>
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
        menuItems = [{}];
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
          // console.log(data)
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
