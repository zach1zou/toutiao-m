import Vue from 'vue'
import Vuex from 'vuex'
// import storage from './storage'
import { getToken, setToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user: JSON.parse(localStorage.getItem('TouTiao-Token')) || {}
    // user: storage.get('TouTiao-Token')
    user: getToken() || {}
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload
      // localStorage.setItem('TouTiao-Token', JSON.stringify(payload))
      // storage.set('TouTiao-Token', payload)
      setToken(payload)
    }
  },
  actions: {},
  modules: {}
})
