import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
			    <h5 className="my-0 mr-md-auto font-weight-normal"><Link to="/" className="text-dark">Udacity Readable</Link></h5>
			    <nav className="my-2 my-md-0 mr-md-3">
			        <Link className="p-2 text-dark" to="/react">React</Link>
			        <Link className="p-2 text-dark" to="/redux">Redux</Link>
			        <Link className="p-2 text-dark" to="/udacity">Udacity</Link>
			    </nav>
			</div>
        )
    }
}
export default Navbar