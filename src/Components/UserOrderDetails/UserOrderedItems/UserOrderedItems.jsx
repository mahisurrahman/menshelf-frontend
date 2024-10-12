
const UserOrderedItems = ({selectedOrder}) => {
  return (
    <div>
      {/* overflow-y-scroll custom-scrollbar */}
      <div className="relative overflow-x-auto h-[25vh]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 tracking-widest">
                Product Img
              </th>
              <th scope="col" className="px-6 py-3 tracking-widest">
                Product name
              </th>
              <th scope="col" className="px-6 py-3 tracking-widest">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 tracking-widest">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
              <th scope="row">
                <img className="ml-10 w-20" src={`http://localhost:8000/images/${selectedOrder.productThumb}`} alt="" />
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {selectedOrder.productName}
              </th>
              <td className="px-6 py-4">{selectedOrder.totalQuantity}</td>
              <td className="px-6 py-4">{selectedOrder.totalQuantity > 1 ? selectedOrder.totalQuantity*selectedOrder.productSellingPrice : selectedOrder.productSellingPrice} Tk</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrderedItems;
