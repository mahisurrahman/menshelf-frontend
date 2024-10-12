import React from "react";
import ApexChart from "../ApexChart/ApexChart";


const AdminDashChart = () => {
  return (
    <div>
      <h1 className="text-xl font-bold pl-5 border-l-4 border-purple-500">
        Sale History
      </h1>
      <div className="w-full">
        <ApexChart/>
      </div>
    </div>
  );
};

export default AdminDashChart;
