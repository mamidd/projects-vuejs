<template>
    <div class="col-xs-12 col-sm-6">
        <template v-if="server.id === null">
            <p>Select a server.</p>
        </template>
        <template v-else>
            <p>ID: {{ server.id }}</p>
            <p>STATUS: {{ server.status }}</p>
            <p><button @click="setNormalStatus">Set Normal</button></p>
        </template>
    </div>

</template>

<script>
    import { eventBus } from '../../main'
    export default {
        data: function(){
            return {
                server: {id: null, status: null}
            }
        },
        methods: {
            setNormalStatus(){
                this.server.status = "Normal"
            }
        },
        created(){
            eventBus.$on('serverSelected', (server) => {
                this.server = server
            })
        }
    }
</script>

<style>

</style>
