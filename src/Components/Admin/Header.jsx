import React from 'react';
import styles from '../../assets/css/admin-header.module.css'; // Import CSS module
import logo from '../../assets/img/Cassette-logo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className={`${styles.header} w-100 p-2 row m-0`}>
      <div className='col d-flex align-items-center justify-content-start'>
        <img src={logo} alt="cassette logo" className={styles.logo} />
        <Link to={'/'}><h1 className={styles['header-text']}>Cassette</h1></Link>
      </div>
    </header>
  )
}

export default Header;
