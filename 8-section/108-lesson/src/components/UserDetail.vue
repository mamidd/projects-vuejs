<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>User Name: {{ name }}</p>
        <p>Reverse User Name: {{ switchName() }}</p>
        <p>Age: {{ userAge }}</p>
        <button @click="resetName">Reset Name</button>
        <button @click="resetFn()">Reset Name Fn</button>
    </div>
</template>

<script>
    import { eventBus } from '../main'

    export default {
        props: {
            name: {
                type: String
            },
            userAge: {
                type: Number
            },
            resetFn: {
                type: Function
            }
        },
        methods: {
            switchName() {
                return this.name.split("").reverse().join("")
            },
            resetName() {
                this.name = 'Mario'
                this.$emit('nameWasReset', this.name)
            }
        },
        created() {
            eventBus.$on('ageEdited', (data) => {
                this.userAge = data
            })
        }
    }
</script>

<style scoped>
    div {
        background-color: lightcoral;
    }
</style>
