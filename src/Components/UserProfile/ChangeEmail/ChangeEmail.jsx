import { useContext } from "react";
import useRequest from "../../../ApiServices/useRequest";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";

const ChangeEmail = () => {
  const [postRequest] = useRequest();
  const { user, setUser } = useContext(AuthContext);

  const handleChangeUserEmail = async (event) => {
    event.preventDefault();
    const form = event.target;
    const userEmail = form.email.value;
    const userCreds = {
      userEmail,
    };
    const changeEmail = await postRequest(`/users/upt/${user._id}`, userCreds);
    // console.log(changeEmail?.data?.data?.modifiedCount);
    if (changeEmail?.data?.data?.modifiedCount > 0) {
      const updateUser = {...user, userEmail: userCreds.userEmail};
      localStorage.setItem("userCreds", JSON.stringify(updateUser));
      setUser(updateUser);
      Swal.fire("Successfully Changed the Email");
    }
  };
  return (
    <div className="bg-white w-full py-5 px-10 mt-6 rounded-lg">
      <form onSubmit={handleChangeUserEmail}>
        <label htmlFor="name" className="font-bold">
          Change User Email
        </label>
        <input
          className="border w-full rounded-md text-lg mt-2 py-2 px-4 placeholder:text-sm"
          placeholder="Change Your Email"
          type="email"
          name="email"
          id="changeEmail"
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

export default ChangeEmail;
