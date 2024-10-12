/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import "./Checkout.css";
import useRequest from "../../ApiServices/useRequest";
import { useLocation } from "react-router-dom";
import BillingAddress from "../../Components/CheckoutPageCompos/BillingAddress/BillingAddress";
import ContactNumberInfo from "../../Components/CheckoutPageCompos/ContactNumberInfo/ContactNumberInfo";
import DeliverySchedule from "../../Components/CheckoutPageCompos/DeliverySchedule.jsx/DeliverySchedule";
import Ordernote from "../../Components/CheckoutPageCompos/Ordernote/Ordernote";
import OrderItem from "../../Components/CheckoutPageCompos/OrderItem/OrderItem";

const CheckoutPage = () => {
  const { user, loading, setLoading, allCarts, setAllCarts } = useContext(AuthContext);
  const [, getRequest] = useRequest();
  const [customerDetails, setCustomerDetails] = useState(null);
  const [selected, setSelected] = useState(null);
  const [allCharges, setAllCharges] = useState([]);
  const location = useLocation();
  const item = location.state?.item;
  
  const getAllDelvCharges = async ()=>{
    try{
      const response = await getRequest("/delivery/src/all");
      setAllCharges(response?.data?.data);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getAllDelvCharges();
  },[])

  const handleClick = (option) => {
    setSelected(option);
  };

  const getCustomerDetails = async () => {
    try {
      if (user && user._id) {
        const userId = user?._id;
        await getRequest(`users/customer/src/byId/${userId}`).then((res) => {
          if (res.data.data) {
            setCustomerDetails(res.data.data.customerDetails);
            setLoading(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomerDetails();
  }, [user, loading]);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <div className="w-full px-10 py-10 bg-white">
          <div className="w-[100%] bg-fifth rounded-lg shadow-xl grid grid-cols-12">
            <div className="col-span-7 py-10 pl-40 pr-10">
              <ContactNumberInfo user={user}></ContactNumberInfo>
              <BillingAddress
                customerDetails={customerDetails}
              ></BillingAddress>
              <DeliverySchedule
                allCharges={allCharges}
                selected={selected}
                handleClick={handleClick}
              ></DeliverySchedule>
              <Ordernote></Ordernote>
            </div>
            <div className="col-span-5 pl-10 pr-60 py-20">
              <div className="w-full text-center">
                <h1 className="text-md font-extrabold tracking-wider">
                  Your Orders
                </h1>
                <OrderItem item={item} user={user} customerDetails={customerDetails} loading={loading} setLoading={setLoading} allCarts={allCarts} setAllCarts={setAllCarts} selected={selected}></OrderItem>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
