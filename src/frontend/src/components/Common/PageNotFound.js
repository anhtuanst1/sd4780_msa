import React, { Fragment } from "react";

export default class PageNotFound extends React.Component {
  render() {
    return (
        <Fragment>
            <div className="container">
                <div className='row justify-content-center mt-5'>
                    <div className='col-md-10 col-xl-8 text-center'>
                        <div className="row">
                            <div className='col-md-6 mx-auto'>
                                <h1 className='font-bold'>404</h1>
                                <h3>Page Not Found</h3>
                                <p >
                                    The page you are looking for doesn't exist or another error occured. Go to 
                                    <a variant="link" href='/' className='align-baseline ms-2 p-0'>Home Page</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
  }
}
