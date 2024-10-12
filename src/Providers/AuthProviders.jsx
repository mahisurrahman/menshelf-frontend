/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from "react";
import useRequest from "../ApiServices/useRequest";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {
  const [postRequest, getRequest] = useRequest();
  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [allCarts, setAllCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);

  const fetchMainCategories = async () => {
    try {
      const mainCategoriesDetails = await getRequest("/categories/src");
      setAllCategories(mainCategoriesDetails?.data?.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const getAllStocks = await getRequest("/stocks/src");
      const stockData = getAllStocks?.data?.data || [];
      const stockMap = new Map();
      stockData.forEach((stockItem) => {
        stockMap.set(stockItem.productId, stockItem.stockQTY);
      });

      const getAllProducts = await getRequest("/products/src");
      const products = getAllProducts?.data?.data || [];
      const filteredProducts = products.filter(
        (product) => stockMap.get(product._id) > 0
      );

      setAllProducts(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllStocks = async () => {
    try {
      const getAllStocks = await getRequest("/stocks/src");
      setAllStocks(getAllStocks?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCarts = async () => {
    try {
      const getAllCarts = await getRequest(`/carts/src/byuser/${user._id}`);
      setAllCarts(getAllCarts.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseCartQty = async (item) => {
    try {
      if (item.quantity <= 1) {
        Swal.fire({
          icon: "warning",
          title: "Cannot Decrease",
          text: "Quantity cannot be less than 0. The item will be removed from the cart.",
        });

        setAllCarts((prevCarts) =>
          prevCarts.filter((cartItem) => cartItem._id !== item._id)
        );
        setAllStocks((prevStocks) =>
          prevStocks.map((stockItem) =>
            stockItem.productId === item.productId
              ? { ...stockItem, stockQTY: stockItem.stockQTY + item.quantity }
              : stockItem
          )
        );
        return;
      }

      // Optimistically update state
      setAllCarts((prevCarts) =>
        prevCarts.map((cartItem) =>
          cartItem._id === item._id
            ? { 
                ...cartItem, 
                quantity: cartItem.quantity - 1, 
                totalPrice: cartItem.productPrice * (cartItem.quantity - 1) 
              }
            : cartItem
        )
      );

      setAllStocks((prevStocks) =>
        prevStocks.map((stockItem) =>
          stockItem.productId === item.productId
            ? { ...stockItem, stockQTY: stockItem.stockQTY + 1 }
            : stockItem
        )
      );

      // Perform the API request
      await getRequest(`/carts/qty/decr/${item._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseCartQty = async (item) => {
    try {
      const stockItem = allStocks.find(
        (stock) => stock.productId === item.productId
      );
      if (!stockItem || stockItem.stockQTY <= 0) {
        Swal.fire({
          icon: "error",
          title: "Out of Stock",
          text: "The requested quantity is not available in stock.",
        });
        return;
      }

      setAllCarts((prevCarts) =>
        prevCarts.map((cartItem) =>
          cartItem._id === item._id
            ? { 
              ...cartItem, 
              quantity: cartItem.quantity + 1, 
              totalPrice: cartItem.productPrice * (cartItem.quantity + 1) 
            }
            : cartItem
        )
      );

      setAllStocks((prevStocks) =>
        prevStocks.map((stockItem) =>
          stockItem.productId === item.productId
            ? { ...stockItem, stockQTY: stockItem.stockQTY - 1 }
            : stockItem
        )
      );

      await getRequest(`carts/qty/incr/${item._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginData = async (userCreds) => {
    try {
      let loginUser = await postRequest("/users/login", userCreds);
      const setUserToLocal = localStorage.setItem(
        "userCreds",
        JSON.stringify(loginUser?.data?.data?.modifiedUser)
      );

      setUser(setUserToLocal);
      setLoading(false);

    } catch (error) {
      Swal.fire("Credentials Doesn't Match");
      setLoading(false);
    }
  };

  const getUserData = () => {
    try {
      let getUserDetails = JSON.parse(localStorage.getItem("userCreds"));
      if (getUserDetails) {
        setUser(getUserDetails);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchUserOrders = async () => {
    try {
      if (user && user._id) {
        setLoading(true);
        let getOrders = await getRequest(`/orders/src/user/byid/${user._id}`);
        setUserOrders(getOrders?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
};

  useEffect(() => {
    setLoading(true);
    fetchMainCategories();
    fetchAllProducts();
    fetchAllStocks();
    getUserData();
  }, []);

  useEffect(() => {
    if (user && user._id) {
      fetchUserOrders();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchAllCarts(user);
    }
  }, [user]);

  const authInfo = {
    loading,
    setLoading,
    allCategories,
    setAllCategories,
    allProducts,
    setAllProducts,
    allStocks,
    setAllStocks,
    user,
    setUser,
    allCarts,
    setAllCarts,
    decreaseCartQty,
    increaseCartQty,
    handleLoginData,
    userOrders,
    setUserOrders
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
