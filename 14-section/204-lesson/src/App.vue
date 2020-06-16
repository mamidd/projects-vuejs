<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Animations</h1>
                <hr>
                <select v-model="animationName" class="form-control">
                    <option value="fade">Fade</option>
                    <option value="slide">Slide</option>
                </select>
                <br><br>
                <button 
                    @click="show = !show"
                    class="btn btn-primary">Show Alert</button>
                <br><br>
                <transition :name="animationName">
                    <div v-if="show"
                        class="alert alert-info">This is some Info</div>
                </transition>
                <transition :name="animationName">
                    <div v-if="show"
                        class="alert alert-info">This is some Info</div>
                </transition>
                <transition :name="animationName" appear>
                    <div v-if="show"
                        class="alert alert-info">This is some Info</div>
                </transition>
                <transition 
                    appear
                    enter-active-class="animated bounce"
                    leave-active-class="animated shake">
                    <div v-if="show"
                        class="alert alert-info">This is some Info</div>
                </transition>
                <transition :name="animationName" mode="out-in">
                    <div v-if="show" key="info"
                        class="alert alert-info">This is some Info</div>
                    <div v-if="!show" key="warning"
                        class="alert alert-warning">This is some Warning</div>
                </transition>
                <hr>
                <button 
                    class="btn btn-primary" 
                    @click="load = !load">Load / Remove Element</button>
                <br><br>
                <transition
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @after-enter-cancelled="afterEnterCancelled"
                    @before-leave="beforeLeave"
                    @leave="leave"
                    @after-leave="afterLeave"
                    @after-leave-cancelled="afterLeaveCancelled"
                    :css="false"
                    >
                    <div v-if="load"
                        style="width: 300px; height: 100px; background-color:green;"></div>
                </transition>
                <hr>
                <button 
                    @click="selectedComponent == 'app-success-alert' ? selectedComponent = 'app-danger-alert' : selectedComponent = 'app-success-alert'"
                    class="btn btn-primary">Toggle Components</button>
                <br><br>
                <transition name="fade" mode="out-in">
                    <component :is="selectedComponent"></component>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import DangerAlert from './DangerAlert.vue'
    import SuccessAlert from './SuccessAlert.vue'

    export default {
        data() {
            return {
                show: false,
                load: true,
                animationName: "fade",
                elementWidth: 100,
                selectedComponent: 'app-success-alert'
            }
        },
        methods:{
            beforeEnter(el) {
                console.log('beforeEnter')
                this.elementWidth = 100;
                el.style.width = this.elementWidth + 'px';
            },
            enter(el,done) {
                console.log('enter')
                let round = 1;
                const interval = setInterval(() => {
                    el.style.width = (this.elementWidth + round * 10) + 'px';
                    round++;
                    if(round > 20){
                        clearInterval(interval);
                        done();
                    }
                }, 20);
            },
            afterEnter(el) {
                console.log('afterEnter')
            },
            afterEnterCancelled(el) {
                console.log('afterEnterCancelled')
            },
            beforeLeave(el) {
                console.log('beforeLeave')
                this.elementWidth = 300;
                el.style.width = this.elementWidth + 'px';
            },
            leave(el,done) {
                console.log('leave')
                let round = 1;
                const interval = setInterval(() => {
                    el.style.width = (this.elementWidth - round * 10) + 'px';
                    round++;
                    if(round > 20){
                        clearInterval(interval);
                        done();
                    }
                }, 20);
            },
            afterLeave(el) {
                console.log('afterLeave')
            },
            afterLeaveCancelled(el) {
                console.log('afterLeaveCancelled')
            }
        },
        components: {
            appDangerAlert: DangerAlert,
            appSuccessAlert: SuccessAlert
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
