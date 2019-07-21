import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
          uid         : null,
          username    : null,
          token       : null,
          firstname   : null,
          lastname    : null
        },
        primary_dog: {
          id: 0,
          uid: null,
          age: 0,
          state: null,
          healthy: null,
          born: null,
          cost: 0,
          breed: null,
          level: 0,
          speed: 0,
          attack: 0,
          defence: 0
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
        [types.PRIMARY_DOG]: (state, primary_dog) => {
          localStorage.primary_dog = JSON.stringify(primary_dog);
          state.primary_dog = primary_dog;
        },
    }
})
