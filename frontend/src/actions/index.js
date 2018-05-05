import {
    RECEIVE_POSTS,
    ADD_POST,
    EDIT_POST,
    REMOVE_POST,

    RECEIVE_CATEGORIES,

    RECEIVE_COMMENTS,
    ADD_COMMENT,
    REMOVE_COMMENT,
    EDIT_COMMENT,


    INCREASE_POST_SCORE,
    DECREASE_POST_SCORE,

    INCREASE_COMMENT_SCORE,
    DECREASE_COMMENT_SCORE,

} from './types'

export const addPost = post => ({
    type: ADD_POST,
    post
})
export const removePost = id => ({
    type: REMOVE_POST,
    id
})
export const increasePostScore = id => ({
    type: INCREASE_POST_SCORE,
    id
})

export const decreasePostScore = id => ({
    type: DECREASE_POST_SCORE,
    id
})
export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
})
export const editPost = post => ({
    type: EDIT_POST,
    post
})

export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
})


export const receiveComments = (comments, postId) =>  ({
    type: RECEIVE_COMMENTS,
    comments,
    postId
});

export const increaseCommentScore = id => ({
    type: INCREASE_COMMENT_SCORE,
    id
})

export const decreaseCommentScore = id => ({
    type: DECREASE_COMMENT_SCORE,
    id
})

export const editComment = comment => ({
    type: EDIT_COMMENT,
    comment
})
export const addComment = comment => ({
    type: ADD_COMMENT,
    comment
})
export const removeComment = id => ({
    type: REMOVE_COMMENT,
    id
})