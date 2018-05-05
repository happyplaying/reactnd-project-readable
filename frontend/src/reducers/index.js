import { combineReducers } from 'redux'
import Category from './Category'
import Post from './Post'
import Comment from './Comment'

export default combineReducers({
  categories: Category,
  posts: Post,
  comments: Comment,
})
