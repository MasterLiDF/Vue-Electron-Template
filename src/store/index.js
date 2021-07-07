import Vue from "vue";
import Vuex from "vuex";

import User from "./modules/user";
import Music from './modules/music/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    User,
    Music,
  },
});
