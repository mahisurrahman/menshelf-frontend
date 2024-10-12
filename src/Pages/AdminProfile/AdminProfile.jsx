import { useEffect, useState } from "react";
import useRequest from "../../ApiServices/useRequest";
import AdminDashChart from "../../Components/AdminComponents/AdminDashChart/AdminDashChart";
import AdminOrderStatus from "../../Components/AdminComponents/AdminOrderStatus/AdminOrderStatus";
import AdminProfileSummary from "../../Components/AdminComponents/AdminProfileSummary/AdminProfileSummary";
import AdminTodaysOrders from "../../Components/AdminComponents/AdminTodaysOrders/AdminTodaysOrders";
import AdminTopProducts from "../../Components/AdminComponents/AdminTopProducts/AdminTopProducts";

const AdminProfile = () => {
  const [postRequest, getRequest] = useRequest();
  const [allOrders, setAllOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allAvailableProducts, setAllAvailableProducts] = useState([]);
  const [allPendingOrders, setAllPendingOrders] = useState([]);
  const [allDeliveredOrders, setAllDeliveredOrders] = useState([]);
  const [allDeletedOrders, setAllDeletedOrders] = useState([]);

  const getAllOrders = async () => {
    try {
      const ordersList = await getRequest("/orders/src/all");
      setAllOrders(ordersList?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const usersList = await getRequest("/users/src");
      setAllUsers(usersList?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      const productsList = await getRequest("/products/src/all");
      setAllProducts(productsList?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAvailableProducts = async () => {
    try {
      const availableProductsList = await getRequest("/products/src");
      setAllAvailableProducts(availableProductsList?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPendingOrders = async () => {
    try {
      const pendingOrdersList = await getRequest("/orders/src/pending/all");
      setAllPendingOrders(pendingOrdersList?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDeliveredOrders = async () => {
    try {
      const deliveredOrdersList = await getRequest("/orders/src/delivered/all");
      setAllDeliveredOrders(deliveredOrdersList?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDeletedOrders = async () => {
    try {
      const deletedOrdersList = await getRequest("/orders/src/deleted/all");
      console.log(deletedOrdersList);
      setAllDeletedOrders(deletedOrdersList?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
    getAllUsers();
    getAllProducts();
    getAvailableProducts();
    getAllPendingOrders();
    getAllDeliveredOrders();
    getAllDeletedOrders();
  }, []);

  return (
    <div className="">
      <AdminProfileSummary
        allOrders={allOrders}
        allUsers={allUsers}
        allProducts={allProducts}
        allAvailableProducts={allAvailableProducts}
      />
      <AdminOrderStatus
        allPendingOrders={allPendingOrders}
        allDeliveredOrders={allDeliveredOrders}
        allDeletedOrders={allDeletedOrders}
      />
      {/* <AdminTodaysOrders /> */}
      {/* <div className="mt-10 px-10 py-10 bg-white rounded-lg shadow-lg grid grid-cols-12 gap-5">
        <div className="col-span-8">
          <AdminDashChart />
        </div>
        <div className="col-span-4">
          <AdminTopProducts />
        </div>
      </div> */}
    </div>
  );
};

export default AdminProfile;
