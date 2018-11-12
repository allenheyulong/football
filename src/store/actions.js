import {SAVE_DATA} from './mutation-types'

export default {
    // 将数据保存或修改到vuex中  data -- obj
    saveData({commit},{data}){
        commit(SAVE_DATA,{data})
    }
}