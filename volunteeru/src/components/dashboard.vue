<template>
<!-- <div id="dashboard">
<div class="col-6"> -->

<v-container fluid>
    <v-layout column>
      <v-flex v-for="event in events" v-bind:key = event.id style="margin-top:20px;"> 
          <v-layout>
      <v-card> 
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
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
          </v-btn>
        </v-card-actions>


        <v-slide-y-transition>
          <v-card-text v-show="show">
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </v-slide-y-transition>
      </v-card>

          </v-layout>
      </v-flex>
    </v-layout>
        <div class="fixed-action-btn">
        <router-link to="/new" class = "btn-floating btn-large green">
            <i class ="fa fa-plus"></i>
        </router-link>
        </div>
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
