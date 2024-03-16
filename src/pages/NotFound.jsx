import React from 'react'
import notFound from '../assets/img/not-found.png'

function NotFound() {
  return (
    <>
        <div className="container d-flex vh-100 w-100 justify-content-center align-items-center ">
            <img src={notFound} width={'30%'} style={{minWidth: '150px'}}/>
        </div>
    </>
  )
}

export default NotFound