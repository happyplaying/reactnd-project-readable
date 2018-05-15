import React, { Component } from 'react';
import * as API from '../utils/api';
import { connect } from 'react-redux';
import { addPost, removePost, increasePostScore, decreasePostScore} from '../actions';
import EditPost from './EditPost';
class PostActions extends Component {
    constructor() {
        super();
        this.state = {
        }
    };
    handleDelete(type, id){
        if(type === 'post'){
            this.props.removePost(id);
        }
    }
    increasePostScore(id){
        API.increasePostScore(id).then(results =>{
            this.props.increasePostScore(id)
        })
    }
    decreasePostScore(id){
        API.decreasePostScore(id).then(results =>{
            this.props.decreasePostScore(id)
        })
    }
    removePost(id){
        API.removePost(id).then(results =>{
            this.props.removePost(id)
        })
    }
    render() {
        const { post } = this.props;
        return (
            <div>
                <button className="btn btn-sm btn-info" onClick = {event => this.increasePostScore(post.id)}>Like</button>
                <button className="btn btn-sm btn-info" onClick = {event => this.decreasePostScore(post.id)}>Dislike</button>
                <button className="btn btn-sm btn-primary" data-toggle="modal" data-target="#editPostModal">Edit</button>
                <button type="button" className="btn btn-sm btn-danger" onClick = {event => this.removePost(post.id)}>Delete</button>
                <EditPost
                    post = {post}
                    title = 'Edit a post' 
                />  
            </div>
        )
    }
}
const mapStateToProps = ({posts,comments},{postId}) =>{
    return {
        post : posts.filter(p => p.id === postId)[0],
    }
}
const mapDispatchToProps = dispatch =>({
    addPost: (data) => dispatch(addPost(data)),
    removePost: (id) => dispatch(removePost(id)),
    increasePostScore: (id) => dispatch(increasePostScore(id)),
    decreasePostScore: (id) => dispatch(decreasePostScore(id)),
})
export default connect(mapStateToProps,mapDispatchToProps)(PostActions)
