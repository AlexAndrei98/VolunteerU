<template>
<div>
  <h3> Events you signed up for </h3>
      <v-container fluid grid-list-sm>
       <v-layout row wrap>
      <v-card v-for="event in events" v-bind:key = event.id style="margin-right:10px; margin-top:20px;" width="45vh">
        <!-- <v-img
          class= "purple darken-2"
          height="200px"
          width="345px"
        >
        </v-img> -->

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
              
              // this.$router.push('/')
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
//                 dropit(e) {
//                        console.log(e);
//                        console.log(this.events)
//                     for( var i = 0; i < this.events.length; i++){
//                       if ( this.events[i].title == e.title) 
//                         this.events.splice( this.events.indexOf(e), 1 );
//                         db.collection("Events").doc(e).delete().then(function() {
//     console.log("Document successfully deleted!");
// }).catch(function(error) {
//     console.error("Error removing document: ", error);
// });
//                     }
//                 }     
     }
  }
 </script>
