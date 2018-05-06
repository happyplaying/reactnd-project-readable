import React, { Component } from 'react';
import './App.css';
import Post from './Post';
import AddPost from './AddPost';
import { connect } from 'react-redux';


class Category extends Component {
    constructor() {
        super();
        this.state = {
            sort:'timestamp',
        }
    };
    handleSort(type){
        this.setState({sort:type});
    };
    render() {
        const { category } = this.props.match.params;
        let posts = this.props.posts.filter( p => p.category === category);
        posts.sort((a,b) => (b[this.state.sort] - a[this.state.sort]));
        return (
            <div>
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">{category} category</h1>
                </div>
                <hr />
                <div className="row">
                    <div className="col-sm-9">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addPostModal">New post</button>
                        <AddPost
                            category = {category} 
                        />
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
                {posts.map(post=>(
                    <Post key={post.id} 
                        post = {post}
                    />
                ))}
            </div>
        )
    }
}
const mapStateToProps = ({posts,categories}) =>({
    posts,
    categories,
})
export default connect(mapStateToProps)(Category)
