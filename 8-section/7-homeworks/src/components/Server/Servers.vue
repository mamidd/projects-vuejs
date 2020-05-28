<template>
    <div class="col-xs-12 col-sm-6">
        <ul class="list-group">
            <li
                class="list-group-item"
                style="cursor: pointer"
                v-for="(server,index) in servers" 
                :key="index" 
                @click="viewDetail(server)">
                    <p>Server #{{ index }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import { eventBus } from '../../main'
    export default {
        data: function(){
            return {
                servers: [
                    {id: 1, status: "Normal"},
                    {id: 2, status: "Critical"},
                    {id: 3, status: "Low"},
                    {id: 4, status: "High"},
                    {id: 5, status: "Normal"},
                ]
            }
        },
        methods: {
            viewDetail(server){
                eventBus.$emit('serverSelected', server)
            }
        }
    }
</script>

<style>

</style>
