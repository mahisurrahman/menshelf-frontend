import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../../../ApiServices/useRequest";
import Swal from "sweetalert2";

const OrderItem = ({
  item,
  user,
  customerDetails,
  loading,
  allCarts,
  setAllCarts,
  selected,
}) => {
  const [isCODSelected, setIsCODSelected] = useState(false);
  const [postRequest, getRequest] = useRequest();
  const [individualStock, setIndividualStock] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [tax, setTax] = useState(0);
  const [calculatedTax, setCalculatedTax] = useState(0.0);
  const navigate = useNavigate();
  const [isBkashSelected, setIsBkashSelected] = useState(false);

  const getStockRemaining = async () => {
    try {
      let productId = item.productId;
      await getRequest(`/stocks/src/${productId}`)
        .then((res) => {
          setIndividualStock(res.data.data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const getTax = async () => {
    try {
      const response = await getRequest("/tax/src");
      setTax(response?.data?.data[0].taxNumber);

      // let responseTwo = (response?.data?.data[0]);
      // if (responseTwo.taxNumber > 0){
      //   setTax(responseTwo.taxNumber);
      // }else{
      //   setTax(0);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTax();
  }, []);

  const handlePlaceOrder = async (item) => {
    try {
      setButtonLoading(true);
      const productPriceWithTax =
        tax > 0
          ? item.totalPrice + calculatedTax * item.totalPrice
          : item.totalPrice;
      const allTotalPrice = productPriceWithTax + (selected?.deliveryFee || 0);

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
        allTotalPrice:
          item.totalPrice +
          (tax / 100) * item?.totalPrice +
          selected?.deliveryFee,
        totalQuantity: item.quantity,
        deliveryFee: selected?.deliveryFee,
        deliveryShift: selected?.deliveryShift,
        discount: item.discount,
        orderType: 1,
      };

      const createOrder = await postRequest("/orders/crt", orderDetails);
      if (createOrder) {
        // Remove Cart Items from the Cart State //
        const filterCart = allCarts.filter(
          (ct) => ct._id !== orderDetails.cartId
        );
        setAllCarts(filterCart);

        // Remove Cart Item using API //
        if (filterCart) {
          Swal.fire(`Placed order of ${item.productName}`);
          navigate("/user/dash/orders");
        }
      }
      setButtonLoading(false);
    } catch (error) {
      console.log(error);
      setButtonLoading(false);
    }
  };

  const handleBkashPayment = (item, selected) => {
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
      allTotalPrice: item.totalPrice + (tax / 100) * item?.totalPrice,
      totalQuantity: item.quantity,
      deliveryFee: selected?.deliveryFee,
      deliveryShift: selected?.deliveryShift,
      discount: item.discount,
      orderType: 2,
    };

    // console.log("Order Details", orderDetails);
    navigate("/user/dash/payment", { state: orderDetails });
  };

  const handleCODClick = () => {
    setIsCODSelected(true);
    setIsBkashSelected(false); // Deselect Bkash when COD is selected
  };

  const handleBkashClick = (item, selected) => {
    setIsBkashSelected(true);
    setIsCODSelected(false); // Deselect COD when Bkash is selected
    handleBkashPayment(item, selected);
  };

  useEffect(() => {
    getStockRemaining();
  }, []);

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center text-xs">
        <div className="flex justify-start gap-2 items-center">
          <p>{item.quantity}</p>
          <p>x {item.productName} </p>
        </div>
        <p>৳ {item.totalPrice}</p>
      </div>
      <div className="my-2">
        <hr />
      </div>
      <div className="mt-10">
        <div className="flex justify-between gap-2 items-center text-xs my-1">
          <p>Tax</p>
          <p>{tax ? tax : 0.0}%</p>
        </div>
        <div className="flex justify-between gap-2 items-center text-xs">
          <p>Sub Total</p>
          <p>
            ৳{" "}
            {tax > 0
              ? (item?.totalPrice + (tax / 100) * item?.totalPrice).toFixed(2)
              : item?.totalPrice}
          </p>
        </div>
        <div className="flex justify-between gap-2 items-center text-xs my-1">
          <p>Shipping</p>
          {selected && selected?.deliveryFee ? (
            <p>৳ {selected?.deliveryFee}</p>
          ) : (
            <p>৳ 0.00</p>
          )}
        </div>
        <div className="my-5">
          <hr />
        </div>
      </div>
      <div className="mt-10">
        <div className="font-bold flex justify-between gap-2 items-center text-xl">
          <p>Total</p>
          {selected && selected?.deliveryFee ? (
            <p>
              ৳{" "}
              {tax > 0
                ? (
                    item.totalPrice +
                    (tax / 100) * item?.totalPrice +
                    selected?.deliveryFee
                  ).toFixed(2)
                : (item.totalPrice + selected?.deliveryFee).toFixed(2)}
            </p>
          ) : (
            <p>
              ৳{" "}
              {tax > 0
                ? (item.totalPrice + (tax / 100) * item?.totalPrice).toFixed(2)
                : item.totalPrice.toFixed(2)}
            </p>
          )}
        </div>
        <div className="flex justify-between gap-2 items-center text-xs my-1">
          <p>Single Product Price </p>
          <p>{item.productPrice}</p>
        </div>
        <div className="flex justify-between gap-2 items-center text-xs my-1">
          <p>Stock Remaining</p>
          <p>{individualStock?.stockQTY}</p>
        </div>
        <div className="my-5">
          <hr />
        </div>
      </div>
      <div className="bg-white mt-10 text-left px-10 pt-10 pb-5 rounded-md shadow-lg">
        <p className="font-semibold">Choose Payment Method</p>
        <div className="flex items-center gap-5">
          <button
            className={`mt-5 text-xs px-2 py-2 border-4 rounded-md font-semibold ${
              isCODSelected
                ? "border-fourth text-fourth"
                : "border-ninth text-ninth"
            } ${!selected ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleCODClick}
            disabled={!selected}
          >
            Cash On <br /> Delivery
          </button>

          <button
            className={`mt-5 text-xs px-2 py-2 border-4 rounded-md font-semibold ${
              isBkashSelected
                ? "border-pink-500 text-pink-600"
                : "border-ninth text-ninth"
            } ${!selected ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={()=>handleBkashClick(item, selected)}
            disabled={!selected}
          >
            Pay On <br /> Bkash
          </button>

          {/* <button
            onClick={() => handleBkashPayment(item)}
            className="mt-5 text-xs px-4 py-2 border-4 rounded-md font-semibold border-pink-300 text-pink-300"
          >
            Pay on
            <br /> Bkash
          </button> */}
        </div>
        <p className="mt-10 text-xs text-center">
          Please Pay After Getting Your Goods
        </p>
      </div>
      <div className="mt-5">
        {loading ? (
          <p className="text-center text-2xl font-extrabold">Loading ...</p>
        ) : (
          <button
            onClick={() => handlePlaceOrder(item)}
            className={`w-full py-2 font-semibold rounded-md border-2 duration-300 ${
              isCODSelected
                ? "bg-fourth text-white border-fourth hover:bg-white hover:text-primary hover:cursor-pointer hover:duration-300"
                : "bg-ninth text-white border-ninth cursor-not-allowed"
            }`}
            disabled={!isCODSelected || buttonLoading}
          >
            {buttonLoading ? "Processing..." : "Place Order"}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
