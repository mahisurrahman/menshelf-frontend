import { useEffect, useState } from "react";
import useRequest from "../../ApiServices/useRequest";
import AllProductsTable from "../../Components/AdminComponents/AllProductsTable/AllProductsTable";
import CustomSearch from "../../Components/CustomSearch/CustomSearch";

const AdminAllProducts = () => {
  const [postRequest, getRequest] = useRequest();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      const productsList = await getRequest("/products/src/all");
      setAllProducts(productsList?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProducts = async (id) => {
    try {
      setLoading(true);
      await getRequest(`/products/del/${id}`);
      // const updatedProducts = allProducts.filter(
      //   (product) => product.id !== id
      // );

      const updatedProducts = await getRequest("/products/src/all");
      setAllProducts(updatedProducts?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActiveProducts = async (id) => {
    try {
      setLoading(true);
      await getRequest(`/products/actv/${id}`);
      const updatedProducts = await getRequest("/products/src/all");
      setAllProducts(updatedProducts?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="h-[85vh] bg-white rounded-lg shadow-lg overflow-y-scroll scrollbar-thin scrollbar-thumb-scrollbar-thumb px-10 py-10">
      <div className="flex items-center justify-between border-b-2 pb-5">
        <h1 className="text-xl font-bold pl-5 border-l-4 border-seventh">
          All Products List
        </h1>
      </div>
      <div className="px-4 py-2">
        <AllProductsTable
          allProducts={allProducts}
          handleDeleteProducts={handleDeleteProducts}
          handleActiveProducts={handleActiveProducts}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AdminAllProducts;
