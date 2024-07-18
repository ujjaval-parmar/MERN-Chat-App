import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoChatbubbleEllipses } from 'react-icons/io5'
import { FaImage, FaUserPlus, FaVideo } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { FiArrowUpLeft } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../store/userSlice'
import { toast } from 'react-toastify'
import { apiGanerator } from '../helper/apiGanerator'
import Avatar from './Avatar'
import EdituserDetails from './EdituserDetails'
import Divider from './Divider'
import SearchUser from './SearchUser'


const Sidebar = () => {

  const navigate = useNavigate();

  const { user } = useSelector(state => state?.user);
  const { socketConnection } = useSelector(state => state?.user);
  const dispatch = useDispatch();

  const [allUserData, setAllUserData] = useState([]);


  const [editUserOpen, setEditUserOpen] = useState(false);
  const [openSearhUser, setOpenSearchUser] = useState(false);

  useEffect(() => {

    if (socketConnection) {
      socketConnection.emit('sidebar', user?._id);

      socketConnection.on('conversation', (data) => {
        // console.log(data);

        const conversationUserData = data.map((item, index) => {

          if (item?.sender?._id === item?.receiver?._id) {
            return { ...item, userDetails: user?.sender }
          }
          else if (item?.receiver?._id !== user?._id) {
            return { ...item, userDetails: item?.receiver }

          } else {
            return { ...item, userDetails: item?.sender }

          }


        })
        setAllUserData(conversationUserData);
      })
    }


  }, [socketConnection, user]);


  console.log(allUserData);


  if (!socketConnection) {
    return;
  }

  const handleLogout = async () => {
    try {

      const response = await apiGanerator('user-logout', "get", true);

      dispatch(logoutUser());

      toast.success('User logout success!');

      navigate('/check-email');


    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className='w-full h-full grid grid-cols-[48px,1fr]'>

      <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between'>

        <div>

          <NavLink to={'/'} className='w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-slate-200 rounded ' title={'chat'}>
            <IoChatbubbleEllipses size={25} />
          </NavLink>

          <div className='w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-slate-200 rounded' title='Add Friend' onClick={() => setOpenSearchUser(true)}>
            <FaUserPlus size={25} />
          </div>

        </div>

        <div>

          <div className='w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-slate-200 rounded pr-2.5' title={"profile"}>

            <button className='flex items-center justify-center w-full h-full ml-2' title={user?.name} onClick={() => setEditUserOpen(true)}>
              <Avatar imgUrl={user?.profilePic} width={40} height={40} name={user?.name} userId={user?._id} />

            </button>

          </div>

          <div className='w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-slate-200 rounded pr-2.5' title={'logout'}>

            <button onClick={handleLogout}>
              <BiLogOut size={25} />
            </button>

          </div>



        </div>

      </div>


      <div className='w-full '>

        <h2 className='text-xl font-bold p-4  text-slate-800  text-center'>Message</h2>

        <Divider />

        <div className=' h-[calc(100vh-62px)] overflow-y-auto overflow-x-hidden scrollbar flex flex-col gap-4 '>

          {allUserData.length <= 0 ?
            (
              <div className='mt-12'>
                <div className='flex items-center justify-center my-4 text-slate-500'>
                  <FiArrowUpLeft size={50} />
                </div>
                <p className='text-lg text-center text-slate-500'>Explore users to starrt a conversation with.</p>
              </div>
            )
            :
            (
              allUserData.map((conv, index) => {
                
                return (
                  <NavLink to={"/"+conv?.receiver._id} key={conv?._id} className='flex items-center gap-2 border border-transparent py-2 px-1 hover:border hover:border-primary cursor-pointer'>

                    <div>
                      <Avatar
                        imgUrl={conv?.userDetails?.profilePic}
                        name={conv?.userDetails?.name}
                        width={50}
                        height={50}
                      />
                    </div>

                    <div>
                      <h3 className='text-ellipsis line-clamp-1'>{conv?.userDetails?.name}</h3>

                      <div className='text-slate-600 flex gap-1 items-center'>

                        <div>
                          {
                            conv?.lastMsg?.imageUrl && (
                              <span><FaImage/></span>
                            )
                          }
                        </div>

                        <div>
                          {
                            conv?.lastMsg?.videoUrl && (
                              <span><FaVideo/></span>
                            )
                          }
                        </div>


                        <p className='text-sm text-ellipsis line-clamp-1 '>{conv.lastMsg.text}</p>
                      </div>


                    </div>

                  </NavLink>
                )
              })
            )

          }


        </div>

      </div>


      {editUserOpen && <EdituserDetails onClose={() => setEditUserOpen(false)} user={user} />}


      {openSearhUser && <SearchUser onClose={() => setOpenSearchUser(false)} />}


    </div>
  )
}

export default Sidebar