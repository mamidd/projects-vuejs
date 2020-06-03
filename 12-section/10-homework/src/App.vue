<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Directives Exercise</h1>
                <!-- Exercise -->
                <!-- Build a Custom Directive which works like v-on (Listen for Events) -->
                <p v-myOn:click="alertMe">Custom directive wich alert me</p>
                <p v-myOn="'value'">Custom directive wich NOT alert me</p>
                <p v-solutionOn:click="alertMe">Custom directive wich alert me</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            alertMe() {
                alert('ciao');
            }
        },
        directives: {
            myOn: {
                bind(el, binding, vnode) {
                    if(typeof binding.value === 'function'){
                        if(binding.arg == 'click'){
                            el.onclick = binding.value;
                        }
                    }
                }
            },
            solutionOn: {
                bind(el, binding, vnode) {
                    if(typeof binding.value === 'function'){
                        const event = binding.arg;
                        const fn = binding.value;
                        el.addEventListener(event, fn);
                        
                    }
                }
            }
        }
    }
</script>

<style>
</style>
