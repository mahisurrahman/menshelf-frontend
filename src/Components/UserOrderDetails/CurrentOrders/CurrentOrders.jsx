import { useEffect, useState } from "react";
import useRequest from "../../../ApiServices/useRequest";

const CurrentOrders = ({ uOrder, index }) => {
  const [currentState, setCurrentState] = useState(null);
  const [, getRequest] = useRequest();
  const [tax, setTax] = useState(0);

  const orderStateHandle = async () => {
    try {
      if (uOrder.isCancelled === true) {
        setCurrentState("Cancelled");
      } else if (uOrder.isConfirmed && uOrder.isLaunched === true && uOrder.isDelivered === false) {
        setCurrentState("Released");
      } else if (uOrder.isPending === true) {
        setCurrentState("Processing");
      } else if (
        uOrder?.isDelivered === true
      ) {
        setCurrentState("Delivered");
      } else {
        setCurrentState("Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    orderStateHandle();
  }, [currentState]);

  const getTax = async () => {
    try {
      const response = await getRequest("/tax/src");
      setTax(response?.data?.data[0]?.taxNumber);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTax();
  }, []);


  console.log("Current State", currentState);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };
  return (
    <div className="px-2 py-4 rounded-md bg-fifth my-5 hover:cursor-pointer hover:bg-sixth">
      <div className="flex items-center justify-between pb-4 px-2">
        <p className="font-bold text-xs">Order {index + 1}</p>
        <p className="px-2 py-2 text-xs bg-third text-white rounded-lg font-bold">
          Order {currentState}
        </p>
      </div>
      <div className="mt-4 px-2 flex justify-between items-center text-xs">
        <p className="font-bold">Order Date: </p>
        <p>{formatDate(uOrder.createdDate)}</p>
      </div>
      <div className="mt-4 px-2 flex justify-between items-center text-xs">
        <p className="font-bold">Product Name: </p>
        <p>{uOrder?.productName}</p>
      </div>
      <div className="mt-4 px-2 flex justify-between items-center text-xs">
        <p className="font-bold">Quantity: </p>
        <p>{uOrder?.totalQuantity}</p>
      </div>
      <div className="mt-4 px-2 flex justify-between items-center text-xs">
        <p className="font-bold">Delivery Time: </p>
        <p>{uOrder?.deliveryShift}</p>
      </div>
      <div className="mt-4 px-2 flex justify-between items-center text-xs">
        <p className="font-bold">Delivery Charge: </p>
        <p>{uOrder?.deliveryFee} Tk</p>
      </div>
      <div className="mt-4 px-2 flex justify-between items-center text-md">
        <p className="font-bold">Product Purchased: </p>
        <p>{uOrder?.allTotalPrice} Tk</p>
      </div>
      {/* <div className="mt-4 px-2 flex justify-between items-center text-md">
        <p className="font-bold">Total Price: </p>
        <p>$ {uOrder.allTotalPrice + 10}</p>
      </div> */}
    </div>
  );
};

export default CurrentOrders;
