<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <template>
                    <button @click="selectedComponent = 'app-quote'">Quote</button>
                    <button @click="selectedComponent = 'app-author'">Author</button>
                    <button @click="selectedComponent = 'app-new'">New</button>
                    <p>{{ selectedComponent }}</p>
                    <component :is="selectedComponent">
                        <p>Default Content</p>
                    </component>
                </template>
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
    import Author from './components/Author.vue'
    import New from './components/New.vue'
    import quote2 from './components/Quote2.vue'
    export default {
        data: function(){
            return {
                text: "Sono un h3",
                selectedComponent: 'app-quote'
            }
        },
        components:{
            'app-quote': quote,
            'app-quote-bis': quote2,
            'app-author': Author,
            'app-new': New
        }
    }
</script>

<style>
    h2{
        color:red;
    }
</style>
