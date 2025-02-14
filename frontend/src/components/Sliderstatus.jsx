import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';


export const Sliderstatus = () => {
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/worker/status`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(responce => {
      setIsChecked(responce.data.msg);
    })
  }, [])


  const navigate = useNavigate();
  const phone_number = jwtDecode(localStorage.getItem("token")).phone_number;
  const data = { phone_number }

  return (
    <>
      <div className='flex ml-2 '>
        <div>
          <h2 className='text-black border border-2 p-3 mr-2 rounded-full font-extrabold text-base'>{isChecked ? "Current Status : Open to Work" : "Current Status : Close to Work"}</h2>
        </div>
        <div>
          <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-1" onClick={async () => {
            const response = await axios.put(`${BACKEND_URL}/api/v1/worker/changestatus`, data, {
              headers: {
                Authorization: localStorage.getItem("token")
              }
            });
            location.reload();
          }}>Change Status</button>
        </div>
      </div>
      {/* <label className='flex cursor-pointer select-none items-center'>
        <div className='relative'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            className='sr-only'
          />
          <div className='block h-8 w-14 rounded-full bg-[#E5E7EB]'></div>
          <div className='dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition'></div>
        </div>
      </label> */}
    </>
  )
}