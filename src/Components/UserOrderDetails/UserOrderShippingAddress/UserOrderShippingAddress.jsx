

const UserOrderShippingAddress = ({selectedOrder}) => {
    return (
        <div className="col-span-7 border-b-2 pb-10 border-eight">
          <div>
            <h1 className="text-sm tracking-wide font-normal mb-2">Shipping Address:</h1>
            <p className="text-xs text-ninth">{selectedOrder.userAddress}, {selectedOrder.userState}, {selectedOrder.userPostalCode}, {selectedOrder.userCountry}</p>
          </div>
          <div>
            <h1 className="text-sm tracking-wide font-normal mt-4 mb-2">Billing Address:</h1>
            <p className="text-xs text-ninth">{selectedOrder.userAddress}, {selectedOrder.userState}, {selectedOrder.userPostalCode}, {selectedOrder.userCountry}</p>
          </div>
        </div>
    );
};

export default UserOrderShippingAddress;