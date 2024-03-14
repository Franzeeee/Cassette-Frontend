import React from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function AlertMessage({type, message}) {

    const notify = () => {
        toast('test!');
    }

  return (
    <div className={`alert alert-${type} position-fixed top-0 start-50 translate-middle-x`} onClick={notify}>
        {message}
        <ToastContainer />
    </div>
  )
}

export default AlertMessage;