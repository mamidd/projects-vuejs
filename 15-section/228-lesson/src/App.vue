<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Http</h1>
                <div class="form-group">
                    <label for="">Username</label>
                    <input type="text" class="form-control" v-model="user.username">
                </div>
                <div class="form-group">
                    <label for="">Mail</label>
                    <input type="text" class="form-control" v-model="user.email">
                </div>
                <button class="btn btn-primary" @click="submit">Submit</button>
                <hr>
                <button class="btn btn-primary" @click="fetchData">Get Data</button>
                <ul class="list-group">
                    <li class="list-group-item" 
                        v-for="u in users"
                        :key=u.id >{{ u.username }} - {{ u.email }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user:{
                    username: '',
                    email: ''
                },
                users:[],
                resource: {},
            }
        },
        methods: {
            submit(){
                // this.$http.post('data.json', this.user)
                //     .then(res => {
                //         console.log(res)
                //     }, err => {
                //         console.log(err)
                //     });
                // this.resource.save({}, this.user)
                this.resource.saveAlt(this.user)
            },
            fetchData(){
                this.$http.get('data.json')
                    .then( res => {
                        return res.json()
                    }, err => {
                        console.log(err)
                    })
                    .then( data => {
                        for(let key in data){
                            let user = data[key]
                            user.id = key
                            this.users.push(user)
                        }
                        console.log(this.users)
                    }, err => {
                        console.log(err)
                    });
            }
        },
        created(){
            const customActions = {
                saveAlt: {
                    method: 'POST',
                    url: 'alternative.json'
                }
            }
            this.resource = this.$resource('data.json', {}, customActions)
        }
    }
</script>

<style>
</style>
