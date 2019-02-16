<template>
<div id="newEvent">
    <ul>
        <li v-for="event in events" :key=event>
            {{event}}
        </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'

    export default {
        name: 'newEvent',
        data() {
            return {   
                events : ["envetn1","event2"]

            }
        },
        methods: {
            getEvents() {
                const apiKey= 'H3GRCF3QTFHEFSUIYHWU'
                // const url = 'https://www.eventbriteapi.com/v3/categories/'
                const url = 'https://www.eventbriteapi.com/v3/events/search/?q=saint+louis&categories=111&token='+apiKey
                axios.get(url,{
                headers:{
                    "Authorization":"Bearer "+ apiKey,
                    "Content-Type":"application/json"
                }})
                .then(res => {
                    console.log(res.data)
                    this.events = res.data
                })
            }
        },
        mounted(){
            this.getEvents()
        }
    }
</script>