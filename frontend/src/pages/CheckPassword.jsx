import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {PiUserCircle} from 'react-icons/pi'
import { toast } from 'react-toastify';
import { apiGanerator } from '../helper/apiGanerator';
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';


const CheckPassword = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [password, setPassword] = useState('');

  const location = useLocation();

  
  useEffect(()=>{
    if(!location?.state){
      navigate('/check-email');
    }
  },[location.state]);
  

  const handleSubmit = async(e) =>{
    e.preventDefault();

    try{

      const response = await apiGanerator('check-password',"POST", true, {password, userId: location.state._id});

      const responseData = await response.json();

      if(!responseData.success){
        throw new Error(responseData.error || responseData.message);
      }

      // console.log(responseData);

      dispatch(setUserDetails(responseData.data));

      localStorage.setItem('token', responseData?.data?.token);

      toast.success('User Login Success!');

      navigate('/');

    }catch(err){
      toast.error(err.message);
    }


  }


  return (
    <div>

    <div className='mt-5 flex items-center justify-center'>

      <div className='bg-white w-full max-w-md mx-2  sm:mx-auto mt-10 rounded overflow-hidden p-4 '>

        <div className='w-fit mx-auto mb-2 '>
          { <Avatar imgUrl={location?.state?.profilePic} width={120} height={120} name={location?.state?.name} userId={location?.state?._id}/> }
          <h2 className='text-center my-2 font-semibold text-xl'> {location?.state?.name}</h2>
        </div>


        <h3>Welcome to Chat-App</h3>

        <form className='grid gap-5 mt-6' onSubmit={handleSubmit}>

       

          <div className='flex items-center gap-5'>
            <label htmlFor="password" className='min-w-[70px]'>Password: </label>
            <input
              type="password"
              id="password"
              placeholder='Enter your Password'
              className='bg-slate-100 px-2 py-1 focus:outline-primary flex-1'
              value={password}
              onChange={(e=> setPassword(e.target.value))}
              required
            />
          </div>

          


          <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white tracking-wider leading-relaxed'>Login</button>


        </form>

        <p className='my-3 text-right'><NavLink to={'/forgot-password'} className='hover:text-primary font-semibold ml-2 '>Forgot Password?</NavLink></p>


      </div>

    </div>



  </div>
  )
}

export default CheckPassword