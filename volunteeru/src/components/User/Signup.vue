<template>
  <v-container>

    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required></v-text-field>
                  </v-flex>
                </v-layout>


                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>


                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>

  <v-card flat>
    <v-card-text>
      <h5 class="center">The Three Most Meaningful Causes to You Are:</h5>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm6 md6>
              <v-checkbox id = "1" v-model="interests"
                label="Environment"
                color="green"
                value="Environment"
              ></v-checkbox>
              <v-checkbox id = "2" v-model="interests"
                label="Education"
                color="green"
                value="Education"
              ></v-checkbox>
              <v-checkbox id = "3" v-model="interests"
                label="Disaster Relief"
                color="green"
                value = "Disaster Relief"
              ></v-checkbox>      

          </v-flex>
          <v-flex xs12 sm6 md6>
              <v-checkbox id = "4" v-model="interests"
                label="Health"
                color="indigo"
                value = "Health"
              ></v-checkbox>
              <v-checkbox id = "5" v-model="interests"
                label="Hunger"
                color="indigo"
                value = "Hunger"
              ></v-checkbox>
              <v-checkbox id = "6" v-model="interests"
                label="Access to potable water"
                color="indigo"
                value = "Access to potable water"
              ></v-checkbox>      

          </v-flex>

                    <v-flex xs12 sm6 md6>
              <v-checkbox id = "7" v-model="interests"
                label="Women"
                color="yellow"
                value = "Women"
              ></v-checkbox>
              <v-checkbox id = "8" v-model="interests"
                label="Seniors"
                color="yellow"
                value = "Seniors"
              ></v-checkbox>
              <v-checkbox id = "9" v-model="interests"
                label="Veterans"
                color="yellow"
                value = "Veterans"
              ></v-checkbox>      

          </v-flex>
          <v-flex xs12 sm6 md6>
              <v-checkbox id = "10" v-model="interests"
                label="Disabled Individuals"
                color="red"
                value = "Disabled Individuals"
              ></v-checkbox>
              <v-checkbox id = "11" v-model="interests"
                label="Children"
                color="red"
                value = "Children"
              ></v-checkbox>
              <v-checkbox id = "12" v-model="interests"
                label="Physical Development"
                color="red"
                 value = "Physical Development"
              ></v-checkbox>      

          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>

                      <div class="text-xs-center">
                       <!-- <span>Checked names: {{ this.interests }}</span> -->
                    <v-btn  round type="submit" :disabled="loading" :loading="loading" @click="add()">
                      Sign up
                      <v-icon right>lock_open</v-icon>
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                    </v-btn>
                    </div>
                    <div class="text-xs-center">
                      <v-btn round color="red" dark :disabled="loading" :loading="loading" @click.prevent="onSigninGoogle">Login with Google
                        <v-icon right dark>lock_open</v-icon>
                        <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                      </v-btn>
                    </div>

                  </v-flex>
                </v-layout>
              </form>

            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
      data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        isAdmin : false,
        interests: [],
        eventsRegistered: [],
        ex6: ['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'red darken-3', 'indigo darken-3', 'orange darken-3']
      }
    },
      add() {
      this.userRegistered = true;
      db.collection("Users")
        .add({
            username: this.email,
            isAdmin: false,
            interests: this.interests,
            points: 0,
            events_registered: this.eventsRegistered
        })
        .then(function(docRef) {
          console.log(this.interests)
          console.log(data)

          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
  
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      },
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/dashboard')
        }
      }
    },
    methods: {
      onSignup () {
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      },
      onSigninGoogle () {
        this.$store.dispatch('signUserInGoogle')
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }

</script>
