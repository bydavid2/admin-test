import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// use method load store modules dynamic

const context = require.context(__dirname + '/modules/', true, /\/$/i)
const modules = {}
context.keys().map((e) => {
  const moduleName = e.replaceAll(/(index)|(.js|.ts)\b|[.,/]/g, '')
  modules[moduleName] = require('./modules/' + moduleName).default
})

//

export default new Vuex.Store({
  state: {
    Sidebar_drawer: null,
    Customizer_drawer: false,
    SidebarColor: "white", //Change Sidebar Color || 'white', | "#2b2b2b" | "rgb(44, 59, 164)" | "rgb(96, 44, 164)" | "rgb(151, 210, 219)" | "rgb(77, 86, 100)"
    SidebarBg: "",
    navbarColor: "primary",
    setHorizontalLayout: false, // Horizontal layout
  },
  mutations: {

    SET_SIDEBAR_DRAWER(state, payload) {
      state.Sidebar_drawer = payload;
    },
    SET_CUSTOMIZER_DRAWER(state, payload) {
      state.Customizer_drawer = payload;
    },
    SET_SIDEBAR_COLOR(state, payload) {
      state.SidebarColor = payload;
    },
    SET_NAVBAR_COLOR(state, payload) {
      state.navbarColor = payload;
    },
    SET_LAYOUT(state, payload) {
      state.setHorizontalLayout = payload;
    }

  },
  actions: {},
  getters: {},
  modules
});