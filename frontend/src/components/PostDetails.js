import React, { Component } from 'react';
import * as API from '../utils/api';
import { connect } from 'react-redux';
import Comment from './Comment';
import { addPost, receiveComments, removePost, increasePostScore, decreasePostScore} from '../actions';
import EditPost from './EditPost';
import AddComment from './AddComment';
import NotFound from './NotFound';
import { dateYYYYMMDDHHMMSS } from '../utils/helpers';
class PostDetails extends Component {
    constructor() {
        super();
        this.state = {
            sort:'timestamp',
        }
    };
    handleSort(type){
        this.setState({sort:type});
    };
    componentDidMount(){
        const {postId } = this.props.match.params;
        API.comments(postId).then(comments =>{
            this.props.receiveComments(comments, postId)
        })
    }
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
        const { category, postId } = this.props.match.params;
        let post = this.props.posts.filter(p => p.id === postId);
        this.props.comments[postId] && this.props.comments[postId].sort((a,b) => (b[this.state.sort] - a[this.state.sort]));
        return (
            <div>
                { post.length === 0 ? (
                    <NotFound />
                ) : (
                    <div>
                        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                            <h1 className="display-4">{category} category</h1>
                        </div>
                        <hr />
                        { post.map( p => (
                            <div className="post-body" key={p.id}>
                                <h3 className="blog-post-title">{p.title}</h3>
                                <p className="blog-post-meta">{dateYYYYMMDDHHMMSS(p.timestamp)}, by {p.author}</p>
                                <p>{p.body.substring(0,150)} ...</p>
                                <p >
                                    {p.voteScore >= 0 ? (
                                        <i className="far fa-thumbs-up"></i>
                                    ):(
                                        <i className="far fa-thumbs-down"></i>
                                    )} {p.voteScore}&nbsp;&nbsp;&nbsp;&nbsp;<i className="far fa-comments"></i> {p.commentCount} {p.commentCount > 1 ? 'comments': 'comment'}
                                </p>
                                <button className="btn btn-sm btn-info" onClick = {event => this.increasePostScore(p.id)}>Like</button>
                                <button className="btn btn-sm btn-info" onClick = {event => this.decreasePostScore(p.id)}>Dislike</button>
                                <button className="btn btn-sm btn-primary" data-toggle="modal" data-target="#editPostModal">Edit</button>
                                { post.map( p => (
                                    <button type="button" className="btn btn-sm btn-danger" key = {p.id} onClick = {event => this.removePost(p.id)}>Delete</button>
                                ))}
                                { post.map( p => (
                                    <EditPost
                                        key={p.id}
                                        post = {p}
                                        title = 'Edit a post' 
                                    />  
                                ))}
                                <hr />
                                <div className="row">
                                    <div className="col-sm-9">
                                        <h4 className="blog-post-title">Comments</h4>
                                    </div>
                                    <div className="col-sm-3 pull-right">
                                        <div className="form-group">
                                          <select className="form-control" onChange={event => this.handleSort(event.target.value)}>
                                            <option value="timestamp">Sort by: Date</option>
                                            <option value="voteScore">Sort by: Vote Score</option>
                                          </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <hr />
                                { this.props.comments[postId] && this.props.comments[postId].map(c => (
                                    <Comment
                                        key={c.id}
                                        comment = {c}
                                        postId = {postId}
                                    />
                                ))}
                                { post.map( p => (
                                    <AddComment
                                        key={p.id}
                                        postId = {p.id}
                                    />
                                ))}                                
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }
}
const mapStateToProps = ({posts,comments}) =>{
    return {
        posts,
        comments
    }
}
const mapDispatchToProps = dispatch =>({
    addPost: (data) => dispatch(addPost(data)),
    receiveComments: (postId,comments) => dispatch(receiveComments(postId,comments)),
    removePost: (id) => dispatch(removePost(id)),
    increasePostScore: (id) => dispatch(increasePostScore(id)),
    decreasePostScore: (id) => dispatch(decreasePostScore(id)),
})
export default connect(mapStateToProps,mapDispatchToProps)(PostDetails)
