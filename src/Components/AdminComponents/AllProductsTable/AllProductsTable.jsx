import React from "react";
import SingleProductItem from "../SingleProductItem/SingleProductItem";

const AllProductsTable = ({
  allProducts,
  handleDeleteProducts,
  handleActiveProducts,
  loading,
}) => {
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
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs text-white font-extrabold uppercase"
                    >
                      Product Image
                    </th> */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs text-white font-extrabold uppercase"
                    >
                      Stock Remaining
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs text-white font-extrabold uppercase"
                    >
                      Buying Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs text-white font-extrabold uppercase"
                    >
                      Selling Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs text-white font-extrabold uppercase"
                    >
                      Discount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs text-white font-extrabold uppercase"
                    >
                      Active
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs text-white font-extrabold uppercase"
                    >
                      Deleted
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
                  {allProducts.map((product) => (
                    <SingleProductItem
                      key={product._id}
                      product={product}
                      handleDeleteProducts={handleDeleteProducts}
                      handleActiveProducts={handleActiveProducts}
                      loading={loading}
                    />
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

export default AllProductsTable;
