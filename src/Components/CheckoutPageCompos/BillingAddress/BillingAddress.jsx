import React, { useState } from 'react';
import useRequest from '../../../ApiServices/useRequest';

const BillingAddress = ({ customerDetails, refreshCustomerDetails }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [modifiedFields, setModifiedFields] = useState({});
    const [postRequest] = useRequest();

    const handleFieldChange = (field, value) => {
        setModifiedFields(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            let updateAddress = await postRequest(`/users/upt/${customerDetails?.userId}`, modifiedFields);
            if (updateAddress?.data?.error === false) {
                setShowSuccessModal(true); // Show success modal
                refreshCustomerDetails();   // Refresh data
            }
        } catch (error) {
            console.error("Failed to update address", error);
        } finally {
            setIsModalOpen(false);
            setModifiedFields({});
        }
    };

    return (
        <div className="my-5 rounded-lg shadow-xl px-10 py-10 bg-white">
            <div className="flex justify-between mb-4">
                <div className="flex justify-start gap-2 items-center">
                    <p className="bg-fourth px-3 py-2 rounded-full text-white text-xs font-normal">2</p>
                    <p className="tracking-widest text-sm font-semibold">Billing Address</p>
                </div>
                <button
                    className="text-fourth font-bold text-md"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Update
                </button>
            </div>
            {customerDetails?.isActive ? (
                <textarea
                    className="text-sm border-2 tracking-widest w-full border-ninth px-4 py-2 rounded-md mt-2 focus:outline-none default:uppercase"
                    defaultValue={`${customerDetails?.shippingCountry}, ${customerDetails?.shippingAddress}, ${customerDetails?.shippingState}, ${customerDetails?.shippingPostalCode}`}
                />
            ) : (
                <div role="status">
                    {/* Loader component */}
                </div>
            )}

            {isModalOpen && (
                <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-lg font-semibold mb-4">Edit Billing Address</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Country"
                                defaultValue={customerDetails?.shippingCountry}
                                onChange={(e) => handleFieldChange('shippingCountry', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                defaultValue={customerDetails?.shippingAddress}
                                onChange={(e) => handleFieldChange('shippingAddress', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
                            />
                            <input
                                type="text"
                                placeholder="State"
                                defaultValue={customerDetails?.shippingState}
                                onChange={(e) => handleFieldChange('shippingState', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
                            />
                            <input
                                type="text"
                                placeholder="Postal Code"
                                defaultValue={customerDetails?.shippingPostalCode}
                                onChange={(e) => handleFieldChange('shippingPostalCode', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
                            />
                        </div>
                        <div className="mt-6 flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                onClick={handleUpdate}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-lg font-semibold mb-4">Update Successful</h2>
                        <p className="text-sm">The billing address has been updated successfully.</p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                            onClick={() => setShowSuccessModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillingAddress;
