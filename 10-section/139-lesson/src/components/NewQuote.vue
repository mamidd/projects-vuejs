<template>
    <div class="row">
        <div class="form-group col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3">
            <label for="">Quote</label>
            <textarea 
                class="form-control" 
                row="3"
                v-model="quote"></textarea>
        </div>
        <div class="form-group col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3">
            <button 
                class="btn btn-primary"
                @click.prevent="createNew"
            >Add Quote</button>
        </div>
    </div>
</template>

<script>
    import { eventBus } from '../main'

    export default {
        data: function(){
            return {
                quote: ''
            }
        },
        methods: {
            createNew() {
                eventBus.$emit('quoteAdded', this.quote)
                this.quote = ''
            }
        }
    }
</script>

<style>
    
</style>