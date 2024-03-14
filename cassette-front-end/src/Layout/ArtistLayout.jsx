import React from 'react'
import Header from '../Components/Artist/Header'
import SideBar from '../Components/Artist/SideBar'
import styles from '../assets/css/ArtistStudio/artist-layout.module.css'

function ArtistLayout({children, active}) {
  return (
    <div className={`container-fluid p-0 m-0 w-100 h-100`}>
        <Header />
        <div className={`row d-flex flex-row ${styles['main-content']}`}>
          <SideBar active={active}/>
          {children}
        </div>
    </div>
  )
}

export default ArtistLayout