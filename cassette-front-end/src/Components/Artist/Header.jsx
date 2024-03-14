import React from 'react'
import logo from '../../assets/img/Cassette-logo.png'
import addMusicLogo from '../../assets/img/create-music.png'
import styles from '../../assets/css/ArtistStudio/artist-header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import profile from '../../assets/img/artist-img.jpg'
import { Link } from 'react-router-dom'


function Header() {
  return (
    <div className={`row w-100 py-1 m-0 bg-dark text-light nav artist-header ${[styles.nav]}`}>
        <div className="col-2 d-flex align-items-center justify-content-start gap-2">
            <img src={logo} alt="" width={"45px"}/>
            <Link to={'/'}><p className='mb-0 fs-4 fw-bolder text-light'>Cassette</p></Link>
        </div>
        <div className="col-7 d-flex align-items-center justify-content-center">
            <form className="form-inline my-2 my-lg-0 w-50 position-relative">
                <FontAwesomeIcon icon={faSearch} className={`position-absolute ${styles['search-icon']}`}/>
                <input className={`${styles['form-control']} ${styles['border-main']} form-control bg-transparent text-light border-2 ${styles['padding-left-2']}`} type="search" placeholder="Search across your profile" aria-label="Search" />
            </form>
        </div>
        <div className="col-3 d-flex align-items-center justify-content-end gap-4">
            <div className={`border w-auto d-flex align-items-center justify-content-center p-2 gap-2 cursor-pointer ${styles['border-main']} ${styles['create-content']}`}>
                <img src={addMusicLogo} width={"25px"} alt="" className=''/>
                <p className='m-0 text-uppercase create-p fw-medium '>Create</p>
            </div>
            <div className={styles['profile']} title="Account">
                <img src={profile} width={"40px"} className='' />
            </div>
        </div>
    </div>
  )
}

export default Header