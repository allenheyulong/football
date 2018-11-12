import Vue from 'vue'
import Vuex from 'vuex'
// vuex 数据持久化
import createPersistedState from 'vuex-persistedstate'

import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins:[createPersistedState()],
    state,
    actions,
    mutations,
    getters
})