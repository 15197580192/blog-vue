import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token: '',
    userInfo: JSON.parse(sessionStorage.getItem('userInfo'))// 反序列化
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      // 存入浏览器
      localStorage.setItem('token', token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state) => {
      localStorage.setItem('token', '')
      sessionStorage.setItem('userInfo', JSON.stringify(''))
      state.userInfo = {}
    }
  },
  getters: {
    getUser: state => {
      return state.userInfo
    }
  },
  actions: {},
  modules: {}
})
