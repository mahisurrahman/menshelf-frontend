import UserOrderTotal from "../UserOrderTotal/UserOrderTotal";
import UserOrderShippingAddress from "../UserOrderShippingAddress/UserOrderShippingAddress";
import UserOrderedItems from "../UserOrderedItems/UserOrderedItems";
import { useEffect, useState } from "react";
import useRequest from "../../../ApiServices/useRequest";
import Swal from "sweetalert2";

const CurrentOrderDetails = ({ selectedOrder }) => {
  const [currentState, setCurrentState] = useState(null);
  const [postRequest, getRequest] = useRequest();
  const [tax, setTax] = useState(0);

  const orderStateHandle = async () => {
    try {
      if (selectedOrder.isCancelled === true) {
        setCurrentState("Cancelled");
      } else if (
        selectedOrder.isConfirmed === true &&
        selectedOrder.isLaunched === true && selectedOrder.isDelivered === false
      ) {
        setCurrentState("Released");
      } else if (selectedOrder.isPending === true) {
        setCurrentState("Processing");
      } else if (
        selectedOrder.isDelivered === true
      ) {
        setCurrentState("Delivered");
      } else {
        setCurrentState("Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderDelivered = async (id) => {
    try {
      const orderId = id;
      const deliverOrder = await getRequest(`/orders/delivery/confirm/byid/${orderId}`);
      if (deliverOrder?.data?.error === false) {
        Swal.fire("Thank You !! Stay with Men's Shelf");
      } else {
        Swal.fire("Failed to Deliver the Order");
        console.log(deliverOrder);
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

  return (
    <div className="h-[85vh]">
      <div className="px-10 py-10 flex items-center justify-between">
        <h1 className="font-bold">
          Order Details -{" "}
          <span className="font-normal">{selectedOrder._id}</span>
        </h1>
        {selectedOrder.isConfirmed && selectedOrder.isLaunched === true && selectedOrder.isDelivered === false ? (
          <div className="flex items-center gap-1 text-seventh font-semibold text-sm">
            <h1 className="text-xs">Is Product Delivered ?</h1>
            <button
              onClick={() => handleOrderDelivered(selectedOrder._id)}
              className="px-4 py-1 font-bold rounded-lg shadow-md bg-green-700 text-white duration-700 hover:cursor-pointer hover:duration-700 hover:bg-green-400"
            >
              Yes
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="mt-2 px-5 mx-10 flex item-center justify-between py-4 rounded-lg bg-eight">
        <div className="flex items-center gap-2 text-xs">
          <p className="font-bold">Order Status : </p>
          <p className="px-4 rounded-2xl py-2 bg-third text-white font-bold">
            Order {currentState}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <p className="font-bold">Payment Status : </p>
          <p className="px-4 rounded-2xl py-2 bg-fourth text-white font-bold">
            {selectedOrder?.orderType === 2 ? (
              <p>Paid on Bkash</p>
            ) : (
              <p>Cash on Delivery</p>
            )}
          </p>
        </div>
      </div>
      <div className="mt-10 px-10 grid grid-cols-12">
        <UserOrderShippingAddress
          selectedOrder={selectedOrder}
        ></UserOrderShippingAddress>
        <UserOrderTotal
          selectedOrder={selectedOrder}
          tax={tax}
        ></UserOrderTotal>
      </div>
      <div className="mt-5 px-10">
        <UserOrderedItems selectedOrder={selectedOrder}></UserOrderedItems>
      </div>
    </div>
  );
};

export default CurrentOrderDetails;
