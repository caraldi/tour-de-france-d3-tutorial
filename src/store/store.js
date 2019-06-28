import Vue from 'vue'
import Vuex from 'vuex'
import * as types from '@/store/types'
import client from 'api-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    error: null
  },
  mutations: {
    [types.SET_LOADING_STATUS]: state => (state.isLoading = !state.isLoading),
    [types.SET_ERROR]: state => state.error
  },
  actions: {
    [types.FETCH_DATA]: async (context) => {
      context.commit(types.SET_LOADING_STATUS)

      await client.fetchData()
        .then(response => {
          context.commit(types.SET_LOADING_STATUS)
          context.commit(types.SET_DATA, response)
        })
        .catch(error => context.commit(types.SET_ERROR, error.message))
        .finally(() => context.commit(types.SET_LOADING_STATUS))
    }
  }
})
