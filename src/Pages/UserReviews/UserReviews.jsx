/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import useRequest from '../../ApiServices/useRequest'
import { AuthContext } from '../../Providers/AuthProviders';
import Swal from 'sweetalert2';

function UserReviews() {
  const { user } = useContext(AuthContext);
  const [postRequest, getRequest] = useRequest();
  const [listReviews, setListReviews] = useState([]);
  const [deletedRv, setDeletedRv] = useState([]);

  const getAllReviews = async () => {
    try {
      const response = await getRequest(`/ratings/src/byUser/${user?._id}`);
      setListReviews(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveReviews = async (id) => {
    try {
        let response = await getRequest(`/ratings/del/byId/${id}`);
        setDeletedRv(response?.data?.data);
        Swal.fire("Successfully Removed the Review");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllReviews();
  }, [deletedRv])

  return (
    <div className='w-full h-[100vh] bg-white rounded-lg px-10 py-10'>
      <h1 className='text-xl font-bold underline'>Here is the list of all the Reviews</h1>
      <div className="mt-5 w-full">
        {
          listReviews && listReviews.map((review) => <div key={review?._id} className='my-5 w-full border-2 rounded-lg px-5 py-5 grid grid-cols-12 items-center'>
            <div className="col-span-2">
              <div className='flex items-center justify-start'>
                <h1 className='font-bold text-xl'>{review?.productName}</h1>
              </div>
            </div>
            <div className='col-span-8'>
              <div className='w-full'>
                <p className="text-left tracking-widest text-xs font-semibold">{review?.review}</p>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex items-center justify-end gap-2">
                {/* <button className='text-xs font-bold px-2 py-1 rounded-lg bg-black text-white duration-500 hover:duration-500 hover:bg-slate-500 hover:text-black hover:cursor-pointer'>Update</button> */}
                <button onClick={()=>handleRemoveReviews(review?._id)} className='text-xs font-bold px-4 py-2 rounded-lg bg-red-500 text-white duration-500 hover:duration-500 hover:bg-red-800 hover:cursor-pointer'>Delete</button>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}

export default UserReviews