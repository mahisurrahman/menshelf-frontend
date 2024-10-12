import { useContext } from "react";
import useRequest from "../../../ApiServices/useRequest";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const [postRequest] = useRequest();
  const { user, setUser } = useContext(AuthContext);

  const handleChangeUserPassword = async (event) => {
    event.preventDefault();
    const form = event.target;
    const newPassword = form.password.value;
    const userCreds = {
        newPassword,
    };
    const changeUserPass = await postRequest(`/users/password/upt/${user._id}`, userCreds);
    if (changeUserPass?.data?.error === false) {
      const updateUser = {...user, userName: userCreds.userName};
      localStorage.setItem("userCreds", JSON.stringify(updateUser));
      setUser(updateUser);
      Swal.fire("Successfully Changed the User Password");
    }
  };
  return (
    <div className="bg-white w-full py-5 px-10 mt-6 rounded-lg">
      <form onSubmit={handleChangeUserPassword}>
        <label htmlFor="name" className="font-bold">
         Change User Password
        </label>
        <input
          className="border w-full rounded-md text-lg mt-2 py-2 px-4 placeholder:text-sm"
          placeholder="Change Your Password"
          type="password"
          name="password"
          id=""
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

export default ChangePassword;
