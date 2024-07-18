import React, { useEffect } from 'react'
import { Outlet, useNavigate, useRoutes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import { apiGanerator } from './helper/apiGanerator';


const App = () => {

  








  return (


    <main>

      <ToastContainer 
      position='top-center'
       newestOnTop={true}
      className=''
      />

      

      <Outlet />
      
    </main>


  )
}

export default App