<template>
    <div class="container">
        <app-header :quoteCount="quotes.length" :maxQuotes="maxQuotes"></app-header>
        <app-new-quote></app-new-quote>
        <app-quote-grid :quotes="quotes"></app-quote-grid>
        <template>
            <div class="row">
                <div class="col-sm-12 text-center">
                    <div class="alert alert-info">
                        Info: Click on a quote to delete it.
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import QuoteGrid from './components/QuoteGrid.vue'
    import NewQuote from './components/NewQuote.vue'
    import Header from './components/Header.vue'
    import { eventBus } from './main'

    export default {
        data: function(){
            return {
                quotes: [
                    'Just a Quote to see somethings'
                ],
                maxQuotes: 10
            }
        }, 
        components: {
            appQuoteGrid: QuoteGrid,
            appNewQuote: NewQuote,
            appHeader: Header
        },
        created() {
            eventBus.$on('quoteAdded', (quote) => {
                if(this.quotes.length < this.maxQuotes) {
                    this.quotes.push(quote)
                }else{
                    alert('Please delete a quote first')
                }
            })
            eventBus.$on('quoteDeleted', (index) => {
                this.quotes.splice(index, 1)
            })
        }
        
    }
</script>

<style>
</style>
