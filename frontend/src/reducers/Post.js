import {
    RECEIVE_POSTS,
    INCREASE_POST_SCORE,
    DECREASE_POST_SCORE,
    ADD_POST,
    REMOVE_POST,
    EDIT_POST,
    EDIT_POST_COMMENTS_COUNT,
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
            //copy the current state
            let nEditPost = state.map( p => Object.assign({}, p));
            //modify the changes
            for(let i of nEditPost){
                if (i.id === action.post.id) {
                    i.title = action.post.title;
                    i.body = action.post.body;
                }
            }
            return nEditPost;
        case INCREASE_POST_SCORE:
            let nIncreasePostScore = state.map( p => Object.assign({}, p));
            for(let i of nIncreasePostScore){
                if (i.id === action.id) {
                    i.voteScore += 1;
                }
            }
            return nIncreasePostScore;
        case DECREASE_POST_SCORE:
            let nDecreasePostScore = state.map( p => Object.assign({}, p));
            for(let i of nDecreasePostScore){
                if (i.id === action.id) {
                    i.voteScore -= 1;
                }
            }
            return nDecreasePostScore;
        case EDIT_POST_COMMENTS_COUNT:
            let nEditPostCommentsCount = state.map( p => Object.assign({}, p));
            for(let i of nEditPostCommentsCount){
                if (i.id === action.postId) {
                    i.commentCount += Number(action.value);
                }
            }
            return nEditPostCommentsCount;
        default :
            return state
    }
}