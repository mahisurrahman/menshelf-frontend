import { FaHourglassEnd } from "react-icons/fa";

const PendingOrders = ({allPendingOrders}) => {
    return (
        <div className="border-4 rounded-lg h-[14vh] border-b-4 border-b-sky-500">
            <div className="flex items-center justify-between h-full px-5 py-2">
                <FaHourglassEnd className="text-gray-600 text-4xl"/>
                <div className="text-right">
                    <h1 className="text-xl font-extrabold text-slate-600">Pending Orders</h1>
                    <p className="text-xl mt-1">{allPendingOrders.length}</p>
                </div>
            </div>
        </div>
    );
};

export default PendingOrders;