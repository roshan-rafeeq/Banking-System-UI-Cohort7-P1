import React from 'react'

const Alert = (props) => {
    return (
        props.message && (
            <div className="alert alert-primary" role="alert">
                {props.message}
            </div>
        )
    );
}

export default Alert
