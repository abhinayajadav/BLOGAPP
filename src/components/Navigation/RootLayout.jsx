import React from 'react'
import Nav from '../Navigation/Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div  className='mb-2'>
        <div style={{minHeight:'80vh'}}>
        <Nav/>
        <Outlet/>
      
        </div>
        <Footer/>
    </div>
  )
}

export default RootLayout