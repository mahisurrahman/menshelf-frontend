import React, { useState } from "react";

const ConfirmedOrdersTableItem = ({ order }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <>
      <tr className="h-[10vh] text-xs">
        <td className="pl-10 py-2 text-xs font-medium text-gray-600">
          {order.productName}
        </td>
        <td className="pl-10 py-2 text-xs font-medium text-gray-600">
          <img
            src={`http://localhost:8000/images/${order.productThumb}`}
            alt=""
            className="w-[3vw] h-auto"
          />
        </td>
        <td className="text-center *:py-2 text-xs text-gray-600">
          {formatDate(order.createdDate)}
        </td>
        <td className="pl-10 py-2 text-xs text-gray-600 text-left">
          {order && order.orderType === 1 ? (
            <>Cash on Delivery</>
          ) : (
            <p className="text-xs font-bold text-pink-500">Bkash</p>
          )}
        </td>
        <td className="pl-10 py-2 text-xs text-gray-600 text-left">
          {order && order.isConfirmed === true && order.isLaunched === true ? (
            <>
              {order.isDelivered ? (
                <>Confirmed and Delivered</>
              ) : (
                <>Confirmed and Launched</>
              )}
            </>
          ) : (
            <p className="text-xs font-bold text-pink-500">Not-Confirmed</p>
          )}
        </td>
        <td className="px-4 h-[10vh] flex items-center justify-center gap-2 text-xs font-medium">
          {/* <button
            type="button"
            className="inline-flex items-center gap-x-2 text-xs font-semibold rounded text-green-600 px-2 py-1 mx-2 border-2 border-green-600 hover:text-white hover:bg-green-500"
            onClick={openModal}
          >
            Confirm
          </button> */}
          <button
            type="button"
            className="inline-flex items-center gap-x-2 text-xs font-semibold rounded text-slate-600 px-2 py-1 mx-2 border-2 border-slate-500 hover:text-white hover:bg-slate-500"
            onClick={openModal}
          >
            View
          </button>
          {/* <button
            type="button"
            className="inline-flex items-center gap-x-2 text-xs font-semibold rounded text-red-600 px-2 py-1 mx-2 border-2 border-red-600 hover:text-white hover:bg-red-500"
            onClick={openModal}
          >
            Delete
          </button> */}
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
                {order.productName}
              </h2>
              <img
                src={`http://localhost:8000/images/${order.productThumb}`}
                alt=""
                className="mb-4 max-w-full h-[40vh] px-20"
              />
              <p className="font-bold">
                Product Selling Price: ${" "}
                <span className="font-light">{order.productSellingPrice}</span>
              </p>
              <p className="font-bold">
                Quantity:{" "}
                <span className="font-light">{order.totalQuantity}</span>
              </p>
              <p className="font-bold">
                Total Price: ${" "}
                <span className="font-light">{order.allTotalPrice}</span>
              </p>
              <p className="font-bold">
                User Name:{" "}
                <span className="font-light">{order.userFullName}</span>
              </p>
              <p className="font-bold">
                User Phone:{" "}
                <span className="font-light">{order.userPhoneNumber}</span>
              </p>
              <p className="font-bold">
                User Email:{" "}
                <span className="font-light">{order.userEmail}</span>
              </p>
              <p className="font-bold">
                User Country:{" "}
                <span className="font-light">{order.userCountry}</span>
              </p>
              <p className="font-bold">
                User State:{" "}
                <span className="font-light">{order.userState}</span>
              </p>
              <p className="font-bold">
                User Address:{" "}
                <span className="font-light">{order.userAddress}</span>
              </p>
              <p className="font-bold">
                User Postal Code:{" "}
                <span className="font-light">{order.userPostalCode}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmedOrdersTableItem;
