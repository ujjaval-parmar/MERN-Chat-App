import React, { useState } from 'react'
import { apiGanerator } from '../helper/apiGanerator';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {PiUserCircle} from 'react-icons/pi'

const CheckEmail = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const handleSubmit = async(e) =>{
    e.preventDefault();

    try{

      const response = await apiGanerator('check-email',"POST", false, {email});

      const responseData = await response.json();

      if(!responseData.success){
        throw new Error(responseData.error || responseData.message);
      }

      // console.log(responseData);

      navigate('/check-password',{
        state: responseData?.data
      })

    }catch(err){
      toast.error(err.message);
    }


  }

  return (
    <div>

      <div className='mt-5 flex items-center justify-center'>

        <div className='bg-white w-full max-w-md mx-2  sm:mx-auto mt-10 rounded overflow-hidden p-4 '>

          <div className='w-fit mx-auto mb-2'>
            <PiUserCircle size={80} />
          </div>


          <h3>Welcome to Chat-App</h3>

          <form className='grid gap-5 mt-6' onSubmit={handleSubmit}>

         

            <div className='flex items-center gap-5'>
              <label htmlFor="email" className='min-w-[70px]'>Email: </label>
              <input
                type="text"
                id="email"
                placeholder='Enter your Email'
                className='bg-slate-100 px-2 py-1 focus:outline-primary flex-1'
                value={email}
                onChange={(e=> setEmail(e.target.value))}
                required
              />
            </div>

            


            <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white tracking-wider leading-relaxed'>Let's Go</button>


          </form>

          <p className='my-3 text-center'> Don't have account? <NavLink to={'/register'} className='hover:text-primary font-semibold ml-2 '>Register</NavLink></p>


        </div>

      </div>



    </div>
  )
}

export default CheckEmail