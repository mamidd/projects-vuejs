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
    setLogoutTimer( {commit, dispatch} , expirationTime){
      setTimeout(() => {
        dispatch('logout')
      }, expirationTime * 1000)
    },

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
          dispatch('setLocalStorage', res)
          dispatch('storeUser', authData)
          dispatch('setLogoutTimer', res.data.expiresIn)
        })
        .catch(err => console.log(err))
    },

    storeUser ({commit, state}, userData) {
      if(!state.idToken) return

      globalAxios.post('/users.json?auth=' + state.idToken, userData)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    },

    login({ commit, dispatch }, authData) {
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
          dispatch('setLocalStorage', res)
          dispatch('setLogoutTimer', res.data.expiresIn)
          router.replace('/dashboard')
        })
        .catch(err => console.log(err))
    },

    tryAutoLogin( {commit} ){
      const token = localStorage.getItem('token')
      if(!token) return

      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if(now >= expirationDate) return

      const userId = localStorage.getItem('userId')
      commit('authUser',  {token, userId})

      router.replace('/dashboard')
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

    isUnique({commit}, email) {
      return globalAxios.get('/users.json?orderBy="email"&equalTo="' + email + '"')
        .then( res => {
          //return true se l'oggetto risposta è vuoto
          console.log('checkEmailVuex', res)
          console.log('vuex result', Object.keys(res.data).length === 0)
          return Object.keys(res.data).length === 0
        })
        .catch( err => {
          console.log('checkEmailVuex', err)
          return false
        })
    },

    logout ({commit, dispatch}) {
      commit('clearAuth');
      dispatch('clearLocalStorage')
      router.replace('/signin')
    },

    setLocalStorage( {commit}, res ) {
      const now = new Date()
      const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
      localStorage.setItem('token', res.data.idToken)
      localStorage.setItem('expirationDate', expirationDate)
      localStorage.setItem('userId', res.data.localId)
    },

    clearLocalStorage({commit}){
      localStorage.removeItem('token')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('userId')
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