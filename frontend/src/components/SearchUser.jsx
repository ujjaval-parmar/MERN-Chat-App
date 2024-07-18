import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { toast } from 'react-toastify';
import { apiGanerator } from '../helper/apiGanerator';
import UserSearchCard from './UserSearchCard';
import { useSelector } from 'react-redux';

const SearchUser = ({ onClose }) => {

    const {user} = useSelector(state=> state.user);


    const [searchUser, setSearchUser] = useState('');
    const [searchUserData, setSearchUserData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getSearchUsersData = async () => {
        try {

            setLoading(true);

            const response = await apiGanerator('all-users?searchQuery=' + searchUser, "GET", true);

            const responseData = await response.json();

            if (!responseData.success) {
                throw new Error(responseData.error || responseData.message);
            }

            
            setSearchUserData(responseData.data);


        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        getSearchUsersData()



    }, [searchUser]);

    return (
        <div className='w-screen h-screen  fixed inset-0 p-1 z-20'>

            <div className='relative z-40 w-full max-w-lg  mx-auto  mt-10 '>

                <div className='bg-white  h-14  flex items-center relative rounded overflow-hidden'>

                    <input
                        type="text"
                        placeholder='Search User by name, email...'
                        className='w-full outline-none py-1 h-full px-4'
                        onChange={(e) => setSearchUser(e.target.value)}
                        value={searchUser}

                    />

                    <div className='pr-2 text-slate-700 flex items-center justify-center'>
                        <IoSearchOutline size={28} />
                    </div>



                </div>


                <div className='bg-white mt-2 w-full p-4 rounded overflow-y-auto scrollbar'>
                    {
                        !loading && searchUserData.length <= 0 && (
                            <p className='text-center text-slate-500'>No user found!</p>
                        )
                    }

                    {
                        loading && (
                            <p className='w-full text-ellipsis line-clamp-1 my-4 flex items-center justify-center'>
                                <span className='w-8 h-8   rounded-full border-4 border-t-0 border-secondary block animate-spin '></span>
                            </p>
                        )
                    }

                    {
                        searchUserData.length > 0 && !loading && searchUserData.map(item => {
                            if(user._id == item._id){
                                return null
                            }
                            return (
                                <UserSearchCard key={item._id} user={item} onClose={onClose} />
                            )
                        })
                    }


                    <div className='w-full mt-3  '>
                        <button className='border-primary border px-4 py-1 text-primary cursor-pointer rounded  hover:bg-primary hover:text-white transition-all duration-500 block ml-auto' onClick={onClose}>Cancel</button>
                    </div>


                </div>




            </div>


            <div className='absolute w-screen h-screen inset-0 bg-black/40 z-30' onClick={onClose}>

            </div>





        </div>
    )
}

export default SearchUser