import React, { useEffect, useState } from "react";
import useRequest from "../../ApiServices/useRequest";
import ConfirmedOrdersTable from "../../Components/AdminComponents/ConfirmedOrdersTable/ConfirmedOrdersTable";

const AdminConfirmedOrders = () => {
  const [postRequest, getRequest] = useRequest();
  const [orders, setOrders] = useState([]);

  const getAllConfirmedOrder = async () => {
    try {
      const allCnfrmOrdr = await getRequest("/orders/src/confirmed/all");
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
      <h1 className="text-2xl font-extrabold ">Confirmed Orders</h1>
      <div className="mt-10">
        <ConfirmedOrdersTable orders={orders} />
      </div>
    </div>
  );
};

export default AdminConfirmedOrders;
