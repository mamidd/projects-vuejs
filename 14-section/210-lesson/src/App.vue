<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Animations</h1>
                <button class="btn btn-primary" @click="addItem">Add item</button>
                <br><br>
                <ul class="list-group">
                    <transition-group name="slide">
                        <li 
                            style="cursor: pointer"
                            @click="removeItem(index)"
                            class="list-group-item" 
                            v-for="(number, index) in numbers" 
                            :key="number">{{ number }}</li>
                    </transition-group>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                numbers: [1, 2, 3, 4, 5]
            }
        },
        methods:{
            addItem(){
                const pos = Math.floor(Math.random() * this.numbers.length);
                this.numbers.splice(pos, 0, this.numbers.length + 1)
            },
            removeItem(index){
                this.numbers.splice(index,1);
            },
            beforeEnter(el) {
                console.log('beforeEnter')
            },
            enter(el,done) {
                console.log('enter')
                done();
            },
            afterEnter(el) {
                console.log('afterEnter')
            },
            afterEnterCancelled(el) {
                console.log('afterEnterCancelled')
            },
            beforeLeave(el) {
                console.log('beforeLeave')
            },
            leave(el,done) {
                console.log('leave')
                done();
            },
            afterLeave(el) {
                console.log('afterLeave')
            },
            afterLeaveCancelled(el) {
                console.log('afterLeaveCancelled')
            }
        }
    }
</script>

<style>
    .fade-enter{
        opacity: 0;
    }

    .fade-enter-active{
        transition: opacity 1s;
    }

    .fade-leave{
        /* opacity: 1; è il default per cui non serve */
    }

    .fade-leave-active{
        transition: opacity 1s;
        opacity: 0;
    }

    .slide-enter{
        opacity: 0;
        /* transform: translateY(20px); non serve perchè settato come partenza nel keyframe*/
    }

    .slide-enter-active{
        animation: slide-in 1s ease-out forwards;
        transition: opacity .5s;
    }

    .slide-leave{
        
    }

    .slide-leave-active{
        animation: slide-out 1s ease-out forwards;
        /* transition: opacity 3s; provalo con type="animation" */
        transition: opacity 1s;
        opacity: 0;
        position: absolute;        
    }

    .slide-move{
        transition: transform 1s;
    }

    @keyframes slide-in {
        from{
            transform: translateY(20px);
        }
        to{
            transform: translateY(0);
        }
    }

    @keyframes slide-out {
        from{
            transform: translateY(0);
        }
        to{
            transform: translateY(20px);
        }
    }
</style>
