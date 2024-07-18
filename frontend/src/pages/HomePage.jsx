import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import { setSocketConnection, setUserDetails, setUserOnline } from '../store/userSlice';
import { toast } from 'react-toastify';
import { apiGanerator } from '../helper/apiGanerator';


const HomePage = () => {

    const { socketConnection } = useSelector(state => state?.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { pathname } = useLocation();

    


    const getUserDetails = async () => {
        try {

            const response = await apiGanerator('user-detail', "GET", true);

            const responseData = await response.json();

            if (!response.ok) {
                dispatch(setUserDetails(null));
                navigate('/check-email');
                return;
            }

            dispatch(setUserDetails(responseData.data));



        } catch (err) {
            toast.error(err.message);
        }
    }

    

    useEffect(() => {
        getUserDetails();
    }, []);

    // Socket Connection
    useEffect(() => {


            const socketConnection = io('http://localhost:5000', {
                auth: {
                    token: localStorage.getItem('token')
                },
                // "Access-Control-Allow-Origin": "*",

            });

            socketConnection.on('onlineUser', data => {
                // console.log(data);
                dispatch(setUserOnline(data));
            })

            dispatch(setSocketConnection(socketConnection));

            return () => socketConnection.disconnect();




    }, []);



    return (
        <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>

            <aside className={`bg-white ${pathname !== '/' && 'hidden'} lg:block`}>
                <Sidebar />
            </aside>

            <section className={`${pathname === '/' && 'hidden'}`}>
                <Outlet />
            </section>

            <div className={`hidden justify-center items-center flex-col gap-4   ${pathname !== '/' ? 'hidden' : 'flex'}`}>
                <div>

                    <img src="/logo.png" alt="logo" width={250} />

                </div>

                <p className='text-lg mt-2 text-slate-500'> Select Users to send message</p>

            </div>


        </div>
    )
}

export default HomePage