<template>
    <div class="form-group">
        <label for="name">Name</label>
        <input
                type="text"
                id="name"
                class="form-control"
                @input="changed('name', $event)"
                :value="name">
        <label for="name">Surname</label>
        <input
                type="text"
                id="surname"
                class="form-control"
                @input="changed('surname', $event)"
                :value="surname">
    </div>
</template>

<script>
    export default {
        props: ['value'],
        computed: {
            name(){
                let values = this.value.split(" ")
                return values[0] ? values[0] : ''
            },
            surname(){
                let values = this.value.split(" ")
                let theRestOf = values.splice(1, values.length -1 )
                return theRestOf.length ? theRestOf.join(" ") : ''
            }
        },
        methods:{
            changed(property, event){
                if (property === 'name'){
                    this.$emit('input', event.target.value + " " + this.surname)
                }
                if (property === 'surname'){
                    this.$emit('input', this.name + " " + event.target.value)
                }
            }
        }
    }
</script>

<style>

</style>