import { useEffect, useState } from "react";
import useRequest from "../../ApiServices/useRequest";
import DeletedOrdersTable from "../../Components/AdminComponents/DeletedOrdersTable/DeletedOrdersTable";

const AdminDeletedOrders = () => {
  const [postRequest, getRequest] = useRequest();
  const [orders, setOrders] = useState([]);

  const getDeltedProd = async () => {
    const orderLst = await getRequest("/orders/src/deleted/all");
    setOrders(orderLst?.data?.data);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDeltedProd();
  }, []);
  return (
    <div className="px-10 py-10 bg-white rounded-lg">
      <h1 className="font-extrabold text-2xl">Admin Deleted ORder</h1>
      <div className="mt-10">
        <DeletedOrdersTable orders={orders} />
      </div>
    </div>
  );
};

export default AdminDeletedOrders;
