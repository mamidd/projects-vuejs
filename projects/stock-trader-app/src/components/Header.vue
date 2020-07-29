<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand">Stock Trader</router-link>
            </div>

            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <router-link tag="li" to="/portfolio" activeClass="active"><a>Portfolio</a></router-link>
                    <router-link tag="li" to="/stocks" activeClass="active"><a>Stocks</a></router-link>
                </ul>
                <strong class="navbar-text navbar-right">Funds: {{ funds | currency }}</strong>
                <ul class="nav navbar-nav navbar-right">
                    <li><a 
                        href="#"
                        @click="endDay">End Day</a></li>
                    <li 
                        class="dropdown" 
                        :class="{open: isDropdownOpen}"
                        @click="isDropdownOpen = !isDropdownOpen">
                        <a 
                            href="#" 
                            class="dropdown-toggle" 
                            data-toggle="dropdown" 
                            role="button" 
                            aria-haspopup="true" 
                            aria-expanded="false">Save & Load <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#" @click="saveData">Save Data</a></li>
                            <li><a href="#" @click="loadData">Load Data</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        data(){
            return {
                isDropdownOpen: false
            }
        },
        computed: {
            ...mapGetters([
                'funds',
                'stockPortfolio',
                'stocks'
            ])
        },
        methods: {
            ...mapActions({
                fetchData: 'loadData',
                randomizeStocks: 'randomizeStocks'
            }),
            endDay() {
                this.randomizeStocks()
            },
            saveData(){
                const data = {
                    funds: this.funds,
                    stockPortfolio: this.stockPortfolio,
                    stocks: this.stocks
                }
                this.$http.put('data.json', data)
            },
            loadData(){
                this.fetchData()
            }
        },
    }
</script>