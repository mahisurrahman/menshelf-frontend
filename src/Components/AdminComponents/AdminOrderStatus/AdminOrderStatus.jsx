import React from 'react';
import PendingOrders from '../PendingOrders/PendingOrders';
import DeliveredOrders from '../DeliveredOrders/DeliveredOrders';
import CancelledOrders from '../CancelledOrders/CancelledOrders';
import DeletedOrders from '../DeletedOrders/DeletedOrders';

const AdminOrderStatus = ({allPendingOrders, allDeliveredOrders, allDeletedOrders}) => {
    return (
        <div className="mt-10 px-10 py-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-xl font-bold pl-5 border-l-4 border-third">
            Order Status
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-8">
            <PendingOrders allPendingOrders={allPendingOrders}/>
            <DeliveredOrders allDeliveredOrder={allDeliveredOrders}/>
            <DeletedOrders allDeletedOrders={allDeletedOrders}/>
        </div>
      </div>
    );
};

export default AdminOrderStatus;