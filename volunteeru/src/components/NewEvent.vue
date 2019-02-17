<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card  v-for="event in events" v-bind:key="event.id" style="margin-top:20px;">
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
              <v-btn v-if="userRegistered" flat color="blue">Register</v-btn>
              <v-btn v-else flat color="red">Unregister</v-btn>
            </v-card-actions>
          </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
import axios from "axios";

export default {
  name: "newEvent",
  props: {
     value: Boolean
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    },
  },
  data() {
    return {
      events: [],
      userRegistered: true
    };
  },
  methods: {
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
          console.log;
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
          console.log;
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
    }
  },
  created() {
    this.getEvents("nature");
    // console.log(this.events.length)
  }
};
</script>

