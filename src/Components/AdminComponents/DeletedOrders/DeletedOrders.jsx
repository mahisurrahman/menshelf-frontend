
import { FaLuggageCart } from "react-icons/fa";

const DeletedOrders = ({allDeletedOrders}) => {
  return (
    <div className="border-4 rounded-lg h-[14vh] border-b-4 border-b-purple-500">
      <div className="flex items-center justify-between h-full px-5 py-2">
        <FaLuggageCart className="text-gray-600 text-4xl" />
        <div className="text-right">
          <h1 className="text-xl font-extrabold text-slate-600">
            Deleted Orders
          </h1>
          <p className="text-xl mt-1">{allDeletedOrders.length}</p>
        </div>
      </div>
    </div>
  );
};

export default DeletedOrders;
