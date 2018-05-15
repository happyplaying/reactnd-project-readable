import React, { Component } from 'react';
import { addComment, editPostCommentsCount } from '../actions';
import { connect } from 'react-redux';
import * as API from '../utils/api';
class AddComment extends Component {
    constructor() {
        super();
        this.state = {
            author:'',
            comment:'',
        }
    };
    handleChange(value, type){
        this.setState({[type]:value})
    }
    handleAddComment(event){
        event.preventDefault();
        let comment = {
            id: Math.random().toString(13).replace('0.', ''),
            timestamp: new Date().getTime(),
            body: this.state.comment,
            author: this.state.author,
            parentId: this.props.postId,
        }
        API.addComment(comment).then(results =>{
            console.log(results);
            this.props.dispatch(addComment(results));
            this.props.dispatch(editPostCommentsCount(results.parentId, 1));
            this.setState({author:'',comment:''})
        })
    }   
    render() {
        return (
            <form onSubmit={event => this.handleAddComment(event)}>
                <div className="form-group">
                    <label htmlFor="text">Add a comment:</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.comment} 
                        onChange={(event) => this.handleChange(event.target.value,'comment')}
                        required 
                    />

                </div>
                <div className="form-group">
                    <label htmlFor="text">Your name:</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.author} 
                        onChange={(event) => this.handleChange(event.target.value,'author')}
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-sm btn-primary">Submit</button>
            </form>
        )
    }
}
export default connect()(AddComment)
