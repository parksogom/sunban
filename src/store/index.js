import Vue from 'vue';
import Vuex from 'vuex';
import modCommon from "./store-mod/common"
import modProvider from "./store-mod/provider"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  mutations: {


  },
  actions: {


  },
  getters: {
},
  modules: {
    provider : modProvider,
    common : modCommon
  }
});
