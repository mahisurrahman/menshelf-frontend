import React, { useContext, useEffect, useState } from "react";
import useRequest from "../../ApiServices/useRequest";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";

const AdminAllDiscounts = () => {
  const { allProducts } = useContext(AuthContext);
  const [postRequest, getRequest] = useRequest();
  const [discountedProds, setDiscountedProds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [discountNumber, setDiscountNumber] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [mergedItem, setMergedItem] = useState([]);

  const getAllDiscountedProducts = async () => {
    try {
      const allDiscounts = await getRequest("/discount/all/src");
      setDiscountedProds(allDiscounts?.data?.data);
    } catch (error) {
      console.log("Failed to get all discounted products", error);
    }
  };

  // const mergedProduct = async () => {
  //   try {
  //     // Use Promise.all to handle asynchronous map operations
  //     const mergedData = await Promise.all(
  //       discountedProds.map(async (item) => {
  //         const response = await getRequest(`/products/src/byid/${item.productId}`);
  //         const productData = response?.data?.data;
  
  //         // Merging item data with product data
  //         return { ...item, ...productData };
  //       })
  //     );
  
  //     // Update state with merged data
  //     setMergedItem(mergedData); 
  //   } catch (error) {
  //     console.log("Failed to merge products", error);
  //   }
  // };

  const handleApplyDiscountClick = () => {
    setIsModalOpen(true); // Open the modal when the button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleDiscountChange = (e) => {
    setDiscountNumber(e.target.value);
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleDeleteDiscount = async(id) =>{
    try{
        const removeProd = await getRequest(`/discount/del/${id}`);
        if(removeProd){
            Swal.fire("Successfully Removed the Discount");
            setDiscountedProds((prevMergedItem) => prevMergedItem.filter((product) => product._id !== id));
        }

    }catch(error){
        console.log("Failed to Delete Product", error);
    }
  }

  const handleSubmit = async () => {
    try {
      const applyDiscount = await postRequest(`/discount/crt/${selectedProduct}`, { discountNumber: discountNumber });
      console.log(applyDiscount, "Apply Discount");

      if(applyDiscount){
        Swal.fire("Successfully Added Discount");
      }

      handleCloseModal();
    } catch (error) {
      Swal.fire("This Product is Already Discounted, You can update it if you want. ")
      console.log("Failed to apply discount", error);
    }
  };

  useEffect(() => {
    getAllDiscountedProducts();
  }, []);

  // useEffect(() => {
  //   if (discountedProds.length > 0) {
  //     mergedProduct();
  //   }
  // }, [discountedProds]); 

  return (
    <div className="">
      <div className="mx-10 my-10 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold">All Discount Calculations</h1>
        <button
          className="bg-green-700 px-4 py-2 text-white text-xl font-extrabold rounded-lg duration-700 hover:duration-700 hover:scale-110 hover:cursor-pointer"
          onClick={handleApplyDiscountClick}
        >
          Apply Discounts
        </button>
      </div>

      <div className="bg-white rounded-lg mt-10 px-10 py-10">
        {discountedProds && discountedProds?.map((product) => (
          <div key={product.id} className="w-full mb-10 border-b-2 grid grid-cols-4">
            <h3 className="text-2xl font-bold">{product.productName}</h3>
            <h3 className="text-2xl font-bold">Discount : <span className="font-normal">{product.discount}%</span></h3>
            <h3 className="text-2xl font-bold">Final Price : <span className="font-normal">{product.sellingPrice} Taka </span></h3>
           <div className="flex items-center justify-end">
           <button onClick={()=>handleDeleteDiscount(product._id)} className="mb-2 px-4 py-2 bg-red-500 text-white font-bold rounded-lg duration-500 hover:duration-500 hover:scale-110 hover:cursor-pointer">Delete Discounts</button>
           </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Apply Discount</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Discount Number</label>
              <input
                type="text"
                value={discountNumber}
                onChange={handleDiscountChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Select Product</label>
              <select
                value={selectedProduct}
                onChange={handleProductChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="">Select a product</option>
                {allProducts.map((product) => (
                  <option key={product.id} value={product._id}>
                    {product.productName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-700 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllDiscounts;
