/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useRequest from "../../ApiServices/useRequest";


const ProductModal = ({ user, product, onClose, handleCart, handleNavigate, getStock }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [postRequest, getRequest] = useRequest();
  const [reviews, setReviews] = useState([]);
  const [calculatedRating, setCalculatedRating] = useState(0);

  if (!product) return null;
  

  const calculateRating = async ()=>{
    try{
      const totalRating = reviews.length;
      let sumOfAllRatings = 0;
      let avgRating = 0;

      reviews && reviews.map((item)=>{
        sumOfAllRatings += item.rating;
      })

      avgRating = sumOfAllRatings/totalRating 

      setCalculatedRating(avgRating);
    }catch(error){
      console.log(error);
    }
  }

  console.log(calculatedRating, "calculatedRating");
  const staticRating = calculatedRating ? calculatedRating : 0;
  const staticRatingCount = reviews.length;


  useEffect(()=>{
    calculateRating();
  },[reviews])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Rating:", rating);
    console.log("Review:", reviewText);
    const reviewData = {
      rating,
      reviewText,
      userId: user?._id,
      productId: product?._id,
    }

    const crtReview = await postRequest(`/ratings/crt`, reviewData);
    if (crtReview) {
      Swal.fire("Successfully Inserted the Review");
      onClose();
    }
  };

  const handleAddToCart = async () => {
    if (user?.userType === 2 && getStock(product._id) > 0) {
      const { value: quantity } = await Swal.fire({
        title: "Enter quantity",
        input: "number",
        inputAttributes: {
          min: 1,
          max: getStock(product._id),
          step: 1,
        },
        inputValue: 1,
        showCancelButton: true,
      });

      if (quantity > 0) {
        handleCart({ ...product, quantity: parseInt(quantity, 10) });
      } else {
        Swal.fire("Invalid Quantity");
      }
    } else if (!user) {
      Swal.fire("Please login to add items to the cart.");
    }
  };

  const reviewGetFunction = async () => {
    try {
      const getAllReviews = await getRequest(`/ratings/src/byId/${product?._id}`);
      setReviews(getAllReviews?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    reviewGetFunction();
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-8 rounded-lg shadow-xl w-[80vw] h-[85vh] max-w-4xl overflow-y-auto flex flex-col justify-between">
        <button
          onClick={onClose}
          className="text-4xl absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center object-cover">
            <img
              className="w-[300px] h-[300px] rounded-lg object-contain"
              src={`http://localhost:8000/images/${product.productThumb}`}
              alt={product.productName}
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">{product?.productName}</h2>

              {/* Rating Section */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((star, index) => (
                  <svg
                    key={index}
                    className={`w-6 h-6 ${index < Math.floor(staticRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                      }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.977a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.464a1 1 0 00-.364 1.118l1.286 3.977c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.464c-.785.57-1.84-.197-1.54-1.118l1.286-3.977a1 1 0 00-.364-1.118L2.605 9.404c-.784-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.977z"></path>
                  </svg>
                ))}
                <span className="ml-2 text-gray-600 text-sm">
                  {staticRating} ({staticRatingCount} ratings)
                </span>
              </div>

              <p className="text-gray-700 mb-6">
                {product?.productDescription || "No description available."}
              </p>
              <p className="mt-10 text-gray-700 mb-6 font-bold">
                Discount: <span className="font-normal">{product?.discount > 0 ? <p>{product?.discount}  %</p>: <p> "No Discount available."</p> }</span>
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {
                product?.discount < 0 ? <p className="text-2xl font-bold text-primary">
                {product?.sellingPrice.toFixed(2)} Tk
              </p> : <p className="text-2xl font-bold text-primary">
                {(product?.sellingPrice - (product?.discount/100)*product?.sellingPrice)} Tk
              </p>
              }
              {
                user?.userType === 1 ? (
                  <></>
                ) : (<>
                  {
                    user?.userType === 2 ? (
                      <button
                        className={`bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-dark transition duration-300 ${getStock(product._id) === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                          }`}
                        onClick={handleAddToCart}
                        disabled={getStock(product._id) === 0}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        className={`bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-dark transition duration-300 ${getStock(product._id) === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                          }`}
                        onClick={handleNavigate}
                      >
                        Add to Cart
                      </button>
                    )
                  }
                </>)
              }
            </div>
          </div>
        </div>
        {
          user?.userType === 2 ? <div className="h-auto mt-6">
            <h1 className="text-sm font-bold mb-2">Rate & Review This Product</h1>
            <form onSubmit={handleSubmit}>
              {/* Star Rating Feature */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((star, index) => {
                  const currentRating = index + 1;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setRating(currentRating)}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(rating)}
                      className={`text-3xl ${currentRating <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                        }`}
                    >
                      &#9733;
                    </button>
                  );
                })}
              </div>

              {/* Textarea for Review */}
              <div className="mb-4">
                <textarea
                  name="review"
                  id="review"
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Write your review here..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition duration-300"
                >
                  Leave a Review
                </button>
              </div>
            </form>
          </div> : <></>
        }

        {/* Review Section */}
        <div className="mt-10 w-full p-4 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
          <div className="space-y-4">
            {/* Static Reviews */}
            {
              reviews && reviews.map((review) =>
                <div key={review?._id} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <p className="font-bold">{review?.userFullName}</p>
                    <span className="flex items-center">
                      {
                        review.rating === 1 && <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.977a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.464a1 1 0 00-.364 1.118l1.286 3.977c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.464c-.785.57-1.84-.197-1.54-1.118l1.286-3.977a1 1 0 00-.364-1.118L2.605 9.404c-.784-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.977z"></path>
                        </svg>
                      }
                      {
                        review.rating === 2 && <div className="flex items-center">
                          <svg
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.977a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.464a1 1 0 00-.364 1.118l1.286 3.977c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.464c-.785.57-1.84-.197-1.54-1.118l1.286-3.977a1 1 0 00-.364-1.118L2.605 9.404c-.784-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.977z"></path>
                          </svg>
                          <svg
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.977a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.464a1 1 0 00-.364 1.118l1.286 3.977c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.464c-.785.57-1.84-.197-1.54-1.118l1.286-3.977a1 1 0 00-.364-1.118L2.605 9.404c-.784-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.977z"></path>
                          </svg>
                        </div>
                      }
                      {
                        review.rating === 3 && <div className="flex items-center">
                          <svg
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.977a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.464a1 1 0 00-.364 1.118l1.286 3.977c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.464c-.785.57-1.84-.197-1.54-1.118l1.286-3.977a1 1 0 00-.364-1.118L2.605 9.404c-.784-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.977z"></path>
                          </svg>
                          <svg
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.977a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.464a1 1 0 00-.364 1.118l1.286 3.977c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.464c-.785.57-1.84-.197-1.54-1.118l1.286-3.977a1 1 0 00-.364-1.118L2.605 9.404c-.784-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.977z"></path>
                          </svg>
                          <svg
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.977a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.464a1 1 0 00-.364 1.118l1.286 3.977c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.464c-.785.57-1.84-.197-1.54-1.118l1.286-3.977a1 1 0 00-.364-1.118L2.605 9.404c-.784-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.977z"></path>
                          </svg>
                        </div>
                      }
                      {
                        review.rating === 4 && <div className="flex items-center">
                          <svg
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.977a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.464a1 1 0 00-.364 1.118l1.286 3.977c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.464c-.785.57-1.84-.197-1.54-1.118l1.286-3.977a1 1 0 00-.364-1.118L2.605 9.404c-.784-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.977z"></path>
                          </svg>
                          <svg
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.977a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.464a1 1 0 00-.364 1.118l1.286 3.977c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.464c-.785.57-1.84-.197-1.54-1.118l1.286-3.977a1 1 0 00-.364-1.118L2.605 9.404c-.784-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.977z"></path>
                          </svg>
                          <svg
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.977a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.464a1 1 0 00-.364 1.118l1.286 3.977c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.464c-.785.57-1.84-.197-1.54-1.118l1.286-3.977a1 1 0 00-.364-1.118L2.605 9.404c-.784-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.977z"></path>
                          </svg>
                          <svg
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.977a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.464a1 1 0 00-.364 1.118l1.286 3.977c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.464c-.785.57-1.84-.197-1.54-1.118l1.286-3.977a1 1 0 00-.364-1.118L2.605 9.404c-.784-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.977z"></path>
                          </svg>
                        </div>
                      }
                      {
                        review.rating === 5 && <div className="flex items-center">
                          <svg
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.977a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.464a1 1 0 00-.364 1.118l1.286 3.977c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.464c-.785.57-1.84-.197-1.54-1.118l1.286-3.977a1 1 0 00-.364-1.118L2.605 9.404c-.784-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.977z"></path>
                          </svg>
                          <svg
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.977a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.464a1 1 0 00-.364 1.118l1.286 3.977c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.464c-.785.57-1.84-.197-1.54-1.118l1.286-3.977a1 1 0 00-.364-1.118L2.605 9.404c-.784-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.977z"></path>
                          </svg>
                          <svg
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.977a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.464a1 1 0 00-.364 1.118l1.286 3.977c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.464c-.785.57-1.84-.197-1.54-1.118l1.286-3.977a1 1 0 00-.364-1.118L2.605 9.404c-.784-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.977z"></path>
                          </svg>
                          <svg
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.977a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.464a1 1 0 00-.364 1.118l1.286 3.977c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.464c-.785.57-1.84-.197-1.54-1.118l1.286-3.977a1 1 0 00-.364-1.118L2.605 9.404c-.784-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.977z"></path>
                          </svg>
                          <svg
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.977a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.464a1 1 0 00-.364 1.118l1.286 3.977c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.464c-.785.57-1.84-.197-1.54-1.118l1.286-3.977a1 1 0 00-.364-1.118L2.605 9.404c-.784-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.977z"></path>
                          </svg>
                        </div>
                      } 
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{review?.review}</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
