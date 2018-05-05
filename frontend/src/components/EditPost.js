import React, { Component } from 'react';
import { editPost} from '../actions';
import { connect } from 'react-redux';
import * as API from '../utils/api';
class EditPost extends Component {
    constructor() {
        super();
        this.state = {
            title:'',
            content:'',
        }
    };
    handleChange(value, type){
        this.setState({[type]:value})
    }
    handleEditPost(event){
        event.preventDefault();
        let post = {
            id: this.props.post.id,
            title: this.state.title,
            body: this.state.content,
        }
        API.editPost(post).then(results =>{
            this.props.dispatch(editPost(results));
            document.getElementById("closeEditPostModal").click();
        })
    }
    componentWillMount(){
        this.setState({
            title:this.props.post.title,
            content:this.props.post.body,
        })
    }
    render() {
        return (
            <div className="modal fade" id="editPostModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit a new post</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={event => this.handleEditPost(event)}>
                                <div className="form-group">
                                    <label htmlFor="title">Title:</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={this.state.title} 
                                        onChange={(event) => this.handleChange(event.target.value,'title')}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="content">Content:</label>
                                    <textarea 
                                        className="form-control"
                                        value={this.state.content} 
                                        onChange={(event) => this.handleChange(event.target.value,'content')} 
                                        rows="3"
                                        required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal" id="closeEditPostModal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect()(EditPost)
