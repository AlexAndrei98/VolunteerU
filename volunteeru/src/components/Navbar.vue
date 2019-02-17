 <template>
    <v-toolbar
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

  <!-- <v-btn large color="green"><p class="font-weight-normal">Volunteer U</p> -->
  
      
  
      <v-spacer></v-spacer>

      <v-toolbar-title>Total Points: 120</v-toolbar-title>

    </v-toolbar>

  </template>


    <script>
        import db from './firebaseInit'

        export default {
            name: 'Navbar',
            data() {
                return {
                    users: []
                }
            },
            created () {
                db.collection('Users').get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        console.log(doc.data())
                        const data = {
                            'id' : doc.data().id,
                            'username' : doc.data().username
                            // 'length' : doc.data().length,
                            // 'description' : doc.data().description,
                            // 'users' : doc.data().users
                        }
                        this.users.push(data)
                    });
                })
            }
        }
        
    </script>
