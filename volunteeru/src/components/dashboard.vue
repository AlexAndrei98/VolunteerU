<template>
<div>
      <v-container fluid grid-list-sm>
       <v-layout row wrap>
      <v-card v-for="event in events" v-bind:key = event.id style="margin-right:10px; margin-top:20px;">
        <v-img
          class= "purple darken-2"
          height="200px"
          width="345px"
        >
        </v-img>

        <v-card-title primary-title>
          <div>
            <div class="headline">{{event.title}}</div>
            <span class="grey--text">Length: {{event.length}} hrs</span>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat>Learn More</v-btn>
          <v-btn v-if="userRegistered" flat color="blue">Register</v-btn>
          <v-btn v-else flat color="red">Unregister</v-btn>
        </v-card-actions>
      </v-card>
          </v-layout>
        </v-container>
    <footer>
        <div class="fixed-action-btn">
          <v-btn class = "btn-floating btn-large green"
          @click.stop="showDialog=true">
            <i class ="fa fa-plus"></i>        
        </v-btn>
        <Dialog v-model="showDialog" />
        </div>
    </footer>
    </div>
</template>

    <script>
        import db from './firebaseInit'
        import Dialog from '../components/Dialog'


        export default {
            name: 'dashboard',
            components: { Dialog },
            data() {
                return {
                    events: [],
                    showDialog: false
                }
            },
            created () {
                db.collection('Events').get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        console.log(doc.data())
                        const data = {
                            'id' : doc.data().id,
                            'title' : doc.data().title,
                            'length' : doc.data().length,
                            'description' : doc.data().description,
                            'users' : doc.data().users,
                            'img' : doc.data().img
                        }
                        this.events.push(data)
                    });
                })
            }
        }
        
    </script>
