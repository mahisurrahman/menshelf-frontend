import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../Providers/AuthProviders";
import useRequest from "../../ApiServices/useRequest";
import Swal from "sweetalert2";

const AdminCreateProduct = () => {
  const { allCategories, loading, setLoading } = useContext(AuthContext);
  const [prodName, setProdName] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [prodThumb, setProdThumb] = useState(null);
  const [prodThumbPreview, setProdThumbPreview] = useState(null);
  const [buyingPrice, setBuyingPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [stockQuantity, setStockQuantity] = useState(0);
  const navigate = useNavigate();
  const [postRequest, getRequest] = useRequest();

  const handleThumbChange = (e) => {
    setLoading(true);
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setProdThumbPreview(URL.createObjectURL(selectedImage));
      setProdThumb(selectedImage);
      setLoading(false);
    }
  };

  //Blank COmmit//
  const handleCreateProducts = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("productName", prodName);
      formData.append("productDescription", prodDescription);
      formData.append("productThumb", prodThumb);
      formData.append("buyingPrice", buyingPrice);
      formData.append("sellingPrice", sellingPrice);
      formData.append("discount", discount);
      formData.append("categoryId", categoryId);
      formData.append("stockQuantity", stockQuantity);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      setLoading(false);
      const postProduct = await postRequest("/products/crt", formData);
      if (postProduct?.data?.error === false) {
        Swal.fire("Successfully Created Product");

        navigate("/admin/panel");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="px-10 py-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl font-extrabold border-l-4 pl-10 border-l-lime-400">
        Create Product
      </h1>

      <div className="mt-5">
        <form
          onSubmit={handleCreateProducts}
          className="mx-10 mt-10 px-10 py-10 border-2 rounded-lg shadow-lg"
        >
          <div className="flex items-start w-full gap-5">
            <div className="flex flex-col items-start w-full">
              <label className="text-sm" htmlFor="productName">
                Product Name
              </label>
              <input
                className="px-4 py-2 mt-2 border-2 border-gray-400 w-full rounded-lg shadow-md focus:outline-none"
                type="text"
                name="productName"
                placeholder="product name"
                value={prodName}
                onChange={(e) => setProdName(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label className="text-sm" htmlFor="productCategory">
                Product Category
              </label>
              <select
                className="px-4 py-3 mt-2 border-2 w-full rounded-lg focus:outline-none"
                name="categoryId"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {allCategories.map((category) => (
                  <option
                    key={category.categoryCode}
                    className="uppercase"
                    value={category._id}
                  >
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-start w-full gap-5 mt-5">
            <div className="flex flex-col items-start w-full">
              <label className="text-sm" htmlFor="buyingPrice">
                Buying Price
              </label>
              <input
                className="px-4 py-2 mt-2 border-2 w-full rounded-lg border-gray-400 shadow-md focus:outline-none"
                type="number"
                name="buyingPrice"
                placeholder="Buying Price"
                value={buyingPrice}
                onChange={(e) => setBuyingPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label className="text-sm" htmlFor="sellingPrice">
                Selling Price
              </label>
              <input
                className="px-4 py-2 mt-2 border-2 w-full border-gray-400 rounded-lg shadow-md focus:outline-none"
                type="number"
                name="sellingPrice"
                placeholder="Selling Price"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label className="text-sm" htmlFor="discount">
                Stock Quantity
              </label>
              <input
                className="px-4 py-2 mt-2 border-2 w-full border-gray-400 rounded-lg shadow-md focus:outline-none"
                type="number"
                name="stockQuantity"
                placeholder="Stock Quantity"
                // value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-start gap-5 w-full mt-5">
            <div className="flex flex-col items-start w-full">
              <label className="text-sm" htmlFor="productDescription">
                Product Description
              </label>
              <textarea
                className="px-4 py-2 h-[10vh] mt-2 border-2 w-full rounded-lg border-gray-400 shadow-md focus:outline-none"
                name="productDescription"
                placeholder="Product Description"
                value={prodDescription}
                onChange={(e) => setProdDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-start items-center gap-5 w-full mt-10">
            <div className="flex flex-col items-start">
              <label className="text-xs mb-3" htmlFor="productThumb">
                Thumbnail Upload
              </label>
              <input
                id="productThumb"
                className="w-full text-lg text-black"
                type="file"
                accept="image/*"
                onChange={handleThumbChange}
                required
              />
            </div>
          </div>
          <div className="mt-10">
            <input
              className="w-full bg-fourth text-md tracking-wider font-extrabold py-2 rounded-lg shadow-lg text-white border-4 border-transparent duration-700 hover:duration-700 hover:bg-white hover:border-fourth hover:text-black hover:cursor-pointer"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateProduct;
