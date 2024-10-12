import { useContext } from "react";
import TotalRecords from "../TotalRecords/TotalRecords";
import UserDashNavMenu from "../UserDashNavmenu/UserDashNavMenu";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UserDashNav = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const removeUser = localStorage.removeItem("userCreds");
    Swal.fire("Logged Out");
    setUser(null);
    navigate("/");
    //Blank COmmit //
  };
  return (
    <div className="">
      <TotalRecords user={user}></TotalRecords>
      <UserDashNavMenu></UserDashNavMenu>
      <div className="px-14 bg-white ml-10 py-3 rounded-lg mt-5">
        <p
          onClick={handleLogout}
          className="text-2xl font-extrabold duration-700 hover:duration-700 hover:text-fourth hover:cursor-pointer"
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default UserDashNav;
