<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
               <app-quote>
                   <h2>Sono un h2</h2>
                   <p>Sono un paragrafo</p>
                   <h3>{{ text }}</h3>
               </app-quote>
                <app-quote-bis>
                   <h2 slot="title">Title</h2>
                   <p slot="content">Content</p>
               </app-quote-bis>
            </div>
        </div>
    </div>
</template>

<script>
    import quote from './components/Quote.vue'
    import quote2 from './components/Quote2.vue'
    export default {
        data: function(){
            return {
                text: "Sono un h3"
            }
        },
        components:{
            'app-quote': quote,
            'app-quote-bis': quote2
        }
    }
</script>

<style>
    h2{
        color:red;
    }
</style>
