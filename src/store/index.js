import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null
  },
  mutations: {
    getUserInfo: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    clearUserInfo: (state, userInfo) => {
      state.userInfo = null;
    }
  },
  actions: {},
  modules: {}
});
