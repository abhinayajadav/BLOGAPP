import React from 'react'
import { NavLink,Outlet } from 'react-router-dom'
function UserProfile() {
  return (
    <div>
    <NavLink to="articles"className='nav-link mt-4 fs-4'>
      <button  className='ms-5 p-3 rounded'>Articles</button>
    </NavLink>
    <Outlet/>
    </div>
  )
}

export default UserProfile