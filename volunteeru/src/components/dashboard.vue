<template>
<div id="dashboard">
    <h3> Dashboard </h3>

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
                        console.log(doc)
                        const data = {
                            'id' : doc.id,
                            'title' : doc.title,
                            'length' : doc.length,
                            'description' : doc.description,
                            'users' : doc.users
                        }
                    });
                })
            }
        }
    </script>
