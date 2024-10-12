import { useEffect, useState } from "react";
import AllDeletedProductsTable from "../../Components/AdminComponents/AllDeletedProductsTable/AllDeletedProductsTable";
import useRequest from "../../ApiServices/useRequest";

const AdminDeletedProducts = () => {
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [postRequest, getRequest] = useRequest();

  const getDeletedProducts = async () => {
    try {
      const getDltProds = await getRequest("/products/deleted/src");
      if (getDltProds) {
        setDeletedProducts(getDltProds?.data?.data);
      } else {
        setDeletedProducts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDeletedProducts();
  }, []);

  return (
    <div className="px-10 py-10 bg-white rounded-lg h-[85vh]">
      <h1 className="text-xl font-extrabold tracking-wide">
        Admin Deleted Products{" "}
      </h1>
      <div className="mt-10">
        {!deletedProducts ? (
          <p>No Deleted Products Exists</p>
        ) : (
          <AllDeletedProductsTable deletedProducts={deletedProducts} />
        )}
      </div>
    </div>
  );
};

export default AdminDeletedProducts;
