import {SAVE_DATA} from './mutation-types'

export default {
    [SAVE_DATA](state,{data}){
        state[data.key] = data.value
    }
}