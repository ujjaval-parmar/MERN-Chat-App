import React from 'react'
import Avatar from './Avatar'
import { NavLink } from 'react-router-dom'

const UserSearchCard = ({user, onClose}) => {

 




  return (
    <NavLink to={`/${user?._id}`}  className='flex items-center gap-4 p-2 lg:p-4 border border-transparent border-b-slate-300 hover:border-primary rounded cursor-pointer' onClick={onClose} >

        <div>
          <Avatar imgUrl={user?.profilePic} naame={user?.name} width={60} height={60} userId={user?._id}/>
        </div>

        <div>

          <div className='font-semibold text-ellipsis line-clamp-1'>
            {user?.name}
          </div>

          <div>
            <p className='text-sm text-ellipsis line-clamp-1'>
            {user?.email}
            </p>
          </div>

          

        </div>



    </NavLink>
  )
}

export default UserSearchCard