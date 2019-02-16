<template>
<div id="dashboard">
    <ul class="collection with-header">
        <li class="collection-header"><h4>
            Events
            </h4>
        </li>
        <li v-for="event in events" v-bind:key = event.id
        class="collection-item"> 
        Title: {{event.title}} 
        <br>
        Description: {{event.description}}
        <br>
        Signed up to this event: {{event.users}}
        </li>
    </ul>

    <div class="fixed-action-btn">
        <router-link to="/new" class = "btn-floating btn-large green">
            <i class ="fa fa-plus"></i>
        </router-link>
        </div>
    </div>
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
                            'users' : doc.data().users
                        }
                        this.events.push(data)
                    });
                })
            }
        }
    </script>
