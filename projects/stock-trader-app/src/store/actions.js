import Vue from 'vue'

export const loadData = ({commit}) => {
    Vue.http.get('data.json')
        .then(res => res.json())
        .then(data => {
            if(data){
                const portfolio = {
                    funds: data.funds,
                    stocks: data.stockPortfolio
                }

                commit('SET_STOCKS', data.stocks)
                commit('SET_PORTFOLIO', portfolio)
            }
        })
}