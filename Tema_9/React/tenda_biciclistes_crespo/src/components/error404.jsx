import React from 'react';
import errorimg from '../error404img.jpg';

function Error404() {
    return (
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <h2 className='text-center'>Error 404</h2>
            <img src={errorimg} alt="Imatge Error404" />
        </div>
    )
}

export default Error404;