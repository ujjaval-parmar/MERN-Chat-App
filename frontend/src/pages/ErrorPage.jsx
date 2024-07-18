import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'


const ErrorPage = () => {

  const navigate = useNavigate();
  const error =  useRouteError();

  // console.log(error.message);

  return (
    <div className='text-center my-16'>
      {/* <h2>Error: {error.message ? error.message : error}</h2> */}
      {error.statusText ? 
      <h2 className='text-red-700'>{error.statusText} : {error.error.message}</h2> :
      <h2 className='text-red-700'>{error.message}</h2>
      }
      
      <button  className='py-1 px-2 bg-red-600 text-white my-4 hover:text-red-700'onClick={()=> navigate('/')}>Go Home</button>
    </div>
  )
}

export default ErrorPage