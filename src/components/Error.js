import React from 'react'
import '../style/Error.css'

const ErrorMessage = ({message, onClose=f=>f}) => {

    return (
        <div className="error">
            {message}
            <span className="error-close" onClick={() => onClose()}>&#10006;</span>
        </div>
    )
}

export default ErrorMessage