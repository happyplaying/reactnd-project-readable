import React, { Component } from 'react';
import { addPost} from '../actions';
import { connect } from 'react-redux';
import * as API from '../utils/api';
class AddPost extends Component {
    constructor() {
        super();
        this.state = {
            title:'',
            category:'',
            content:'',
            author:'',

        }
    };
    handleChange(value, type){
        this.setState({[type]:value})
    }
    handleAddPost(event){
        event.preventDefault();
        let post = {
            id: Math.random().toString(13).replace('0.', ''),
            timestamp: new Date().getTime(),
            title: this.state.title,
            body: this.state.content,
            author: this.state.author,
            category: this.state.category,
        }
        API.addPost(post).then(results =>{
            results.date = new Date(results.timestamp).toString();
            this.props.dispatch(addPost(results));
            document.getElementById("closeAddPostModal").click();
        })
    }
    render() {
        return (
            <div className="modal fade" id="addPostModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add a new post</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={event => this.handleAddPost(event)}>
                                <div className="form-group">
                                    <label htmlFor="category">Select a category:</label>
                                    <select className="form-control" value={this.state.category} onChange={(event) => this.handleChange(event.target.value,'category')}>
                                        <option value="" disabled>---Category---</option>
                                        <option value="react">React</option>
                                        <option value="redux">Redux</option>
                                        <option value="udacity">Udacity</option>
                                    </select>
                                </div>
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
                                <div className="form-group">
                                    <label htmlFor="author">Author:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={this.state.author} 
                                        onChange={(event) => this.handleChange(event.target.value,'author')}
                                        required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal" id="closeAddPostModal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect()(AddPost)
