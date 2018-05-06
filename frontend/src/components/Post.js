import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { dateYYYYMMDDHHMMSS } from '../utils/helpers';
class Post extends Component {
    render() {
        const {post} = this.props;
        return (
            <div className="card post-card" key={post.id}>
                <div className="card-header">
                    {post.category}
                </div>
                <div className="card-body">
                    <h3 className="blog-post-title">{post.title}</h3>
                    <p className="blog-post-meta">{dateYYYYMMDDHHMMSS(post.timestamp)}, by {post.author}</p>
                    <p>{post.body.substring(0,150)} ...</p>
                    <hr />
                    <p >
                        {post.voteScore >= 0 ? (
                            <i className="far fa-thumbs-up"></i>
                        ):(
                            <i className="far fa-thumbs-down"></i>
                        )} {post.voteScore}&nbsp;&nbsp;&nbsp;&nbsp;<i className="far fa-comments"></i> {post.commentCount} {post.commentCount > 1 ? 'comments': 'comment'}
                    </p>
                </div>
                <div className="card-footer text-muted">
                    <Link to = {`/${post.category}/${post.id}`}>View details</Link>
                </div>
            </div>
        )
    }
}


export default Post
