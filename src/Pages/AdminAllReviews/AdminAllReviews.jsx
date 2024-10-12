import React, { useEffect, useState } from "react";
import useRequest from "../../ApiServices/useRequest";
import Swal from 'sweetalert2'

function AdminAllReviews() {
  const [postRequest, getRequest] = useRequest();
  const [allRevs, setAllRevs] = useState([]);

  const getAllRevws = async () => {
    try {
      let response = await getRequest(`/ratings/src/all`);
      setAllRevs(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReview = async (id)=>{
    try{
      const deleteReviews = await getRequest(`/ratings/del/byId/${id}`);
      Swal.fire("Successfully Deleted the Review");
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getAllRevws();
  }, [handleDeleteReview]);

  return (
    <div className="h-[85vh] bg-white rounded-lg px-10 py-10 ">
      <div>
        <h1 className="text-2xl font-extrabold">
          Here Are All the Reviews Given By The Users
        </h1>
      </div>
      <div className="mt-10">
        {allRevs && allRevs?.length > 0 ? (
          allRevs.map((item) => (
            <div className="h-[10vh] border-2 rounded-lg">
              <div className="grid grid-cols-8 px-5 items-center h-full">
                <h1 className="font-bold text-xl col-span-3 mx-2">{item?.userFullName}</h1>
                <p className="text-sm col-span-4 mx-2">{item?.review}</p>
                <button 
                onClick={()=>handleDeleteReview(item?._id)}
                className="col-span-1 mx-2 px-3 py-1 text-sm text-white font-bold rounded-lg bg-red-500 duration-500 hover:duration-500 hover:cursor-pointer hover:bg-red-800">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <h1>No Reviews Available</h1>
        )}
      </div>
    </div>
  );
}

export default AdminAllReviews;
