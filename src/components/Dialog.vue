<template>

  <v-layout row justify-center>
    <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>New Upcoming Events</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <a href="/dashboard">
              <v-btn dark flat @click="show = false ; populate()">Done</v-btn>
            </a>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>
            <h3>Based on your interest in: Nature </h3>
          </v-subheader>
          <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-card
                v-for="event in events"
                v-bind:key="event.id"
                style="margin:5px; margin-top:5vh;"
                width="45vh"
                color="#fff7e6"
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
                  <v-btn @click="yasuo(event)" flat>Learn More</v-btn>

                  <v-btn flat color="blue" @click="add(event)">Register</v-btn>
                </v-card-actions>
              </v-card>
            </v-layout>
          </v-container>
        </v-list>

        <v-divider></v-divider>

        <v-list three-line subheader>
          <v-subheader>            <h3>Based on your interest in: Technology </h3>
</v-subheader>

          <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-card
                v-for="event in events1"
                v-bind:key="event.id"
                style="margin:5px; margin-top:5vh;"
                width="45vh"
                color="#ccf2ff"
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
                  <v-btn @click="yasuo(event)" flat>Learn More</v-btn>

                  <v-btn flat color="blue" @click="add1(event)">Register</v-btn>
                </v-card-actions>
              </v-card>
            </v-layout>
          </v-container>
        </v-list>

        <v-divider></v-divider>

        <v-list three-line subheader>
          <v-subheader>            <h3>Based on your interest in: Pets </h3>
</v-subheader>
          <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-card
                v-for="event in events2"
                v-bind:key="event.id"
                style="margin:5px; margin-top:5vh;"
                width="45vh"
                color="#ffe6e6"
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
                  <v-btn @click="yasuo(event)" flat>Learn More</v-btn>

                  <v-btn flat color="blue" @click="add2(event)">Register</v-btn>
                </v-card-actions>
              </v-card>
            </v-layout>
          </v-container>
        </v-list>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script src="alert/dist/sweetalert-dev.js"></script>
<script>
import axios from "axios";
import db from "./firebaseInit";
import * as firebase from "firebase";
import swal from 'sweetalert';

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
      events1: [],
      events2: [],
      userRegistered: true
    };
  },
  methods: {
    yasuo(c) {
      swal({
        title: c.title,
        text: c.description,
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        closeOnConfirm: false,
        closeOnCancel: false,
        function(isConfirm) {
          if (isConfirm) {
            swal(
              "Registered for the event successfully!",
              "The humanity loves you, hmu for free donuts",
              "success"
            );
          } else {
            swal(
              "Not feeling so generous this afternoon?",
              "you can always donate money!",
              "error"
            );
          }
        }
      });
    },

    populate() {
      // this.events=[]
      db.collection("Events")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.data().id,
              title: doc.data().title,
              length: doc.data().length,
              description: doc.data().description,
              users: doc.data().users
            };
            this.events.push(data);
          });
        });
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.$store.dispatch("autoSignIn", user);
        }
      });
    },
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
      this.events.splice(this.events.indexOf(event), 1);
    },

    add1(event) {
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
      this.events1.splice(this.events1.indexOf(event), 1);
    },
    add2(event) {
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
      this.events2.splice(this.events2.indexOf(event), 1);
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
            if (this.events.length < 12) {
             this.events.push(data);
           }
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
          this.events1 = [];
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
            if (this.events1.length < 12) {
             this.events1.push(data);
           }
          }
        });
    },
    getEvents2(topic) {
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
          this.events2 = [];
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
            if (this.events2.length < 12) {
             this.events2.push(data);
           }
          }
        });
    }
  },
  created() {
    this.getEvents("nature");
    this.getEvents1("technology");
    this.getEvents2("pets");
  }
};
</script>

<style>

.h1head
{
    text-align: left;
    text-transform:uppercase;
    background-color: #F0F0F0;
    color: #355681; 
}
.topdiv{
    text-align: center;
    background-color: #2B5F8E;
    color: #FEFDF9; 
    font-size:30px;
    margin:0px;
    padding-top: 2px;
    border:1px solid;
    height:40px;
    font-family:  sans-serif, Verdana;
    border-radius: 10px;
}
table {
    width:100%;
}
table td{
    width:50%;
    padding-top:2px;
    padding-left:10px;
    border:0px solid;
    vertical-align: top;
}
textarea{
    border: 3px dotted #366B70;
    background-color:#FBE9AC;
	border-radius: 10px;
	height: 400px;
	width: 550px;
    font-size:15px;
    color:#366B70;
}
.indtd{
border-left:1px solid;
}

@media only screen and (max-width: 768px) {

.h1head
{
    text-align: left;
    text-transform:uppercase;
    background-color: #F0F0F0;
    color: #355681; 
    font-size:18px;
}  
textarea{
    width: 300px;
    height: 300px;
    border: 1px solid red;
    color: green;
    font-size:18px;
}
strong
{
    font-size:18px;
}
table td{
    font-size:18px;
}
}

@media only screen and (max-width: 480px) {

.h1head
{
    text-align: left;
    text-transform:uppercase;
    background-color: #F0F0F0;
    color: #355681; 
    font-size:18px;
}  
textarea{
    width: 200px;
    height: 250px;
    border: 1px solid red;
    color: green;
    font-size:18px;
}
strong
{
    font-size:18px;
}
table td{
    font-size:18px;
}
}    
</style>