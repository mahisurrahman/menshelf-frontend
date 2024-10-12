import React, { useContext } from "react";
import useRequest from "../../../ApiServices/useRequest";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";

const ChangeGender = () => {
  const [postRequest] = useRequest();
  const { user, setUser } = useContext(AuthContext);

  const handleChangeGender = async (event) => {
    event.preventDefault();
    const form = event.target;
    const gender = form.gender.value;
    const userCreds = {
      gender,
    };
    const changeUserGender = await postRequest(
      `/users/upt/${user._id}`,
      userCreds
    );
    // console.log(changeUserGender?.data?.data?.modifiedCount);
    if (changeUserGender?.data?.data?.modifiedCount > 0) {
      const updateUser = { ...user, gender: userCreds.gender };
      localStorage.setItem("userCreds", JSON.stringify(updateUser));
      setUser(updateUser);
      Swal.fire("Successfully Changed the User Gender");
    }
  };

  return (
    <div className="bg-white w-full py-5 px-10 mt-6 rounded-lg">
      <form onSubmit={handleChangeGender}>
        <label htmlFor="name" className="font-bold">
          Change Gender
        </label>
        <input
          className="border w-full rounded-md text-lg mt-2 py-2 px-4 placeholder:text-sm"
          placeholder="Change Your Gender"
          type="text"
          name="gender"
          id="gender"
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

export default ChangeGender;
