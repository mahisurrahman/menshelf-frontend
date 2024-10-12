import React, { useRef, useState } from "react";
import bkash from "./bkash-train-ticket--796x445.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";

const BkashPaymentPageFour = () => {
  const [pin, setPin] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const handleConfirm = () => {
    console.log("PIN entered:", pin);
    navigate("/user/dash/paymenttwo", { state: orderData });
  };

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to next input field if current one is filled
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (element, index) => {
    if (element.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Check if all OTP inputs are filled
  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-pink-500">STEP 02</h1>
      <div className="bg-transparent flex items-center justify-center p-4 h-[80vh]">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
          <div className="bg-pink-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <img src={bkash} alt="bKash Logo" className="w-32" />
            <h2 className="text-lg font-bold">Payment</h2>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div>
                <h3 className="text-gray-700 font-bold">TokenizedMerchant02</h3>
                <p className="text-gray-500 text-sm">Invoice: 63cda6968cae7</p>
              </div>
              <div className="text-right">
                {/* <span className="text-gray-700 font-bold text-xl">
                  ৳ {orderData.allTotalPrice}
                </span> */}
              </div>
            </div>
            <div className="text-center mb-4">
              <p className="text-gray-700">Enter the OTP</p>
              <div className="grid grid-cols-6 gap-2 mt-5">
                  {otp.map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      className="w-10 h-10 text-center bg-white border-2 border-gray-500 mt-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      maxLength="1"
                      value={otp[index]}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyUp={(e) => {
                        if (e.key === "Backspace")
                          handleBackspace(e.target, index);
                      }}
                      ref={(el) => (inputRefs.current[index] = el)}
                    />
                  ))}
              </div>
            </div>
            <div className="flex w-full justify-between items-center">
              <Link to={"/user/dash/cart"}>
                <button
                  onClick={() => console.log("Close clicked")}
                  className="w-[200px] bg-gray-200 text-gray-700 py-2 rounded-bl-lg hover:bg-gray-300"
                >
                  CLOSE
                </button>
              </Link>
              <button
                onClick={handleConfirm}
                className={`w-[200px] bg-pink-500 text-white py-2 rounded-br-lg hover:bg-pink-600 ${
                  !isOtpComplete ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isOtpComplete}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BkashPaymentPageFour;
