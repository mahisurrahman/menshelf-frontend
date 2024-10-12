import React from "react";
import { PiCurrencyDollarFill } from "react-icons/pi";

const TotalAvailableProducts = ({ allAvailableProducts }) => {
  return (
    <div className="border-4 rounded-lg h-[14vh] border-b-4 border-b-seventh">
      <div className="flex items-center justify-between h-full px-5 py-2">
        <PiCurrencyDollarFill className="text-gray-600 text-4xl" />
        <div className="text-right">
          <h1 className="text-xl font-extrabold text-slate-600">
            Available Products
          </h1>
          <p className="text-xl font-bold mt-1">
            {" "}
            =/{" "}
            <span className="font-normal">
              {allAvailableProducts ? allAvailableProducts.length : 0}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalAvailableProducts;
