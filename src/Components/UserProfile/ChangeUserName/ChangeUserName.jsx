import React, { useContext } from "react";
import useRequest from "../../../ApiServices/useRequest";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";

const ChangeUserName = () => {
  const [postRequest] = useRequest();
  const { user, setUser } = useContext(AuthContext);

  const handleChangeUserName = async (event) => {
    event.preventDefault();
    const form = event.target;
    const userName = form.userName.value;
    const userCreds = {
      userName,
    };
    const changeUserName = await postRequest(`/users/upt/${user._id}`, userCreds);
    // console.log(changeUserName?.data?.data?.modifiedCount);
    if (changeUserName?.data?.data?.modifiedCount > 0) {
      const updateUser = {...user, userName: userCreds.userName};
      localStorage.setItem("userCreds", JSON.stringify(updateUser));
      setUser(updateUser);
      Swal.fire("Successfully Changed the User Name");
    }
  };
  return (
    <div className="bg-white w-full py-9 px-10 mt-6 rounded-lg">
      <form onSubmit={handleChangeUserName}>
        <label htmlFor="name" className="font-bold">
          Change User Name
        </label>
        <input
          className="border w-full rounded-md text-lg mt-2 py-2 px-4 placeholder:text-sm"
          placeholder="Change Your User Name"
          type="text"
          name="userName"
          id="userName"
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

export default ChangeUserName;
