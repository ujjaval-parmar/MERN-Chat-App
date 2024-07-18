import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'

const AuthLayouts = () => {




  return (
    <>

        <header className='flex items-center justify-center py-4 h-20 shadow-md bg-white'>
            <img src="/logo.png" alt="logo" width={180} height={60} />
        </header>

        <Outlet />


    </>
  )
}

export default AuthLayouts