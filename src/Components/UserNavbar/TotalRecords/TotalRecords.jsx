import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import useRequest from "../../../ApiServices/useRequest";

const TotalRecords = ({user}) => {
  const {allCarts, userOrders} = useContext(AuthContext); 
  const [postRequest, getRequest] = useRequest();
  const [userReviews, setUserReviews] = useState([]);

  const getAllReviews = async() =>{
    try{
      let response = await getRequest(`/ratings/src/byUser/${user?._id}`);
      setUserReviews(response?.data?.data);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(()=>{
    getAllReviews();
  },[])
  return (
    <div>
      <div className="px-5 py-10 ml-10 bg-white rounded-md">
        <p className="text-xl mb-4 font-bold">Total Records</p>
        <hr />
        <div className="grid grid-cols-3 mt-10 bg-white">
          <div className="flex flex-col items-center border-r-2">
            <p>{userOrders.length}</p>
            <h1 className="font-bold">Orders</h1>
          </div>
          <div className="flex flex-col items-center border-r-2">
            <p>{allCarts.length}</p>
            <h1 className="font-bold">Cart</h1>
          </div>
          <div className="flex flex-col items-center">
            <p>{userReviews?.length}</p>
            <h1 className="font-bold">Reviews</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalRecords;
