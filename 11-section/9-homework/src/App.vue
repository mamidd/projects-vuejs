<template>
    <div class="container">
        <!-- Exercise 1 -->
        <!-- Create a Signup Form where you retrieve the following Information -->
        <!-- Full Name (First Name + Last Name) -->
        <!-- Mail -->
        <!-- Password -->
        <!-- Store Data? Yes/No -->
        <form>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <h1>Signup</h1>
                    <hr>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input
                                type="text"
                                id="name"
                                class="form-control"
                                v-model="name">
                        <label for="name">Surname</label>
                        <input
                                type="text"
                                id="surname"
                                class="form-control"
                                v-model="surname">
                    </div>
                    <!-- Exercise 3 -->
                    <!-- Edit the Example from above and create a custom "Full Name" Control -->
                    <!-- which still holds the First Name and Last Name Input Field -->
                    <hr>   
                    <app-fullname
                        v-model="fullName"></app-fullname>
                    <hr>
                    <div class="form-group">
                        <label for="email">Mail</label>
                        <input
                                type="text"
                                id="email"
                                class="form-control"
                                v-model="email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                                type="password"
                                id="password"
                                class="form-control"
                                v-model="password">
                    </div>
                </div>
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
                    <p>Do you want store data?</p>
                    <label for="yes">
                        <input
                                type="radio"
                                id="yes"
                                value="Yes"
                                v-model="storeData"> Yes
                    </label>
                    <label for="no">
                        <input
                                type="radio"
                                id="no"
                                value="No"
                                v-model="storeData"> No
                    </label>
                </div>
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
                    <button
                        class="btn btn-primary"
                        @click.prevent="submitted">Submit</button>
                </div>
            </div>
        </form>
        <hr>
        <!-- Exercise 2 -->
        <!-- Only display the Form if it has NOT been submitted -->
        <!-- Display the Data Summary ONCE the Form HAS been submitted -->
        <div class="row" v-if="isSubmitted">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4>Your Data</h4>
                    </div>
                    <div class="panel-body">
                        <p>Full Name: {{ name }} {{ surname }}</p>
                        <p>Full Name Custom: {{ fullName }}</p>
                        <p>Mail: {{ email }}</p>
                        <p>Password: {{ password }}</p>
                        <p>Store in Database?: {{ storeData }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Fullname from './Fullname.vue'

    export default {
        data() {
            return {
                name: '',
                surname: '',
                email: '',
                password: '',
                storeData: 'Yes',
                fullName: '',
                isSubmitted: false
            }
        },
        methods:{
            submitted(){
                this.isSubmitted = true
            }
        },
        components: {
            appFullname: Fullname
        }
    }
</script>

<style>
</style>
