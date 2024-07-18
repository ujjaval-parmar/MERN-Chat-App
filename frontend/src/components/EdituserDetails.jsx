import React, { useRef, useState } from 'react'
import Avatar from './Avatar';
import { uploadFile } from '../helper/uploadFile';
import Divider from './Divider';
import { toast } from 'react-toastify';
import { apiGanerator } from '../helper/apiGanerator';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const EdituserDetails = ({ onClose, user }) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: user?.name,
        profilePic: user?.profilePic
    });

    
    const [uploadImgLoading, setUploadImageLoading] = useState(false);

    const uploadImageInputRef = useRef();

    const handleOpenUploadImg = e =>{
        uploadImageInputRef.current.click();
    }


    const handleOnChange = e => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleUploadImg = async (e) => {
        const file = e.target.files[0];

        // setUploadImg(file);
        setUploadImageLoading(true);
        const fileData = await uploadFile(file);
        setUploadImageLoading(false);

        // console.log(fileData)
        
        setFormData({ ...formData, profilePic: fileData.secure_url })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{

            const response = await apiGanerator('user-update', "PUT", true, formData);

            const responseData = await response.json();

            // console.log(responseData);

            dispatch(setUserDetails(responseData.data));

            toast.success(responseData.message);

            onClose();

        }catch(err){
            toast.error(err.message);
        }


    }

    return (
        <div className='fixed w-screen h-screen flex items-center justify-center inset-0 z-20'>

            <div className='bg-white p-6 m-1 rounded w-full max-w-md relative z-40 grid gap-3 mt-3'>

                <h2 className='font-semibold'>Profile Deatils</h2>
                <p className='text-sm'>Edit User Details</p>

                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

                    <div className='w-full flex items-center gap-4'>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            id='name'
                            value={formData?.name}
                            onChange={handleOnChange}
                            className='flex-1 py-1 px-2 focus:outline-primary border rounded'
                        />
                    </div>

                    <div>


                        <div>Profile Picture:</div>
                        <div className='my-1 flex items-center  gap-8'>
                            <Avatar imgUrl={!uploadImgLoading ?formData?.profilePic : 'Loading_icon.gif'} width={60} height={60} name={user?.name} userId={user?._id} />

                            <label htmlFor='profilePic'>
                                <button type='button' className='font-semibold' onClick={handleOpenUploadImg} >Change Profile Picture


                                </button>

                                <input type="file" id="profilePic" className='hidden'
                                    onChange={handleUploadImg}
                                    ref={uploadImageInputRef}
                                />
                            </label>

                        </div>




                    </div>

                    <Divider />

                    <div className='w-full flex items-center justify-end gap-5'>

                        <button className='border-primary border px-4 py-1 text-primary cursor-pointer rounded  hover:bg-primary hover:text-white transition-all duration-500' onClick={onClose}>Cancel</button>
                        <button className='border-primary bg-primary tex-white border px-4 py-1 cursor-pointer  rounded hover:bg-white hover:text-primary transition-all duration-500' onClick={handleSubmit}>Save</button>
                    </div>

                </form>


            </div>

            <div className='absolute  bg-black/40 inset-0 z-30' onClick={() => onClose()}>

            </div>

        </div>
    )
}

export default EdituserDetails