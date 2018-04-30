import React, { Component } from 'react';
import './App.css';
import * as API from '../utils/api';
import Footer from './Footer';
import Post from './Post';
import Category from './Category';
import AddPost from './AddPost';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { addPost, addCategory} from '../actions';
import { connect } from 'react-redux'

class App extends Component {
    constructor() {
        super();
        this.state = {
            sort:'date',
        }
    };
    handleSort(type){
        this.setState({sort:type});
    };
    componentDidMount(){
        API.categories().then(categories =>{
            this.props.addCategory(categories);
        });
        API.posts().then(posts =>{
            for(let i of posts){
                i.date = new Date(i.timestamp).toString();
            }
            this.props.addPost(posts.sort((a,b) => (b.timestamp - a.timestamp)));
        })
        API.post('8xf0y6ziyjabvozdd253nd').then(post =>{
            console.log(post)
            //this.setState({categories:categories});
        })
    }
    render() {
        this.props.posts.sort((a,b) => (b[this.state.sort] - a[this.state.sort]));
        return (
            <div className="container">
                <Route exact path = "/" render = {() => (
                    <div>
                        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                            <h1 className="display-4">Readable</h1>
                            <p className="lead">Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.</p>
                        </div>
                        <div className="card-deck mb-3 text-center">
                            {this.props.categories.map(category=>(
                                <div className="card mb-4 box-shadow category-card" key={category.name}>
                                    <div className="card-header">
                                        <h4 className="my-0 font-weight-normal">{category.name}</h4>
                                    </div>
                                    <div className="card-body">
                                        <p>{category.description}</p>                                        
                                        <a href={`/${category.path}`}>
                                            <button type="button" className="btn btn-lg btn-block btn-outline-primary">View details</button>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-9">
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addPostModal">New post</button>
                                <AddPost />
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
                        {this.props.posts.map(post=>(
                            <Post key={post.id} 
                                post = {post}
                            />
                        ))}
                    </div>
                )} />
                <Route exact path = "/:category" component = {Category} />
                <Footer />
            </div>
        )
    }
}
const mapStateToProps = ({posts,categories}) =>({
    posts,
    categories,
})
const mapDispatchToProps = dispatch =>({
    addPost: (data) => dispatch(addPost(data)),
    addCategory: (data) => dispatch(addCategory(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(App)
