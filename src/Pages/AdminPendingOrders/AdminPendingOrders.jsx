import { useEffect, useState } from "react";
import PendingOrdersTable from "../../Components/AdminComponents/PendingOrdersTable/PendingOrdersTable";
import useRequest from "../../ApiServices/useRequest";

const AdminPendingOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [postRequest, getRequest] = useRequest();
  const [loading, setLoading] = useState(false);

  const getAllPndingOrds = async () => {
    try {
      const orders = await getRequest("/orders/src/pending/all");
      setAllOrders(orders?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      setLoading(true);
      await getRequest(`/orders/cancel/byid/${id}`);
      const updatedPndngOrds = await getRequest("/orders/src/pending/all");

      setAllOrders(updatedPndngOrds?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmOrder = async (id) => {
    try {
      setLoading(true);
      await getRequest(`/orders/confirm/byid/${id}`);
      const updatedPndngOrds = await getRequest("/orders/src/pending/all");

      setAllOrders(updatedPndngOrds?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPndingOrds();
  }, []);

  return (
    <div className="px-10 py-10 bg-white rounded-lg">
      <h1 className="text-2xl font-bold">Admin Pending Orders</h1>
      <div className="mt-10">
        <PendingOrdersTable
          allOrders={allOrders}
          handleDeleteOrder={handleDeleteOrder}
          handleConfirmOrder={handleConfirmOrder}
        />
      </div>
    </div>
  );
};

export default AdminPendingOrders;
