import React from "react";
import TotalOrders from "../TotalOrders/TotalOrders";
import TotalUsers from "../TotalUsers/TotalUsers";
import TotalProducts from "../TotalProducts/TotalProducts";
import TotalAvailableProducts from "../TotalAvailableProducts/TotalAvailableProducts";

const AdminProfileSummary = ({allOrders, allUsers, allProducts, allAvailableProducts}) => {
  return (
    <div className="px-10 py-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl font-bold pl-5 border-l-4 border-seventh">
        Summary
      </h1>
      <div className="grid grid-cols-4 gap-4 mt-8">
        <TotalAvailableProducts  allAvailableProducts={allAvailableProducts}/>
        <TotalOrders allOrders={allOrders}/>
        <TotalUsers  allUsers={allUsers}/>
        <TotalProducts allProducts={allProducts} />
      </div>
    </div>
  );
};

export default AdminProfileSummary;
