import {
    RECEIVE_POSTS,
    INCREASE_POST_SCORE,
    DECREASE_POST_SCORE,
    ADD_POST,
    REMOVE_POST,
    EDIT_POST
} from '../actions/types'

export default (state = [], action) => {
    switch (action.type) {
        case RECEIVE_POSTS:
            return action.posts.filter( p => !p.deleted);
        case ADD_POST :
            return [...state, action.post];
        case REMOVE_POST:
            return state.filter(p => p.id !== action.id);
        case EDIT_POST:
            const { post } = action;
            return state.map(p => {
                if (p.id !== post.id) {
                    return p;
                }
                return {
                    ...p,
                    title: post.title,
                    body: post.body
                }
            });
        case INCREASE_POST_SCORE:
            return state.map(p => {
                if (p.id !== action.id) {
                    return p;
                }
                return {
                    ...p,
                    voteScore: p.voteScore + 1
                }
            });
        case DECREASE_POST_SCORE:
            return state.map(p => {
                if(p.id !== action.id){
                    return p;
                }
                return {
                    ...p,
                    voteScore: p.voteScore - 1
                }
            });
        default :
            return state
    }
}