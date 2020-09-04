import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth';
import globalAxios from 'axios';

import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser (state, userData){
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser (state, user) {
      state.user = user
    },
    clearAuth (state){
      state.idToken = null
      state.userId = null
    }
  },
  actions: {
    signup({ commit, dispatch }, authData) {
      axios.post('/accounts:signUp?key=AIzaSyD9tl8rh7aGpgbSwvlX_aXNtoIuhWm-68M', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          dispatch('storeUser', authData)
        })
        .catch(err => console.log(err))
    },

    storeUser ({commit, state}, userData) {
      if(!state.idToken) return

      globalAxios.post('/users.json?auth=' + state.idToken, userData)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    },

    login({ commit }, authData) {
      axios.post('/accounts:signInWithPassword?key=AIzaSyD9tl8rh7aGpgbSwvlX_aXNtoIuhWm-68M', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          router.replace('/dashboard')
        })
        .catch(err => console.log(err))
    },

    fetchUser ({commit, state}) {
      if (!state.idToken) return

      globalAxios.get('/users.json?auth=' + state.idToken)
        .then(res => {
          console.log(res)
          const data = res.data
          const users = []
          for (let key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }
          this.email = users[0].email
          commit('storeUser', users[0])
        })
        .catch(err => console.log(err))
    },

    logout ({commit}) {
      commit('clearAuth');
      router.replace('/signin')
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    isAuthenticated(state){
      return state.idToken !== null
    }
  }
})