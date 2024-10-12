import React from "react";
import ConfirmedOrdersTableItem from "../ConfirmedOrdersTableItem/ConfirmedOrdersTableItem";
import DeliveredOrdersTableItems from "../DeliveredOrdersTableItems/DeliveredOrdersTableItems";

const DeliveredOrdersTable = ({ orders }) => {
  return (
    <div className="mt-8 rounded-lg shadow-lg">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-fourth">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs text-white font-extrabold uppercase"
                    >
                      Product Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs text-white font-extrabold uppercase"
                    >
                      Product Image
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs text-white font-extrabold uppercase"
                    >
                      Order Placed At
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs text-white font-extrabold uppercase"
                    >
                      Order Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs text-white font-extrabold uppercase"
                    >
                      Delivered?
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs text-white font-extrabold uppercase"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <DeliveredOrdersTableItems key={order._id} order={order} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveredOrdersTable;
