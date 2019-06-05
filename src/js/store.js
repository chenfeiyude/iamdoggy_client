import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
          uid         : null,
          username    : null,
          token       : null
        },
        dog: {
          id: 0,
          uid: null,
          age: 0,
          state: null,
          healthy: null,
          born: null,
          cost: 0,
          breed: null
        },
        sessionExpired: false,
    },
    mutations: {
        [types.LOGIN]: (state, user) => {
          localStorage.user = JSON.stringify(user);
          state.user = user;
          state.sessionExpired = false;
        },
        [types.REFRESH_USER]: (state, user) => {
          localStorage.user = JSON.stringify(user);
          state.user = user;
          state.sessionExpired = false;
        },
        [types.LOGOUT]: (state) => {
          localStorage.removeItem('user');
          state.user = null;
        },
        [types.DOG]: (state, dog) => {
          localStorage.dog = JSON.stringify(dog);
          state.dog = dog;
        },
    }
})
