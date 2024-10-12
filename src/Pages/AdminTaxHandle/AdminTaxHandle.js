import React, { useEffect, useState } from "react";
import useRequest from "../../ApiServices/useRequest";
import Swal from "sweetalert2";

function AdminTaxHandle() {
  const [tax, setTax] = useState([]);
  const [createdTax, setCreatedTax] = useState(""); // Initialize as an empty string
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postRequest, getRequest] = useRequest();
  const [deletedTax, setDeletedTax] = useState([]);

  const crtTaxFunc = async () => {
    try {
      const crtTax = await postRequest("/tax/crt", { taxNumber: createdTax });
      setCreatedTax(crtTax?.data?.data);
      Swal.fire("Successfully Added the Tax");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTaxFunc = async (id) => {
    console.log("Deleting Id", id);
    try {
      const response = await getRequest(`/tax/del/byId/${id}`);
      setDeletedTax(response?.data?.data);
      Swal.fire("Successfully Removed the Tax");
    } catch (error) {
      console.log(error);
    }
  };

  const getTaxFunc = async () => {
    try {
      const response = await getRequest("/tax/src");
      setTax(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaxFunc();
  }, [createdTax, deletedTax]);

  // Function to handle number input and restrict the value between 1 and 100
  const handleInputChange = (e) => {
    const value = Math.max(0, Math.min(100, Number(e.target.value)));
    if (e.target.value === "") {
      setCreatedTax(""); // Allow clearing the input field
    } else {
      setCreatedTax(value);
    }
  };

  return (
    <div className="px-10 py-10 rounded-lg bg-white h-[85vh] relative">
      <h1 className="text-4xl font-extrabold text-center">
        Handle Your Taxes from Here
      </h1>
      <div className="mt-10 h-[40vh] w-full flex justify-center items-center">
        <div className="w-[40vw] h-full bg-white rounded-lg shadow-lg py-10 px-10 flex items-center justify-center">
          <div className="w-full flex flex-col gap-10 items-center justify-center">
            {tax && tax?.length > 0 ? (
              <></>
            ) : (
              <button
                className="bg-black px-10 py-2 rounded-lg font-bold text-xl text-white duration-500 hover:duration-500 hover:bg-slate-700"
                onClick={() => setIsModalOpen(true)}
              >
                Add New
              </button>
            )}
            {tax && tax?.length > 0 ? (
              <h1 className="text-6xl font-extrabold text-green-800">
                TAX: <span className="text-red-600">{tax[0]?.taxNumber}</span>%
              </h1>
            ) : (
              <h1 className="text-center">No Tax Added Yet</h1>
            )}
            {tax && tax.length > 0 ? (
              <button
                onClick={() => deleteTaxFunc(tax[0]?._id)}
                className="bg-red-500 px-10 py-2 rounded-lg font-bold text-xl text-white duration-500 hover:duration-500 hover:bg-red-700"
              >
                Delete
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[30vw]">
            <h2 className="text-2xl font-bold mb-4">Add Tax Percentage</h2>
            <input
              type="number"
              value={createdTax}
              onChange={handleInputChange}
              min="0"
              max="100"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter tax percentage"
            />
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-green-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-green-700"
                onClick={() => {
                  crtTaxFunc();
                  setIsModalOpen(false); // Close the modal
                }}
              >
                Save
              </button>
              <button
                className="bg-gray-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTaxHandle;
