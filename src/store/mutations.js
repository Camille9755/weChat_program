import {RECEIVE_LIST,RECEIVE_MOVIES_ARR} from './mutation-types'

export default {
  [RECEIVE_LIST](state,list_data){
    state.listData = list_data
  },
  [RECEIVE_MOVIES_ARR](state,moviesArr){
    state.moviesArr = moviesArr
  }
}
