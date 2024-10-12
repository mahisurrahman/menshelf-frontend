import React, { useContext } from "react";
import useRequest from "../../../ApiServices/useRequest";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";

const ChangeFullName = () => {
    const [postRequest] = useRequest();
    const { user, setUser } = useContext(AuthContext);
  
    const handleChangeFullName = async (event) => {
      event.preventDefault();
      const form = event.target;
      const userFullName = form.fullName.value;
      const userCreds = {
        userFullName,
      };
      const changeUserFullName = await postRequest(
        `/users/upt/${user._id}`,
        userCreds
      );
      // console.log(changeUserFullName?.data?.data?.modifiedCount);
      if (changeUserFullName?.data?.data?.modifiedCount > 0) {
        const updateUser = { ...user, userFullName: userCreds.userFullName };
        localStorage.setItem("userCreds", JSON.stringify(updateUser));
        setUser(updateUser);
        Swal.fire("Successfully Changed the User Full Name");
      }
    };
  return (
    <div className="bg-white w-full py-5 px-10 mt-6 rounded-lg">
      <form onSubmit={handleChangeFullName}>
        <label htmlFor="name" className="font-bold">
          Change Full Name
        </label>
        <input
          className="border w-full rounded-md text-lg mt-2 py-2 px-4 placeholder:text-sm"
          placeholder="Change Your Full Name"
          type="text"
          name="fullName"
          id="fullName"
        />
        <div className="w-full flex justify-end mt-5">
          <input
            type="submit"
            className="bg-fourth border-2 border-fourth px-4 py-2 rounded-lg text-md font-bold text-white duration-700 hover:duration-700 hover:bg-white hover:text-fourth"
            value="Save"
          />
        </div>
      </form>
    </div>
  );
};

export default ChangeFullName;
