import React, { useContext, useEffect, useState } from "react";
import useRequest from "../../../ApiServices/useRequest";
import Loading101 from "../../Loading101/Loading101";

const SingleProductItem = ({
  product,
  handleDeleteProducts,
  handleActiveProducts,
  loading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [postRequest, getRequest] = useRequest([]);
  const [allStc, setAllStck] = useState([]);

  let prodId = product._id;

  const getStockRemaining = async () => {
    try {
      const stockRm = await getRequest(`/stocks/src/${prodId}`);
      setAllStck(stockRm?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStockRemaining();
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
        <td className="px-4 py-2 text-xs font-medium text-gray-600">
          {product.productName}
        </td>
        <td className="px-4 py-2 text-xs text-gray-600 text-center">
          {allStc.stockQTY}
        </td>
        <td className="px-4 py-2 text-xs text-gray-600">
          $ {product.buyingPrice}
        </td>
        <td className="px-4 py-2 text-xs text-gray-600">
          $ {product.sellingPrice}
        </td>
        <td className="pl-10 py-2 text-xs text-gray-600">
          <span className="font-bold">{product.discount} %</span>
        </td>
        <td className="px-4 py-2 text-xs text-gray-600">
          {product.isActive ? (
            <span className="px-2 py-1 font-bold text-green-500">Active</span>
          ) : (
            <span className="font-bold text-green-500 text-3xl text-center ml-6">
              -
            </span>
          )}
        </td>
        <td className="px-4 py-2 text-xs text-gray-600">
          {product.isDeleted ? (
            <span className="px-2 py-1 font-bold text-red-500">Deleted</span>
          ) : (
            <span className="font-bold text-red-500 text-3xl text-center ml-8">
              -
            </span>
          )}
        </td>
        <td className="px-4 h-[10vh] flex items-center justify-center gap-2 text-xs font-medium">
          {product.isActive ? (
            <>
              <button
                type="button"
                onClick={() => handleDeleteProducts(product._id)}
                className="inline-flex items-center gap-x-2 text-xs font-semibold rounded text-red-600 px-2 py-1 mx-2 border border-red-500 hover:text-white hover:bg-red-500"
              >
                {loading && loading ? <Loading101 /> : <>Delete</>}
              </button>
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
              <button
                onClick={() => handleActiveProducts(product._id)}
                type="button"
                className="inline-flex items-center gap-x-2 text-xs font-semibold rounded text-green-600 px-2 py-1 mx-2 border border-green-500 hover:text-white hover:bg-green-500"
              >
                {loading && loading ? <Loading101 /> : <> Activate</>}
              </button>
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
            <div className="bg-white rounded-lg p-4 max-w-6xl mx-auto z-20 relative overflow-auto">
              <button
                onClick={closeModal}
                className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-black text-6xl"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">{product.productName}</h2>
              <img
                src={`http://localhost:8000/images/${product.productThumb}`}
                alt=""
                className="mb-4 max-w-full h-auto"
              />
              <p>Buying Price: $ {product.buyingPrice}</p>
              <p>Selling Price: $ {product.sellingPrice}</p>
              <p>Discount: {product.discount} %</p>
              <p>Status: {product.isActive ? "Active" : "Inactive"}</p>
              <p>Deleted: {product.isDeleted ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProductItem;
