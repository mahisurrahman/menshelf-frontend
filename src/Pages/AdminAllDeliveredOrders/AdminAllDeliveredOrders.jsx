import React, { useEffect, useState } from "react";
import DeliveredOrdersTable from "../../Components/AdminComponents/DeliveredOrdersTable/DeliveredOrdersTable";
import useRequest from "../../ApiServices/useRequest";

function AdminAllDeliveredOrders() {
  const [, getRequest] = useRequest();
  const [orders, setOrders] = useState([]);

  const getAllConfirmedOrder = async () => {
    try {
      const allCnfrmOrdr = await getRequest("/orders/src/delivered/all");
      console.log(allCnfrmOrdr?.data?.data);
      setOrders(allCnfrmOrdr?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllConfirmedOrder();
  }, []);


  return (
    <div className="px-10 py-10 bg-white rounded-lg">
      <h1 className="text-2xl font-extrabold ">Delivered Orders</h1>
      <div className="mt-10">
        <DeliveredOrdersTable orders={orders} />
      </div>
    </div>
  );
}

export default AdminAllDeliveredOrders;
