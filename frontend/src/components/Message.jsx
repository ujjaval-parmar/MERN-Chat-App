import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import moment from 'moment';
import Avatar from './Avatar';
import { HiDotsVertical } from 'react-icons/hi'
import { FaAngleLeft, FaImage, FaPlus, FaVideo } from 'react-icons/fa';
import { uploadFile } from '../helper/uploadFile';
import { IoClose } from 'react-icons/io5';
import { IoMdSend } from 'react-icons/io';

const Message = () => {

  const { userId } = useParams();

  const navigate = useNavigate();

  const { user, socketConnection } = useSelector(state => state?.user);

  const [userData, setUserData] = useState({});

  const [uploadImg, setUploadImg] = useState('');
  const [uploadImageLoading, setUploadImageLoading] = useState(false);

  const [message, setMessage] = useState({
    text: '',
    imageUrl: '',
    videoUrl: ''
  });

  const [allMessage, setAllMessage] = useState([]);
  const currentMessageRef = useRef();



  useEffect(() => {

    if (Object.keys(socketConnection || {}).length <= 0){
      navigate('/');
    }


    if (Object.keys(socketConnection || {}).length > 0) {


      socketConnection.emit('message-page', userId);

      socketConnection.on('message-user', (data) => {
        // console.log('userDatails: ', data);

        setUserData(data);
      })

      socketConnection.on('message', data => {
        // console.log("message Data: ", data);
        setAllMessage(data);
      })

    }

  }, [userId, socketConnection, user]);


  const handleUploadImage = async (e) => {

    const file = e.target.files[0];

    // setUploadImg(file);
    setUploadImageLoading(true);
    const fileData = await uploadFile(file);
    setUploadImageLoading(false);

    // console.log(fileData)
    setUploadImg(file);

    setMessage({ ...message, imageUrl: fileData.secure_url });


  }

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];

    // setUploadImg(file);
    setUploadImageLoading(true);
    const fileData = await uploadFile(file);
    setUploadImageLoading(false);

    console.log(fileData)
    setUploadImg(file);

    setMessage({ ...message, videoUrl: fileData.secure_url });
  }

  const handleClearUploadImage = () => {
    setMessage({ ...message, imageUrl: '' });
  }

  const handleClearUploadVideo = () => {
    setMessage({ ...message, videoUrl: '' });
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (message.text || message.imageUrl || message.videoUrl) {

      if (socketConnection) {

        socketConnection.emit('new message', {
          sender: user?._id,
          receiver: userId,
          text: message?.text || '',
          imageUrl: message?.imageUrl || '',
          videoUrl: message?.videoUrl || '',
          msgByUserId: user?._id
        });

      }

      setMessage({
        text: '',
        imageUrl: '',
        videoUrl: ''
      })

    }
  }

  useEffect(() => {

    if (currentMessageRef.current) {
      currentMessageRef?.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }

  }, [allMessage]);


  return (
    <div className='bg-[url("/wallpaper.jpeg")] bg-cover bg-no-repeat'>

      <header className='sticky top-0 h-16 bg-white z-10 flex justify-between items-center px-4'>

        <div className='flex items-center gap-4'>

          <NavLink to={"/"} className={'lg:hidden'}>
            <FaAngleLeft size={25} />
          </NavLink>


          <div>
            <Avatar imgUrl={userData?.profilePic} width={50} height={50} name={userData?.name} userId={userData?._id} />
          </div>

          <div>
            <h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1'>{userData?.name}</h3>
            <p className='my-0 text-sm'>{userData?.online ? <span className='text-primary'>online</span> : <span className='text-slate-400'>offline</span>}</p>
          </div>

        </div>

        <div className='cursor-pointer hover:text-primary'>
          <HiDotsVertical size={20} />
        </div>

      </header>


      {/* Show Message */}

      <section className='h-[calc(100vh-128px)]  overflow-y-auto overflow-x-hidden scrollbar relative bg-slate-200/60 '>



        {/* Show All Message */}
        <div ref={currentMessageRef} className='flex flex-col gap-3 py-2 px-1'>

          {allMessage?.length>0 && allMessage.map((msg, index) => {
            return (
              <div key={index} className={`bg-white p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${user._id === msg.msgByUserId ? 'ml-auto bg-teal-100' : ''}`}>

                <div className='w-full'>
                  {
                    msg?.imageUrl && (
                      <img src={msg?.imageUrl} alt="" className='w-full h-full object-scale-down' />
                    )
                  }
                </div>

                <div className="w-full">
                  {
                    msg?.videoUrl && (
                      <video src={msg?.videoUrl} alt="" className='w-full h-full object-scale-down' controls />
                    )
                  }
                </div>
                <p className='px-1'>{msg.text}</p>


                <p className='text-xs ml-auto w-fit'>{moment(msg.createdAt).format('hh:mm')}</p>
              </div>
            )
          })}

        </div>

        {/* Upload image Display */}
        {message?.imageUrl && <div className='w-full h-full bg-slate-700/30  flex items-center justify-center sticky inset-0'>

          <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600 ' onClick={handleClearUploadImage}>
            <IoClose size={30} />
          </div>

          <div className='bg-white p-3 rounded overflow-hidden'>
            <img src={message?.imageUrl} alt="upload message image" className='aspect-square w-full h-full max-w-sm m-2 object-scale-down' />
          </div>

        </div>}

        {/* Upload Video Display */}
        {message?.videoUrl && <div className='w-full h-full bg-slate-700/30  flex items-center justify-center sticky inset-0'>

          <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600 object-scale-down' onClick={handleClearUploadVideo}>
            <IoClose size={30} />
          </div>

          <div className='bg-white p-3 rounded overflow-hidden'>
            <video src={message?.videoUrl} controls className='aspect-square w-full h-full max-w-sm m-2' />
          </div>

        </div>}

        {uploadImageLoading && <div className='w-full h-full bg-slate-700/30  flex items-center justify-center sticky inset-0'>

          <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600 ' onClick={handleClearUploadVideo}>
            <IoClose size={30} />
          </div>

          <div className='bg-white p-3 rounded overflow-hidden'>
            <img src="/Loading_icon.gif" alt="" />
          </div>

        </div>}

      </section>


      {/* Send Message */}
      <section className='h-16 bg-white flex items-center px-3'>

        <div className='relative group'>

          <button className='flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white transition-all duration-500 '>
            <FaPlus size={22} />
          </button>

          {/* Video and Image */}
          <div className='bg-white shadow rounded absolute bottom-10 w-36 p-2 hidden group-hover:block'>
            <form>

              <label htmlFor='uploadImage' className='flex items-center p-2 gap-3 hover:bg-slate-200 cursor-pointer '>
                <div className='text-primary'>
                  <FaImage size={18} />
                </div>
                <p>Image</p>
              </label>

              <label htmlFor='uploadVideo' className='flex items-center p-2 gap-3 hover:bg-slate-200 cursor-pointer '>
                <div className='text-purple-500'>
                  <FaVideo size={18} />
                </div>
                <p>Video</p>
              </label>

              <input type="file" name="uploadImage" id="uploadImage" accept="image/*" className='hidden' onChange={handleUploadImage} />

              <input type="file" name="uploadVideo" id="uploadVideo" accept="video/*" className='hidden' onChange={handleUploadVideo} />

            </form>
          </div>

        </div>

        {/* Input Box */}

        <form className='h-full w-full flex items-center justify-between gap-3' onSubmit={handleSendMessage}>
          <input type="text"
            placeholder='Type Here Message...'
            className='py-1 px-4 outline-none w-full h-full overflow-y-auto'
            value={message.text}
            onChange={(e) => setMessage({ ...message, text: e.target.value })}
          />
          <button className='text-primary hover:text-secondary cursor-pointer'>
            <IoMdSend size={30} />
          </button>
        </form>



      </section>



    </div>
  )
}

export default Message