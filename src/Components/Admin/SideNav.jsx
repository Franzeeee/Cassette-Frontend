import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUsers, faFileAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import '../../assets/css/side-nav.css';

import { Link } from 'react-router-dom';

function SideNav({activePage}) {
    const active = activePage;
    const navItems = [
        { text: 'Dashboard', icon: faChartLine, link: '/dashboard' },
        { text: 'User Management', icon: faUsers, link: '/user_management' },
        { text: 'Artist Management', icon: faUser, link: '/artist_management' },
        { text: 'Content Management', icon: faFileAlt, link: '/content_management' }
    ];

    return (
        <nav className="col-3">
            <ul className='w-100 d-flex flex-column list-unstyled align-items-start gap-4 py-4 px-2'>
                {navItems.map((item, index) => (
                    <Link to={item.link} >
                        <li key={index} className={`d-flex align-items-center ${item.text === active ? 'active' : ''}`}>
                            <FontAwesomeIcon icon={item.icon} />
                            <span className="ml-2">{item.text}</span>
                        </li>
                    </Link>
                ))}
            </ul>
        </nav>
    );
}

export default SideNav;
