import Vue from "vue";
import Vuex from "vuex";
import authApi from '@/utils/auth'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        routes: [],
        currentAdmin: authApi.getCurrentUser()
    },
    mutations: {
        INIT_ADMIN(state, admin) {
            state.currentAdmin = admin
        },
        INIT_ROUTES(state, data) {
            state.routes = data
        }
    },
    actions: {},
    modules: {}
});

export default store;