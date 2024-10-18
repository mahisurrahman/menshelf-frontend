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
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>

          {/* Modal container */}
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6 md:max-w-3xl mx-auto z-20 relative overflow-auto max-h-[90vh]">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-700 text-4xl font-bold transition duration-300"
              >
                &times;
              </button>

              {/* Modal content */}
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  {product.productName}
                </h2>

                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <img
                    src={`http://localhost:8000/images/${product.productThumb}`}
                    alt={product.productName}
                    className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-lg shadow-md"
                  />

                  <div className="text-gray-700 space-y-2">
                    <p>
                      <strong>Buying Price:</strong> $ {product.buyingPrice}
                    </p>
                    <p>
                      <strong>Selling Price:</strong> $ {product.sellingPrice}
                    </p>
                    <p>
                      <strong>Discount:</strong> {product.discount} %
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {product.isActive ? "Active" : "Inactive"}
                    </p>
                    <p>
                      <strong>Deleted:</strong>{" "}
                      {product.isDeleted ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProductItem;
