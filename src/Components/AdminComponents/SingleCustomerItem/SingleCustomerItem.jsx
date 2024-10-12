import React, { useEffect, useState } from "react";
import useRequest from "../../../ApiServices/useRequest";

const SingleCustomerItem = ({ user, handleDeleteUser }) => {
  const [postRequest, getRequest] = useRequest();
  const [userMoreDetails, setUserMoreDetails] = useState([]);
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

  const getUserDetails = async () => {
    try {
      const details = await getRequest(`/users/src/byId/${user.userId}`);
      setUserMoreDetails(details?.data?.data, "Details");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
        {userMoreDetails?.userFullName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
        <img
          src={`http://localhost:8000/images/${userMoreDetails?.userImg}`}
          className="w-10 h-10 object-cover rounded-full"
          alt=""
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {userMoreDetails?.userEmail}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {userMoreDetails?.phoneNumber}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        <span>{userMoreDetails?.gender}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        <span className="px-4 py-2font-bold">
          {formatDate(userMoreDetails?.createdDate)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex items-center gap-x-5">
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center gap-x-2 px-2 py-1 border-4 border-green-400 text-xs font-bold rounded-lg text-green-600 hover:text-white hover:bg-green-400 hover:duration-700 "
        >
          View
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-x-2 px-2 py-1 border-4 border-red-400 text-xs font-bold rounded-lg text-red-600 hover:text-white hover:bg-red-400 hover:duration-700 "
          onClick={() => handleDeleteUser(userMoreDetails._id)}
        >
          Delete
        </button>
      </td>
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
                {userMoreDetails.userName}
              </h2>
              <img
                src={`http://localhost:8000/images/${userMoreDetails.userImg}`}
                alt=""
                className="mb-4 max-w-full h-[40vh] px-20"
              />
              <p className="font-bold">
                Shipping Address:{" "}
                <span className="font-light">{user.shippingAddress}</span>
              </p>
              <p className="font-bold">
                Shipping Country:{" "}
                <span className="font-light">{user.shippingCountry}</span>
              </p>
              <p className="font-bold">
                Shipping State:{" "}
                <span className="font-light">{user.shippingState}</span>
              </p>
              <p className="font-bold">
                Shipping Postal Code:{" "}
                <span className="font-light">{user.shippingPostalCode}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </tr>
  );
};

export default SingleCustomerItem;
