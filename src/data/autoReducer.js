import {C} from './autoActions'
import autoInitialState from './autoInitialState'

const autoReducer = (state = autoInitialState, action) => {
    switch (action.type){
        case C.ACTION_ADD_AUTO:
            return {
                    ...state,
                    auto: state.auto.concat(action.payload)
                }
        case C.ACTION_CHANGE_ERROR:
            return {
                    ...state, 
                    error: action.payload
                }
        case C.ACTION_TOGGLE_END:
            return {
                ...state,
                isEnd: action.payload
            }
        default:
            return state
    }
}

export default autoReducer