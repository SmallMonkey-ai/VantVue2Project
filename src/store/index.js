import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/utils/http'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    userInfo: null
  },
  mutations: {
    setToken(state, value) {
      state.token = value;
      http.defaults.headers.common['X-Access-Token'] = value;
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
