<template>
<!-- <div id="dashboard">
<div class="col-6"> -->

<v-container fluid>
    <v-layout column>
      <v-flex xs5 v-for="event in events" v-bind:key = event.id style="margin-top:20px;"> 
        <div class="resultContainer">
          <v-layout>
      <v-card > 
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
          width="300px"
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
        </div>
      </v-flex>
    </v-layout>
  </v-container>
 
</template>

    <script>
        import db from './firebaseInit'
        export default {
            name: 'dashboard',
            data() {
                return {
                    events: []
                    
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
