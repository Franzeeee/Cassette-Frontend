import React from 'react'

import HeaderMP from '../Components/HeaderMP'
import SideNavMP from '../Components/SideNavMP'


function LayoutMP({children, activePage}) {
  return (
    <div className="container-fluid p-0 vw-100 vh-100 d-flex flex-column layout-container">
        <HeaderMP/>
        <div className="row w-100 h-100 m-0 overflow-hidden">
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