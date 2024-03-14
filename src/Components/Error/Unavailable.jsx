import React from 'react'
import faConstruct from '../../assets/img/under-construction.png'

function Unavailable() {
  return (
    <div className='col d-flex align-items-center flex-column justify-content-center h-100 bg-dark'>
      <img src={faConstruct} width={"300px"} />
      <h2 className='m-0 text-light fw-bold mb-1'>Page Under Construction</h2>
      <p className='text-light m-0'>Sorry for the inconvenience. We are working in it as soon as possible.</p>
    </div>
  )
}

export default Unavailable