import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { NavLink, useNavigate } from 'react-router-dom';
import { uploadFile } from '../helper/uploadFile';
import { toast } from 'react-toastify';
import { apiGanerator } from '../helper/apiGanerator';

const RegisterPage = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profilePic: ''
  });

  const [uploadImg, setUploadImg] = useState('');
  const [uploadImageLoading, setUploadImageLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleUploadImg = async (e) => {
    const file = e.target.files[0];

    // setUploadImg(file);
    setUploadImageLoading(true);
    const fileData = await uploadFile(file);
    setUploadImageLoading(false);

    // console.log(fileData)
    setUploadImg(file);
    setFormData({ ...formData, profilePic: fileData.secure_url })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{

      const response = await apiGanerator('register', "POST", false, formData )

      const responseData = await response.json();

      if(!responseData.success){
        throw new Error(responseData.error || responseData.message);
      }

      toast.success(responseData.message);

      navigate('/check-email');

    }catch(err){
      toast.error(err.message);
    }


  }




  return (
    <div className='mt-5 flex items-center justify-center'>

      <div className='bg-white w-full max-w-md mx-2  sm:mx-auto mt-10 rounded overflow-hidden p-4 '>

        <h3>Welcome to Chat-App</h3>

        <form className='grid gap-5 mt-6' onSubmit={handleSubmit}>

          <div className='flex items-center gap-5'>
            <label htmlFor="name" className='min-w-[70px]'>Name: </label>
            <input
              type="text"
              id="name"
              placeholder='Enter your Name'
              className='bg-slate-100 px-2 py-1 focus:outline-primary flex-1'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='flex items-center gap-5'>
            <label htmlFor="email" className='min-w-[70px]'>Email: </label>
            <input
              type="text"
              id="email"
              placeholder='Enter your Email'
              className='bg-slate-100 px-2 py-1 focus:outline-primary flex-1'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='flex items-center gap-5'>
            <label htmlFor="password" className='min-w-[70px]'>Password: </label>
            <input
              type="text"
              id="password"
              placeholder='Enter your Password'
              className='bg-slate-100 px-2 py-1 focus:outline-primary flex-1'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>


          <div className='flex items-center gap-5'>
            <label htmlFor="profilePic" className='min-w-[70px] w-full'>
              <div className=' h-14 bg-slate-200 flex justify-center items-center hover:border-2 border-primary cursor-pointer'>

                {!uploadImageLoading ? <p className='max-w-[250px] text-ellipsis line-clamp-1'>{uploadImg?.name ? uploadImg?.name : 'Upload Profile Picture'}</p> :
                  <p className='max-w-[250px] text-ellipsis line-clamp-1'>
                    <span className='w-8 h-8   rounded-full border-4 border-t-0 border-secondary block animate-spin'></span>
                  </p>}

                {uploadImg?.name && <button className='text-lg ml-2 hover:text-red-600' type='button' onClick={(e) => {
                  if (uploadImg?.name) {
                    e.preventDefault();
                    setUploadImg('');
                  }
                }}>
                  <IoClose />
                </button>}

              </div>

            </label>

            <input type="file" id="profilePic" className='hidden' onChange={handleUploadImg} />



          </div>


          <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white tracking-wider leading-relaxed'>Register</button>


        </form>

        <p className='my-3 text-center'> Already have account? <NavLink to={'/check-email'} className='hover:text-primary font-semibold ml-2 '>LogIn</NavLink></p>


      </div>

    </div>
  )
}

export default RegisterPage