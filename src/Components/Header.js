import React from 'react'
import logo from './../images/RYOSHI.png'
import './bridge.css'

function Header() {
  return (
    <div className='header'>
      <nav class="navbar">
        <img src={logo} />
          <button class="home_btn">
            Home
          </button>
      </nav>
    </div>
  )
}

export default Header
