export const ADD_POST = 'ADD_POST'
export const ADD_CATEGORY = 'ADD_CATEGORY'

export const addPost = posts => ({
    type: ADD_POST,
    posts
})
export const addCategory = categories => ({
    type: ADD_CATEGORY,
    categories
})