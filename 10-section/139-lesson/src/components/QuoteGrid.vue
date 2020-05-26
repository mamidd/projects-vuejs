<template>
    <div class="row">
        <app-quote 
            v-for="(quote, index) in quotes"
            :key=index
            @click.native="deleteQuote(index)"
        >
            <h1>{{ quote }}</h1>
        </app-quote>
    </div>
</template>

<script>
    import Quote from './Quote.vue'
    import { eventBus } from '../main'

    export default {
        props: ['quotes'],
        components:{
            appQuote: Quote
        },
        methods: {
            deleteQuote(index) {
                eventBus.$emit('quoteDeleted', index)
            }
        }
    }
</script>

<style>

</style>