import React, { useState } from 'react'

import HeaderMP from '../Components/HeaderMP'
import SideNavMP from '../Components/SideNavMP'
import { Unverified } from '../Components/Error/Unverified'


function LayoutMP({children, activePage}) {
  const [verified, setVerified] = useState(null);

  const handleVerification = (status) => {
    setVerified(status)
  }

  return (
    <div className="container-fluid p-0 vw-100 vh-100 d-flex flex-column layout-container position-relative ">
        <HeaderMP verified={verified}/>
        <div className="row w-100 h-100 m-0 overflow-hidden">
        <Unverified setVerification={handleVerification}/>
          <SideNavMP activePage={activePage} />
          {/* Content Appended Here */}
          <div className="col overflow-auto p-0 m-0 container-parent h-100 ">
            {children}
          </div>
        </div>
    </div>
  )
}

export default LayoutMP