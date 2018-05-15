import React, { Component } from 'react';
import { increaseCommentScore, decreaseCommentScore, removeComment,editComment,editPostCommentsCount} from '../actions';
import { connect } from 'react-redux';
import * as API from '../utils/api';
import { dateYYYYMMDDHHMMSS } from '../utils/helpers';
class Comment extends Component {
    constructor() {
        super();
        this.state = {
            editFlag:false,
            commentBody:"",
        }
    };
    
    increaseCommentScore(postId, commentId){
        API.increaseCommentScore(commentId).then(results =>{
            this.props.dispatch(increaseCommentScore(postId, commentId));
        })
    }
    decreaseCommentScore(postId, commentId){
        API.decreaseCommentScore(commentId).then(results =>{
            this.props.dispatch(decreaseCommentScore(postId, commentId));
        })
    }
    removeComment(postId, commentId){
        API.removeComment(commentId).then(results =>{
            this.props.dispatch(removeComment(postId, commentId));
            this.props.dispatch(editPostCommentsCount(postId, -1));
        })
    }
    handleEditComment(status){
        if(!status){
            let comment = {
                id: this.props.comment.id,
                timestamp: new Date().getTime(),
                body: this.state.commentBody,
            }
            API.editComment(comment).then(results =>{
                this.props.dispatch(editComment(results));
            })
        }
        this.setState({editFlag:status})
    }
    componentWillMount(){
        this.setState({commentBody : this.props.comment.body});
    }
    handleChange(value, type){
        this.setState({[type]:value})
    }
    render() {
        const {comment, postId} = this.props;
        return (
            <div>
                {this.state.editFlag ? (
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.commentBody} 
                        onChange={(event) => this.handleChange(event.target.value,'commentBody')}
                        required 
                    />
                ):(
                    <p>{comment.body}</p>
                )}
                
                <p className="blog-post-meta"><i>{dateYYYYMMDDHHMMSS(comment.timestamp)}, by {comment.author}</i></p>
                <p >
                    {comment.voteScore >= 0 ? (
                        <i className="far fa-thumbs-up"></i>
                    ):(
                        <i className="far fa-thumbs-down"></i>
                    )} {comment.voteScore}
                </p>
                <button className="btn btn-sm btn-info" onClick = {event => this.increaseCommentScore(postId, comment.id)}>Like</button>
                <button className="btn btn-sm btn-info" onClick = {event => this.decreaseCommentScore(postId, comment.id)}>Dislike</button>
                <button className="btn btn-sm btn-primary" onClick = {event => this.handleEditComment(this.state.editFlag ? false : true)}>{this.state.editFlag ? 'Save' : 'Edit'}</button>
                <button type="button" className="btn btn-sm btn-danger" onClick = {event => this.removeComment(postId, comment.id)}>Delete</button>
                <hr />
            </div>
        )
    }
}


export default connect()(Comment)
