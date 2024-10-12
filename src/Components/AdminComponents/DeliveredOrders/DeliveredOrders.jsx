import { IoCheckmarkDone } from "react-icons/io5";

const DeliveredOrders = ({allDeliveredOrder}) => {
  return (
    <div className="border-4 rounded-lg h-[14vh] border-b-4 border-b-lime-500">
      <div className="flex items-center justify-between h-full px-5 py-2">
        <IoCheckmarkDone className="text-gray-600 text-4xl" />
        <div className="text-right">
          <h1 className="text-xl font-extrabold text-slate-600">
            Cancelled Orders
          </h1>
          <p className="text-xl mt-1">{allDeliveredOrder.length}</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveredOrders;
