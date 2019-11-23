import autoReducer from './autoReducer'
import {createStore} from 'redux'

const store = createStore(autoReducer)

export default store