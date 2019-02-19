<template>
<div>
  <h3> Events you signed up for </h3>
      <v-container fluid grid-list-sm>
       <v-layout row wrap>
      <v-card v-for="event in events" v-bind:key = event.id style="margin-right:10px; margin-top:20px;" width="45vh">

        <v-card-title primary-title>
          <div>
            <div class="headline">{{event.title}}</div>
            <span class="grey--text">Length: {{event.length}} hrs</span>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat>Learn More</v-btn>
          <v-btn v-if="userRegistered" flat color="blue">Register</v-btn>
          <v-btn v-else flat color="red" @click="deleteEvent(event)">Unregister</v-btn>
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
        <dialogBox v-model="showDialog" />
        </div>
    </footer>
         <h3> D3.JS Visualizations </h3>
         <div>
           <img src="../assets/ciao.png" alt="Italian Trulli" height="600px">

           </div>
    </div>
</template>

    <script>
    
        import db from './firebaseInit'
        import Dialog from '../components/Dialog'
        import * as firebase from 'firebase';

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
                        const data = {
                            'id' : doc.data().id,
                            'title' : doc.data().title,
                            'length' : doc.data().length,
                            'description' : doc.data().description,
                            'users' : doc.data().users
                        }
                        this.events.push(data)
                    });
                })
                firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                  this.$store.dispatch('autoSignIn', user)
                  }
                })
              },
              methods: {
                deleteEvent (e) {
         
          db.collection('Events').where('title', '==', e.title ).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              
            })
            this.populate()
          })
      },
      populate (){
        this.events=[]
                db.collection('Events').get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        const data = {
                            'id' : doc.data().id,
                            'title' : doc.data().title,
                            'length' : doc.data().length,
                            'description' : doc.data().description,
                            'users' : doc.data().users
                        }
                        this.events.push(data)
                    });
                })
                firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                  this.$store.dispatch('autoSignIn', user)
                  }
                })
              }
     }
  }
 </script>