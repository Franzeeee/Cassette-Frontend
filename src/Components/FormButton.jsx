import React from 'react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FormButton({isLoading, text}) {
  return (
    <div className="d-flex align-items-center justify-content-center mt-3">
<button className="login-btn w-50 p-2 rounded-3" disabled={isLoading}>{isLoading ? <FontAwesomeIcon icon={faSpinner} className='fa-spin'/> : text}</button>
    </div>
  )
}

export default FormButton;