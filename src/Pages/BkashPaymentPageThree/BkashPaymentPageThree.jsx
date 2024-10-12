
import useRequest from "../../ApiServices/useRequest";
import bkash from "./bkash-train-ticket--796x445.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import Loading101 from "../../Components/Loading101/Loading101";
import { useState } from "react";

const BkashPaymentPageThree = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state;
  const [postRequest, getRequest] = useRequest();
  const [loading, setLoading] = useState(false);

  console.log("Order DATA from payment page 3", orderData);


  const handleConfirm = async () => {
    try{
        setLoading(true);
        const orderCartData ={
            cartId : orderData.cartId,
        }
        const orderProcessing = await postRequest(`${process.env.REACT_APP_BackendURL}/orders/crt`, orderData);
        console.log(orderProcessing?.data?.data, "Order Processing");
        setLoading(false);
        navigate("/");
    }catch(error){
        console.log(error);
        setLoading(false);
    }
  };

  if(loading === true){
    return <Loading101/>
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-pink-500">STEP 02</h1>
      <div className="bg-transparent flex items-center justify-center px-4 h-[80vh]">
        <div className="bg-white w-[600px] rounded-lg shadow-lg max-w-md">
          <div className="bg-pink-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <img src={bkash} alt="bKash Logo" className="w-32" />
            <h2 className="text-lg font-bold">Payment</h2>
          </div>
          <div className="p-4">
            <div className="py-10">
                <h1 className="text-xl text-center font-semibold">You Paid Successfully</h1>
            </div>
            <div className="flex w-full justify-center items-center">
              <button
                onClick={handleConfirm}
                className="w-[200px] bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BkashPaymentPageThree;
