

import React, { useContext, useEffect, useState } from "react";
import UserCartItems from "../../Components/UserCartItem/UserCartItems";
import { AuthContext } from "../../Providers/AuthProviders";
import useRequest from "../../ApiServices/useRequest";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

const UserCart = () => {
  const { allCarts, user, setAllCarts, loading, setLoading } = useContext(AuthContext);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [postRequest, getRequest] = useRequest();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const getUserCartItems = async () => {
    try {
      const allItems = await getRequest(`/carts/src/byuser/${user._id}`);
      setCartItems(allItems?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserCartItems();
  }, []);

  const handlePlaceOrder = async (item) => {
    try {
      setButtonLoading(true);
      const customerDetails = {
        shippingCountry: "Country",
        shippingState: "State",
        shippingAddress: "Address",
        shippingPostalCode: "PostalCode",
      };

      const orderDetails = {
        cartId: item._id,
        userId: user._id,
        productId: item.productId,
        userName: user.userName,
        userFullName: user.userFullName,
        userPhoneNumber: user.phoneNumber,
        userEmail: user.userEmail,
        userCountry: customerDetails.shippingCountry,
        userState: customerDetails.shippingState,
        userAddress: customerDetails.shippingAddress,
        userPostalCode: customerDetails.shippingPostalCode,
        productName: item.productName,
        productThumb: item.productImage,
        productSellingPrice: item.totalPrice,
        allTotalPrice: item.totalPrice,
        totalQuantity: item.quantity,
        discount: 0,
      };

      const createOrder = await postRequest("/orders/crt", orderDetails);
      if (createOrder) {
        // let removeCartItem = await getRequest(
        //   `/carts/remove/byid/${orderDetails.cartId}`
        // );
        //Remove Cart Items from the Cart State//
        const filterCart = allCarts.filter(
          (ct) => ct._id !== orderDetails.cartId
        );
        setAllCarts(filterCart);
        //Remove Cart Item using API//
        if (filterCart) {
          Swal.fire(`Placed order of ${item.productName}`);
        }
      }
      setButtonLoading(false);
    } catch (error) {
      console.log(error);
      setButtonLoading(false);
    }
  };

  const handleOrderAll = async () => {
    try {
      setLoading(true);
      if (cartItems) {
        for (const item of cartItems) {
          let customerDetails = await getRequest(
            `/users/customer/src/byId/${user._id}`
          );
          const orderDetails = {
            cartId: item._id,
            userId: user._id,
            productId: item.productId,
            userName: user.userName,
            userFullName: user.userFullName,
            userPhoneNumber: user.phoneNumber,
            userEmail: user.userEmail,
            userCountry: customerDetails?.shippingCountry,
            userState: customerDetails?.shippingState,
            userAddress: customerDetails?.shippingAddress,
            userPostalCode: customerDetails?.shippingPostalCode,
            productName: item.productName,
            productThumb: item.productImage,
            productSellingPrice: item.totalPrice,
            allTotalPrice: item.totalPrice,
            totalQuantity: item.quantity,
            discount: 0,
          };
          await postRequest("/orders/crt", orderDetails);
        }
      }
      Swal.fire("Ordered All Products");
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <div className="px-10 py-10 bg-white rounded-md h-[80vh]">
      <div className="flex justify-center items-center font-bold text-2xl">
        <h1>My Carts</h1>
      </div>
      <div className="mt-10">
        {allCarts.length > 0 ? (
          allCarts.map((item) => (
            <UserCartItems
              item={item}
              key={item._id}
              handlePlaceOrder={handlePlaceOrder}
            />
          ))
        ) : (
          <div className="">
            <p>No Item Present In Your Cart</p>
          </div>
        )}
      </div>
      {allCarts.length > 0 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleOrderAll}
            className="bg-green-400 text-white font-bold py-2 px-4 rounded"
            disabled={buttonLoading}
          >
            {loading ? <div
              class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status">
              <span
                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span
              >
            </div> : "Order All"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCart;
