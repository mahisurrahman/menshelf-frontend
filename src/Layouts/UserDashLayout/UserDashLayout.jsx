import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navigation/NavBar/Navbar";
import UserDashNav from "../../Components/UserNavbar/UserDashNav/UserDashNav";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import AdminDashLayout from "../AdminDashLayout/AdminDashLayout";

const UserDashLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="text-primary bg-sixth">
      {user.userType === 2 ? (
        <>
          <Navbar></Navbar>
          <div className="grid grid-cols-12 py-7">
            <div className="col-span-3">
              <UserDashNav></UserDashNav>
            </div>
            <div className="col-span-9 pl-5 pr-10 h-[80vh]">
              <Outlet></Outlet>
            </div>
          </div>
          <Footer></Footer>
        </>
      ) : (
        <>
          <AdminDashLayout></AdminDashLayout>
        </>
      )}
    </div>
  );
};

export default UserDashLayout;
