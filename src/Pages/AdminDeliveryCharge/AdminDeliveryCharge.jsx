import React, { useEffect, useState } from "react";
import useRequest from "../../ApiServices/useRequest";
import Swal from "sweetalert2";

function AdminDeliveryCharge() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allCharges, setAllCharges] = useState([]);
  const [postRequest, getRequest] = useRequest();
  const [crtDelvCharge, setDelvCrtCharge] = useState([]);
  const [deleteCharge, setDeleteCharge] = useState([]);

  const createDeliveryCharge = async (e) =>{
    try{
      e.preventDefault();
      const form = e.target;
      const deliveryFee = form.deliveryFee.value;
      const deliveryShift = form.deliveryShift.value;
      const deliveryShiftNumber  = form.deliveryShiftNumber.value;
      const chargesObj = {
        deliveryFee,
        deliveryShift,
        deliveryShiftNumber
      }

      const crtCharge = await postRequest('/delivery/crt', chargesObj);
      setDelvCrtCharge(crtCharge?.data?.data);
      Swal.fire("Created");
      setIsModalOpen(!isModalOpen);
    }catch(error){
      console.log(error);
    }
  }

  const handleDeleteCharge = async(id)=>{
    try{
      const dltCharge = await getRequest(`/delivery/del/byId/${id}`);
      setDeleteCharge(dltCharge?.data?.data);
      if(dltCharge){
        Swal.fire("Removed the Delivery Charge Plan");
      }
    }catch(error){
      console.log(error);
    }
  }

  const getAllCharges = async()=>{
    try{
      let response = await getRequest("/delivery/src/all");
      setAllCharges(response?.data?.data);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getAllCharges();
  },[crtDelvCharge, deleteCharge])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="relative">
      {/* Main Content */}
      <div className={`bg-white px-10 py-10 rounded-lg h-[85vh] overflow-y-scroll ${isModalOpen ? 'blur-sm' : ''}`}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">
            All The Delivery Charges Schedules
          </h1>
          <button
            onClick={toggleModal}
            className="px-4 py-2 bg-green-700 font-bold text-white duration-500 rounded-lg hover:duration-500 hover:bg-green-800"
          >
            Add New
          </button>
        </div>
        <div className="mt-10 grid grid-cols-4 gap-y-4 items-center">
          {
            allCharges && allCharges.length > 0 ? <>
                {
                  allCharges.map((charge)=><div className="border border-black w-60 h-60 rounded-lg bg-green-100 flex items-center justify-center">
                    <div className="px-10 py-10 text-center">
                      <h1 className="text-2xl font-bold">{charge?.deliveryShift}</h1>
                      <h1 className="mt-5 text-3xl font-bold">{charge?.deliveryFee} /- TK</h1>
                      <div className="mt-5 w-full flex items-center justify-center">
                        <button 
                        onClick={()=>handleDeleteCharge(charge?._id)}
                        className="rounded-lg text-sm px-5 py-2 bg-black text-white font-bold duration-500 hover:duratipn-500 hover:bg-red-500 hover:cursor-pointer"> Remove </button>
                      </div>
                    </div>
                  </div>)
                }
            </> : <>No Delivery Charges Available</>
          }
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form onSubmit={createDeliveryCharge} className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Add New Delivery Charge</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Delivery Shift</label>
              <input
              name="deliveryShift"
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Delivery Shift Number</label>
              <input
              name="deliveryShiftNumber"
                type="number"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Delivery Fee</label>
              <input
              name="deliveryFee"
                type="number"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2 hover:bg-red-600"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminDeliveryCharge;
