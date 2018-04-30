import React, { Component } from 'react';
class Footer extends Component {
    render() {
        const year = (new Date()).getFullYear();
        return (
            <footer className="pt-4 my-md-5 pt-md-5 border-top">
                <div className="row">
                    <div className="col-12 col-md">
                        <small className="d-block mb-3 text-muted">&copy; {year}</small>
                    </div>
                </div>
            </footer>
        )
    }
}
export default Footer;
