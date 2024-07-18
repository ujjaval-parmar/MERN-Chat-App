import React from 'react'
import { PiUserCircle } from 'react-icons/pi'
import { useSelector } from 'react-redux'

const Avatar = ({userId, name, imgUrl, width, height }) => {


    const {  onlineUsers } = useSelector(state => state?.user);


    const randomBgColor = [
        'bg-slate-200',
        'bg-teal-200',
        'bg-red-200',
        'bg-green-200',
        'bg-steel-200',
    ]

    const randomIndex = Math.floor(Math.random() * (4 - 0 + 1)) + 0;

    const isOnline = onlineUsers.includes(userId);




    return (
        <div style={{ width, height }} className='shadow border  relative rounded-full '>
            {imgUrl ?
                <img src={imgUrl} alt={name ? name : ''} width={width} height={height} className='w-full h-full object-cover rounded-full ' />

                : name ?
                    <div className={`w-full h-full text-5xl font-bold   flex items-center justify-center rounded-full ${randomBgColor[randomIndex]}`}  >
                        {name.split(' ').map((item, index) => {
                            return <span key={index} className={``}>{item[0].toUpperCase()}</span>
                        })}
                    </div>
                    :
                    <PiUserCircle size={80} className='rounded-full' />
            }

            {isOnline && <div className='bg-green-600 p-1 rounded-full absolute top-1 right-1'></div>}


        </div>
    )
}

export default Avatar