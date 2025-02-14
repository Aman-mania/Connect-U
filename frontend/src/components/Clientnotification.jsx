import { BACKEND_URL } from '../config';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import {
    Avatar,
    Tooltip,
} from '@mui/material';
import profileImage from "../assets/client.webp";
import chat from "../assets/chat.svg"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Clientnotification = ({
    id,
    recievername,
    reciever_num
}) => {
    const navigate = useNavigate();
    const phone_number = jwtDecode(localStorage.getItem("token")).phone_number;
    // const data = { phone_number }
    const [rating,setrating]=useState("");
    const data={phone_number,reciever_num,rating}
    return <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className='flex justify-between'>
            <div className='flex flex-col'>
                <div className='flex'>
                    <Tooltip title="Profile options">
                        <Avatar alt="Profile" src={profileImage} />
                    </Tooltip>
                    <div className="text-xl font-bold pt-2">
                        {recievername}
                    </div>
                    <div className="text-xl font-bold pt-2 ml-4">
                        <a href='http://localhost:3002'><img src={chat}></img></a>
                    </div>
                </div>
                <div className="text-xl font-bold pt-2">
                    {`Number: ${reciever_num}`}
                </div>
            </div>
            <div>
                <form onSubmit={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/client/notification/${id}`, data, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    });
                }}>
                <input type='text' required placeholder='0.00' value={rating} onChange={(e)=>
                    setrating(e.target.value)
                } className='border rounded-full p-2 border-2 mr-2 font-semibold text-black'></input>
                <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Give Rating</button>

                </form>
            </div>
        </div>
    </div>
}