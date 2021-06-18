import React from 'react';

const Button = ({type, className, name}) => {
    return(
        <div className="col-lg-3 col-md-3 col-5">
            <button type={type} className={className}>{name}</button>
        </div>
    )
}

export default Button;