import React, { useEffect, useState } from "react";
import CustomSearch from "../../Components/CustomSearch/CustomSearch";
import AllCustomerTable from "../../Components/AdminComponents/AllCustomerTable/AllCustomerTable";
import useRequest from "../../ApiServices/useRequest";

const AdminAllCustomers = () => {
  const [postRequest, getRequest] = useRequest();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      const userDetails = await getRequest("/users/customer/src");
      setUsers(userDetails?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      setLoading(true);
      await getRequest(`/users/del/${id}`);
      const updatedUsers = getRequest(`/users/customer/src`);
      setUsers(updatedUsers?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="h-[85vh] bg-white rounded-lg shadow-lg overflow-y-scroll scrollbar-thin scrollbar-thumb-scrollbar-thumb px-10 py-10">
      <div className="flex items-center justify-between border-b-2 pb-5">
        <h1 className="text-xl font-bold pl-5 border-l-4 border-seventh">
          All Customers List
        </h1>
        {/* <CustomSearch/> */}
      </div>
      <div className="px-4 py-2">
        <AllCustomerTable users={users} handleDeleteUser={handleDeleteUser} />
      </div>
    </div>
  );
};

export default AdminAllCustomers;
