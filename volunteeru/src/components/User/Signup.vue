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
            <v-radio-group v-model="ex6" column>
              <v-radio
                label="Disabled Individuals"
                color="red"
                value="1"
                required
              ></v-radio>
              <v-radio
                label="Children"
                color="red"
                value="2"
              ></v-radio>
              <v-radio
                label="Physical Development"
                color="red"
                value="3"
              ></v-radio>      
            </v-radio-group>
          </v-flex>
          <v-flex xs12 sm6 md6>
            <v-radio-group v-model="ex6" column>
              <v-radio
                label="Environment"
                color="green"
                value="1"
              ></v-radio>
              <v-radio
                label="Education"
                color="green"
                value="2"
              ></v-radio>
              <v-radio
                label="Disaster Relief"
                color="green"
                value="3"
              ></v-radio>      
            </v-radio-group>
          </v-flex>
          <v-flex xs12 sm6 md6>
            <v-radio-group v-model="ex6" column>
              <v-radio
                label="Health"
                color="indigo"
                value="1"
              ></v-radio>
              <v-radio
                label="Hunger"
                color="indigo"
                value="2"
              ></v-radio>
              <v-radio
                label="Access to potable water"
                color="indigo"
                value="3"
              ></v-radio>      
            </v-radio-group>
          </v-flex>
                    <v-flex xs12 sm6 md6>
            <v-radio-group v-model="ex6" column>
              <v-radio
                label="Women"
                color="yellow"
                value="1"
              ></v-radio>
              <v-radio
                label="Seniors"
                color="yellow"
                value="2"
              ></v-radio>
              <v-radio
                label="Veterans"
                color="yellow"
                value="3"
              ></v-radio>      
            </v-radio-group>
          </v-flex>

        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>

                      <div class="text-xs-center">
                    <v-btn round type="submit" :disabled="loading" :loading="loading">
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
        eventsRegistered: []
      }
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
