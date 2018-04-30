import { combineReducers } from 'redux'
import {
    ADD_POST,
    ADD_CATEGORY
} from '../actions'

const posts = (state = [], action) => {
    switch (action.type) {
        case ADD_POST :
            return state.concat(action.posts)
        default :
            return state
    }
}
const categories = (state = [], action) => {
    switch (action.type) {
        case ADD_CATEGORY :
            return state.concat(action.categories)
        default :
            return state
    }
}

export default combineReducers({
  posts,
  categories,
})