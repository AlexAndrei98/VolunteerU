<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>New Upcoming Events</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <a href="/dashboard"><v-btn dark flat @click="show = false ; populate()">Done</v-btn></a>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>
            <h3>Based on your interest in: Nature {{}}</h3>
          </v-subheader>
          <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-card
                v-for="event in events"
                v-bind:key="event.id"
                style="margin:5px; margin-top:5vh;"
                width="45vh"
              >
                <!-- <v-img
          class= "purple darken-2"
          height="200px"
          width="345px"
        >
                </v-img>-->
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{event.title}}</div>
                    <span
                      class="grey--text"
                    >Length: {{event.length.toFixed(2)}} hrs Date: {{event.date.toLocaleDateString()}}</span>
                  </div>
                </v-card-title>

                <v-card-text>{{event.description.slice(0,200).concat("", "...")}}</v-card-text>
                <v-card-actions>
                  <v-btn flat>Learn More</v-btn>
                  <v-btn flat color="blue" @click="add(event)">Register</v-btn>
                </v-card-actions>
              </v-card>
            </v-layout>
          </v-container>
        </v-list>

        <v-divider></v-divider>

        <v-list three-line subheader>
          <v-subheader>Based on your interest in: Technology{{}}</v-subheader>
        </v-list>

        <v-divider></v-divider>

        <v-list three-line subheader>
          <v-subheader>Based on your interest in: Pets{{}}</v-subheader>
        </v-list>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
import axios from "axios";
import db from "./firebaseInit";
import * as firebase from 'firebase'

export default {
  name: "dialog",
  props: {
    value: Boolean
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  data() {
    return {
      dialog: false,
      events: [],
      userRegistered: true
    };
  },
  methods: {
    populate (){
        // this.events=[]
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
              ,
    add(event) {
      db.collection("Events")
        .add({
          title: event.title,
          length: event.length,
          description: event.description
          // date: new Date(event.local)
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
        this.events.splice( this.events.indexOf(event), 1 );
    },
    getEvents(topic) {
      const apiKey = "H3GRCF3QTFHEFSUIYHWU";
      // const url = 'https://www.eventbriteapi.com/v3/categories/'
      const url =
        "https://www.eventbriteapi.com/v3/events/search/?q=" +
        topic +
        "&location.address=The+Gateway+Arch%2C+St.+Louis%2C+MO+63102&categories=111&token=" +
        apiKey;
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + apiKey,
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          this.events = [];
          for (let event of res.data.events) {
            const data = {
              id: event.id,
              title: event.name.text,
              length:
                (new Date(event.end.local) - new Date(event.start.local)) /
                360000,
              description: event.description.text,
              date: new Date(event.start.local),
              color: "red"
            };
            this.events.push(data);
          }
        });
    },
    getEvents1(topic) {
      const apiKey = "H3GRCF3QTFHEFSUIYHWU";
      // const url = 'https://www.eventbriteapi.com/v3/categories/'
      const url =
        "https://www.eventbriteapi.com/v3/events/search/?q=" +
        topic +
        "&location.address=The+Gateway+Arch%2C+St.+Louis%2C+MO+63102&categories=111&token=" +
        apiKey;
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + apiKey,
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          this.events = [];
          for (let event of res.data.events) {
            const data = {
              id: event.id,
              title: event.name.text,
              length:
                (new Date(event.end.local) - new Date(event.start.local)) /
                360000,
              description: event.description.text,
              date: new Date(event.end.local)
            };
            this.events1.push(data);
          }
        });
    },

  },
  created() {
    this.getEvents("nature");
  }
};
</script>

