import React from "react";
import PopularProductItem from "../PopularProductItem/PopularProductItem";

const AdminTopProducts = () => {
  return (
    <div>
      <h1 className="text-xl font-bold pl-5 border-l-4 border-sky-500">
        Popular Products
      </h1>

      <div className="mt-8 px-4 h-[50vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-scrollbar-thumb">
            <PopularProductItem/>
            <PopularProductItem/>
            <PopularProductItem/>
            <PopularProductItem/>
            <PopularProductItem/>
            <PopularProductItem/>
      </div>
    </div>
  );
};

export default AdminTopProducts;
