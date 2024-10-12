import { useEffect, useState } from "react";
import useRequest from "../../ApiServices/useRequest";
import AdminStockOutTable from "../../Components/AdminComponents/AdminStockOutTable/AdminStockOutTable";

const AdminStockOutProducts = () => {
  const [postRequest, getRequest] = useRequest();
  const [allStockOuts, setAllStockOuts] = useState([]);

  const getAllStockOuts = async () => {
    try {
      const getStkOuts = await getRequest("/stocks/stkouts/src");
      if (getStkOuts?.data?.data.length > 0) {
        setAllStockOuts(getStkOuts?.data?.data, "Stock Outs");
      } else {
        setAllStockOuts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStockOuts();
  }, []);

  return (
    <div className="px-10 py-10 bg-white rounded-lg h-[85vh]">
      <h1 className="text-xl font-extrabold tracking-wide">
        Admin Stock Out Products
      </h1>
      <div className="mt-10">
        {allStockOuts.length <= 0 ? (
          <p>No Stock Out Product Exists</p>
        ) : (
          <AdminStockOutTable allStockOuts={allStockOuts} />
        )}
      </div>
    </div>
  );
};

export default AdminStockOutProducts;
