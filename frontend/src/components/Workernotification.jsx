import { BACKEND_URL } from '../config';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import {
    Avatar,
    Tooltip,
} from '@mui/material';
import profileImage from "../assets/client.webp";
import { useNavigate } from 'react-router-dom';



export const Workernotification = ({
    id,
    sendername,
    sendernum,
    senderadd,
    senderrat
}) => {
    const navigate = useNavigate();
    const phone_number = jwtDecode(localStorage.getItem("token")).phone_number;
    const data = { phone_number }
    return <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className='flex justify-between'>
            <div className='flex'>
                <Tooltip title="Profile options">
                    <Avatar alt="Profile" src={profileImage} />
                </Tooltip>
                <div className="text-xl font-bold pt-2">
                    {sendername}
                </div>
            </div>
            {/* {console.log(id)} */}
            <div>
                <button type="submit" className="text-gray-900 bg-red border border-gray-300 focus:outline-none hover:bg-red-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:text-white dark:border-gray-600 dark:hover:bg-red-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={async () => {
                    // {console.log(jwtDecode(localStorage.getItem("token")).phone_number)}
                    const response = await axios.post(`${BACKEND_URL}/api/v1/worker/notification/reject/${id}`, data, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    });
                    if (response) {
                        navigate(`/worker`)
                    }
                }}>Reject</button>
                <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-800 dark:text-white dark:border-gray-600 dark:hover:bg-green-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={async () => {
                    // {console.log(jwtDecode(localStorage.getItem("token")).phone_number)}
                    const response = await axios.post(`${BACKEND_URL}/api/v1/worker/notification/${id}`, data, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    });
                    if (response) {
                        navigate(`/worker`)
                    }
                }}>Accept</button>
            </div>
        </div>
        <div className='flex justify-between'>
            <div className='flex flex-col'>
                <div className="text-slate-950 text-sm font-bold">
                    {`Number: ${sendernum}`}
                </div>
                <div className="text-slate-950 text-sm font-bold pt-2">
                    {`Client Address: ${senderadd}`}
                </div>
                <div className="text-slate-950 text-sm font-bold pt-2">
                    {`Client Rating : ${senderrat}`}
                </div>
            </div>

        </div>
    </div>
}


