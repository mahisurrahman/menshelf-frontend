import React from "react";

const AdminTodaysOrders = () => {
  return (
    <div className="mt-10 px-10 py-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl font-bold pl-5 border-l-4 border-pink-600">
        Today's Orders
      </h1>
      <div className="mt-8 border-4">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-fourth font-bold">
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                      >
                        Order Id
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                      >
                        Customer Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                      >
                        Product Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                      >
                        Order Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                      >
                        Total Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-white uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                        {`asdhuahsd12312361231sduashdh`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                        John Brown
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        3
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        22.05.2024
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        $ <span>{`45`}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <span className="px-4 py-2 bg-yellow-200 rounded-lg font-bold">{`Pending`}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-green-600 hover:text-black disabled:opacity-50 disabled:pointer-events-none"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                        {`asdhuahsd12312361231sduashdh`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                        John Brown
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        3
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        22.05.2024
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        $ <span>{`45`}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <span className="px-4 py-2 bg-yellow-200 rounded-lg font-bold">{`Pending`}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-green-600 hover:text-black disabled:opacity-50 disabled:pointer-events-none"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTodaysOrders;
