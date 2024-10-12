import React, { useEffect, useState } from "react";
import useRequest from "../../../ApiServices/useRequest";

const AdminSingleStkOutItem = ({ stock }) => {
  const [showModal, setShowModal] = useState(false);
  const [postRequest, getRequest] = useRequest([]);
  const [product, setProduct] = useState([]);

  let prodId = stock.productId.toString();

  const getProductDetails = async () => {
    try {
      const singleProd = await getRequest(`/products/src/byid/${prodId}`);
      setProduct(singleProd?.data?.data, "SIngle PRoduct");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <tr className="h-[10vh] text-xs">
        <td className="pl-10 py-2 text-xs font-medium text-gray-600">
          {product.productName}
        </td>
        <td className="pl-10 py-2 text-xs font-medium text-gray-600">
          <img
            src={`http://localhost:8000/images/${product.productThumb}`}
            alt=""
            className="w-[3vw] h-auto"
          />
        </td>
        <td className="pl-20 py-2 text-xs text-gray-600 text-left">
          {stock.stockQTY}
        </td>
        <td className="px-4 h-[10vh] flex items-center justify-center gap-2 text-xs font-medium">
          {product.isActive ? (
            <>
              {/* <button
                type="button"
                className="inline-flex items-center gap-x-2 text-xs font-semibold rounded text-red-600 px-2 py-1 mx-2 border border-red-500 hover:text-white hover:bg-red-500"
              >
                Delete
              </button> */}
              <button
                type="button"
                className="inline-flex items-center gap-x-2 text-xs font-semibold rounded text-slate-600 px-2 py-1 mx-2 border border-slate-500 hover:text-white hover:bg-slate-500"
                onClick={openModal}
              >
                View
              </button>
            </>
          ) : (
            <>
              {/* <button
                type="button"
                className="inline-flex items-center gap-x-2 text-xs font-semibold rounded text-green-600 px-2 py-1 mx-2 border border-green-500 hover:text-white hover:bg-green-500"
              >
                Activate
              </button> */}
              <button
                type="button"
                className="inline-flex items-center gap-x-2 text-xs font-semibold rounded text-slate-600 px-2 py-1 mx-2 border border-slate-500 hover:text-white hover:bg-slate-500"
                onClick={openModal}
              >
                View
              </button>
            </>
          )}
        </td>
      </tr>
      {showModal && (
        <div className="fixed inset-0 z-10 mb-10">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg p-4 max-w-6xl mx-auto z-20 relative overflow-auto py-10">
              <button
                onClick={closeModal}
                className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-black text-6xl"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4 text-center mb-10">
                {product.productName}
              </h2>
              <img
                src={`http://localhost:8000/images/${product.productThumb}`}
                alt=""
                className="mb-4 max-w-full h-[40vh] px-20"
              />
              <p className="font-bold">
                Buying Price: ${" "}
                <span className="font-light">{product.buyingPrice}</span>
              </p>
              <p className="font-bold">
                Selling Price: ${" "}
                <span className="font-light">{product.sellingPrice}</span>
              </p>
              <p className="font-bold">
                Discount: <span className="font-light">{product.discount}</span>{" "}
                %
              </p>
              <p className="font-bold">
                Status:{" "}
                <span className="font-light">
                  {product.isActive ? "Active" : "Inactive"}
                </span>
              </p>
              <p className="font-bold">
                Deleted:{" "}
                <span className="font-light">
                  {" "}
                  {product.isDeleted ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSingleStkOutItem;
