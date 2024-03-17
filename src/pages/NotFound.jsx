import React from 'react'
import notFound from '../assets/img/not-found.png'
import styles from '../assets/css/404.module.css'
import { Link } from 'react-router-dom';
function NotFound() {
  return (
    <>
        <div className={`${styles['container']} container d-flex vh-100 w-100 justify-content-center align-items-center flex-column`}>

              <h1 className={`${styles['headerText']}`}>
                ERROR 404
              </h1>
              <h4 className={`${styles['headerText2']}`}>
                PAGE NOT FOUND
              </h4>
              <Link to={'/'}><button>Back to Home</button></Link>

        </div>
    </>
  )
}

export default NotFound