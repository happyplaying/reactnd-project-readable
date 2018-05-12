import {
    RECEIVE_COMMENTS,
    INCREASE_COMMENT_SCORE,
    DECREASE_COMMENT_SCORE,
    REMOVE_COMMENT,
    ADD_COMMENT,
    EDIT_COMMENT
} from '../actions/types'

export default (initialState = {}, action) => {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            let nReceiveComments = { ...initialState }
            if (action.comments.length > 0) {
                const key = action.comments[0].parentId
                nReceiveComments[key] = action.comments
            } else {
                nReceiveComments[action.postId] = []
            }
            return nReceiveComments;
        case INCREASE_COMMENT_SCORE:
            //Deep clone on the initialState
            let nIncreaseCommentScore = {}
            for(let i in initialState){
                nIncreaseCommentScore[i] = [];
                for(let j of initialState[i]){
                    nIncreaseCommentScore[i].push({...j})
                }
            }
            for(let i of nIncreaseCommentScore[action.postId]){
                if(i.id === action.commentId){
                    i.voteScore += 1;
                }
            }
            return nIncreaseCommentScore;
        case DECREASE_COMMENT_SCORE:
            //Deep clone on the initialState
            let nDecreaseCommentScore = {}
            for(let i in initialState){
                nDecreaseCommentScore[i] = [];
                for(let j of initialState[i]){
                    nDecreaseCommentScore[i].push({...j})
                }
            }
            for(let i of nDecreaseCommentScore[action.postId]){
                if(i.id === action.commentId){
                    i.voteScore -= 1;
                }
            }
            return nDecreaseCommentScore; 
        case REMOVE_COMMENT:
            //Deep clone on the initialState
            let nRemoveComment = {}
            for(let i in initialState){
                nRemoveComment[i] = [];
                for(let j of initialState[i]){
                    nRemoveComment[i].push({...j})
                }
            }
            nRemoveComment[action.postId] = nRemoveComment[action.postId].filter(e => e.id !== action.commentId);
            return nRemoveComment;
        case ADD_COMMENT:
            const nAddComment = { ...initialState }
            nAddComment[action.comment.parentId] = [ ...nAddComment[action.comment.parentId], action.comment ]
            return nAddComment;      
        case EDIT_COMMENT:
            //Deep clone on the initialState
            let nEditComment = {}
            for(let i in initialState){
                nEditComment[i] = [];
                for(let j of initialState[i]){
                    nEditComment[i].push({...j})
                }
            }
            for(let i of nEditComment[action.comment.parentId]){
                if(i.id === action.comment.id){
                    i.body = action.comment.body;
                    i.timestamp = action.comment.timestamp;
                }
            }
            return nEditComment;
        default:
          return initialState
    }
}