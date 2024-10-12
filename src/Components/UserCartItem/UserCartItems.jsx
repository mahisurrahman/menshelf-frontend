/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProviders";
import useRequest from "../../ApiServices/useRequest";
import { FcApproval } from "react-icons/fc";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const UserCartItems = ({ item }) => {
  const {
    decreaseCartQty,
    increaseCartQty,
    allCarts,
    setAllCarts,
    allStocks,
    setAllStocks,
  } = useContext(AuthContext);
  const [, getRequest] = useRequest();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleQtyDec = (item) => {
    try {
      if (item.quantity > 1) {
        decreaseCartQty(item);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleQtyIncr = async (item) => {
    try {
      increaseCartQty(item);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = (item) => {
    navigate("/checkout", { state: { item } });
  };

  const handleCartItemRemove = async (item) => {
    try {
      //Updating the Stock State//
      let stck = allStocks.map((stock) => {
        if (item.productId === stock.productId) {
          return {
            ...stock,
            stockQTY: stock.stockQTY + item.quantity,
          };
        }
        return stock;
      });

      setAllStocks(stck);

      setLoading(true);
      const filterCart = allCarts.filter((ct) => ct._id !== item._id);

      setAllCarts(filterCart);

      setLoading(false);
      Swal.fire(`${item.productName} Removed`);

      await getRequest(`/carts/del/byId/${item.productId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-20 flex justify-between items-center px-10">
      <div className="flex gap-5 items-center">
        <div>
          <img
            src={`http://localhost:8000/images/${item.productImage}`}
            className="w-20 h-20"
            alt=""
          />
        </div>
        <div>
          <h1 className="font-extrabold text-xl mb-2">{item.productName}</h1>
          <div className="flex gap-5 items-center">
            <p className="font-semibold text-sm">Quantity: </p>
            <FaMinus
              onClick={() => handleQtyDec(item)}
              disabled={item.quantity === 1}
              className={
                item.quantity === 1 ? "text-sixth" : "hover:cursor-pointer"
              }
            />
            <p>{item.quantity}</p>
            <FaPlus onClick={() => handleQtyIncr(item)} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="mb-5">
          <p className="text-xl ml-5 font-bold">
            Total Price:{" "}
            <span className="font-normal">{item.totalPrice}৳ </span>
          </p>
        </div>
        <div className="flex">
          <div className="border-e-2 pr-5 font-bold">
            <FcApproval
              onClick={() => handleCheckout(item)}
              className="text-4xl hover:cursor-pointer hover:scale-125"
            ></FcApproval>
          </div>
          <div className="pl-5">
            {loading ? (
              <AiOutlineLoading3Quarters />
            ) : (
              <AiFillDelete
                onClick={() => handleCartItemRemove(item)}
                className="text-tenth text-4xl hover:cursor-pointer hover:scale-125"
              ></AiFillDelete>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCartItems;
