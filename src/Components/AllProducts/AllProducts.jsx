import { useContext, useEffect, useState } from "react";
import CategorySideBar from "../CategorySidebar/CategorySideBar";
import { AuthContext } from "../../Providers/AuthProviders";
import useRequest from "../../ApiServices/useRequest";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import ProductModal from "../ProductModal/ProductModal";

const AllProducts = () => {
  const {
    user,
    allCategories,
    allProducts,
    allStocks,
    setAllCarts,
    allCarts,
    setAllStocks,
    loading,
  } = useContext(AuthContext);

  const [showProds, setShowProds] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for the selected product
  const [postRequest, getRequest] = useRequest();

  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const allProdss = await getRequest("/products/src");
      setShowProds(allProdss?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);



  const getStock = (productId) => {
    try {
      const stock = allStocks.find(
        (stockItem) => stockItem?.productId === productId
      );
      return stock ? stock.stockQTY : "Out of Stock";
    } catch (error) {
      console.log(error);
    }
  };

  const handleCart = async (item) => {
    try {
      if (user && user._id) {
        const { value: quantity } = await Swal.fire({
          title: "Enter quantity",
          input: "number",
          inputAttributes: {
            min: 1,
            max: getStock(item._id),
            step: 1,
          },
          inputValue: 1,
          showCancelButton: true,
        });

        if (quantity > 0) {
          const cartItems = {
            userId: user._id,
            productId: item._id,
            quantity: parseInt(quantity, 10),
          };
          const dummyCart = {
            userId: user._id,
            productId: item._id,
            productImage: item.productThumb,
            productPrice: item.buyingPrice,
            quantity: parseInt(quantity, 10),
          };

          Swal.fire("Added to Cart");

          let matchFound = false;
          let updatedCarts = await allCarts.map((d) => {
            if (d.productId === item._id) {
              matchFound = true;
              return {
                ...d,
                quantity: parseInt(d.quantity) + parseInt(quantity),
              };
            }
            return d;
          });

          if (!matchFound) {
            updatedCarts = [...updatedCarts, dummyCart];
          }

          let stocksData = allStocks.map((dt) => {
            if (dt.productId === item._id) {
              return {
                ...dt,
                stockQTY: parseInt(dt.stockQTY) - parseInt(quantity),
              };
            }
            return dt;
          });

          setAllStocks(stocksData);

          setAllCarts(updatedCarts);
          postRequest("/carts/crt", cartItems);
        } else {
          Swal.fire("Invalid Quantity");
        }
      }else{
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryClick = async (category) => {
    try {
      const getCategoriseProds = await getRequest(
        `/products/src/category/${category._id}`
      );

      setShowProds(getCategoriseProds?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to open modal with the selected product
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleNavigate = () =>{
    try{
      navigate("/login");
    }catch(error){
      console.log(error, "Error");
    }
  }
  return (
    <div className="bg-white">
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <CategorySideBar
              allCategories={allCategories}
              handleCategoryClick={handleCategoryClick}
            />
          </div>
          <div className="col-span-10 px-4 py-4 bg-fifth">
            <div className="grid grid-cols-4 gap-x-2 gap-y-2">
              {showProds ? (
                showProds.map((item) => (
                  <div
                    className="h-[400px] rounded-lg border bg-white border-sixth shadow-xl duration-500 hover:scale-105 hover:shadow-2xl hover:duration-500 hover:cursor-pointer"
                    key={item._id}
                    onClick={() => handleProductClick(item)} // Open modal on click
                  >
                    <div className="flex items-center justify-center overflow-hidden h-[50%] mt-4 mx-4 px-2">
                      <img
                        className="w-[24vh] overflow-hidden rounded-lg"
                        src={`http://localhost:8000/images/${item.productThumb}`}
                        alt=""
                      />
                    </div>
                    <div className="px-[1vw] mt-[1.5vh]">
                      <p className="font-bold text-[20px]">
                        {item.productName}
                      </p>
                     
                      <p className="font-bold text-xs w-full mt-[2vh]">
                        Stock Remaining:{" "}
                        <span className="font-normal">
                          {getStock(item?._id) === 0 ? 'Stock Out' : getStock(item._id)}
                        </span>
                      </p>
                      <p className="font-bold text-sm">
                        Discounts:{" "}
                        <span className="font-normal">{item.discount}%</span>
                      </p>
                    </div>
                    {user?.userType === 1 ? (
                       <div className="mt-[2vh] px-[1vw] flex justify-start items-center gap-2">
                       <p className="font-extrabold text-sm text-seventh">
                         Price:{" "}
                         <span className="text-lg font-extrabold text-primary">
                           {item?.sellingPrice} Tk
                         </span>
                       </p>
                     </div>
                     
                    ) : (
                      <>
                      {
                        user?.userType === 2 ? <div className="mt-[2vh] px-[1vw] flex sm:flex-col md:flex-col lg:flex-row justify-between items-center gap-2">
                        <p className="font-extrabold text-sm text-seventh">
                          Price:{" "}
                          <span className="text-md font-extrabold text-primary">
                            {item.sellingPrice} Tk
                          </span>
                        </p>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCart(item);
                          }}
                          className={`text-xs bg-fourth px-4 py-2 text-white tracking-tighter font-bold rounded-lg duration-700 hover:duration-700 hover:bg-primary hover:cursor-pointer ${
                            getStock(item._id) === 0
                              ? "text-sixth hover:text-sixth hover:cursor-default"
                              : ""
                          }`}
                          disabled={getStock(item._id) === 0}
                        >
                          Add to Cart
                        </button>
                      </div> : <div className="mt-[2vh] px-[1vw] flex justify-between items-center gap-2">
                        <p className="font-extrabold text-sm text-seventh">
                          Price:{" "}
                          <span className="text-md font-extrabold text-primary">
                            {Number(item.sellingPrice).toFixed(2)} Tk
                          </span>
                        </p>

                        <button
                          // onClick={(e) => {
                          //   e.stopPropagation(); // Prevent modal from opening
                          //   handleCart(item);
                          // }}

                          onClick={handleNavigate}
                          className={`text-xs bg-fourth px-4 py-2 text-white tracking-tighter font-bold rounded-lg duration-700 hover:duration-700 hover:bg-primary hover:cursor-pointer ${
                            getStock(item._id) === 0
                              ? "text-sixth hover:text-sixth hover:cursor-default"
                              : ""
                          }`}
                          disabled={getStock(item._id) === 0}
                        >
                          Add to Cart
                        </button>
                      </div>
                      }
                      </>
                    )}
                  </div>
                ))
              ) : (
                <div className="w-full">
                  <p className="text-center text-4xl font-bold">
                    No products available in this Category
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Render the modal */}
      {selectedProduct && (
        <ProductModal
          user={user}
          handleNavigate={handleNavigate}
          product={selectedProduct}
          onClose={closeModal}
          handleCart={handleCart} // Pass handleCart function
          getStock={getStock} // Pass getStock function
        />
      )}
    </div>
  );
};

export default AllProducts;
