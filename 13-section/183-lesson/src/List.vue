<template>
    <div>
        <h1>Filters & Mixins</h1>                
        <input type="text" v-model="filterText">
        <ul>
            <li 
                v-for="(fruit, i) in filteredFruits"
                :key="i"
                >{{ fruit }}</li>
        </ul>
    </div>
</template>

<script>
    import { fruitMixin } from './fruitMixin'
    export default {
        mixins: [fruitMixin],
        created() {
            console.log('ComponentCreated')
        },
    }
</script>

<style>

</style>
