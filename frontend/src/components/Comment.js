import React, { Component } from 'react';
import { increaseCommentScore, decreaseCommentScore, removeComment} from '../actions';
import { connect } from 'react-redux';
import * as API from '../utils/api';
import { editComment} from '../actions';
import { dateYYYYMMDDHHMMSS } from '../utils/helpers';
class Comment extends Component {
    constructor() {
        super();
        this.state = {
            editFlag:false,
            commentBody:"",
        }
    };
    
    increaseCommentScore(id){
        API.increaseCommentScore(id).then(results =>{
            this.props.dispatch(increaseCommentScore(id));
        })
    }
    decreaseCommentScore(id){
        API.decreaseCommentScore(id).then(results =>{
            this.props.dispatch(decreaseCommentScore(id));
        })
    }
    removeComment(id){
        API.removeComment(id).then(results =>{
            this.props.dispatch(removeComment(id));
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
        const {comment} = this.props;
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
                <button className="btn btn-sm btn-info" onClick = {event => this.increaseCommentScore(comment.id)}>Like</button>
                <button className="btn btn-sm btn-info" onClick = {event => this.decreaseCommentScore(comment.id)}>Dislike</button>
                <button className="btn btn-sm btn-primary" onClick = {event => this.handleEditComment(this.state.editFlag ? false : true)}>{this.state.editFlag ? 'Save' : 'Edit'}</button>
                <button type="button" className="btn btn-sm btn-danger" onClick = {event => this.removeComment(comment.id)}>Delete</button>
                <hr />
            </div>
        )
    }
}


export default connect()(Comment)
