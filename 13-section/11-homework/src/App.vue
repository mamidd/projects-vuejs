<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Filters & Mixins</h1>
                
                <hr>
                <h2>Filters</h2>
                <!-- Exercise 1) -->
                <!-- Build a local Filter which reverses the Text it is applied on -->
                <p>{{ text | reverse }}</p>

                <!-- Exercise 2 -->
                <!-- Build a global Filter which counts the length of a word and it appends it -->
                <!-- Like this: "Test" => Gets Filtered to => "Test (4)" -->
                <p>{{ text | countCharacters }}</p>

                <hr>
                <h2>Computed Properties</h2>
                <!-- Exercise 3 -->
                <!-- Do the same as in Exercises 1 & 2, now with Computed Properties -->
                <p>{{ reversed }}</p>
                <p>{{ characterCounted }}</p>


                <hr>
                <h2>Mixin</h2>
                <!-- Exercise 4 -->
                <!-- Share the Computed Property rebuilding Exercise 2 via a Mixin -->
                <p>{{ reversedMixin }}</p>
                <p>{{ characterCountedMixin }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { stringMixin }  from './stringMixin'
    export default {
        mixins: [stringMixin],
        data() {
            return {
                text: 'Hello World!'
            }
        },
        filters: {
            reverse(value){
                return value.split("").reverse().join("");
            }
        },
        computed: {
            reversed(){
                return this.text.split("").reverse().join("");
            },
            characterCounted(){
                let value = this.text;
                return value + " (" + value.length + ")";
            }
        },
    }
</script>

<style>
</style>
