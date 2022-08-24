import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/libs/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: '',
    apiToken: '',
    userInfo: null
  },
  mutations: {
    setApiToken(state, value) {
      state.apiToken = value;
      axios.defaults.headers.common['X-Access-Token'] = value;
    },
    setUserToken(state, value) {
      state.userToken = value;
    },
    setUserInfo(state, value) {
      state.userInfo = value;
    },
  },
  actions: {
  },
  modules: {
  }
})
