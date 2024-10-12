import NavLogo from "../../Navigation/NavLogo/NavLogo";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AiFillSkin } from "react-icons/ai";

const AdminNavbar = ({ user }) => {
  return (
    <div className="h-[10vh] bg-fourth">
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-3 flex items-center justify-center border-r-2">
          <NavLogo></NavLogo>
        </div>
        <div className="col-span-9 px-10 h-full">
          <div className="flex justify-between items-center h-full">
            <div>
              <div className="px-4 py-1 text-white">
                <p className="text-2xl font-extrabold">Admin Panel</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="px-4 py-2">
                <Link to="/admin/panel/createproducts">
                  <div className="border-2 rounded-full bg-white text-fourth duration-500 px-4 py-2 flex items-center justify-center gap-3 hover:cursor-pointer hover:border-primary hover:text-primary hover:duration-500">
                    <p className="text-xl">
                      <AiFillSkin></AiFillSkin>
                    </p>
                    <p className="text-sm">Create Products</p>
                  </div>
                </Link>
              </div>
              <div className="border-l">
                <Link to="/">
                  {/* <div className="border-2 rounded-full duration-500 px-4 py-2 flex items-center justify-center gap-3 text-white hover:cursor-pointer hover:border-primary hover:text-primary hover:duration-500">
                    <p className="text-xl">
                      <IoHome></IoHome>
                    </p>
                    <p className="text-sm">Visit Site</p>
                  </div> */}
                </Link>
              </div>
              <div className="flex items-center gap-3 border-l px-4">
                <img
                  className="w-12 rounded-full"
                  src={`http://localhost:8000/images/${user?.userImg}`}
                  alt=""
                />
                <div className="text-left">
                  <p className="text-white">{user.userName}</p>
                  <p className="text-white text-xl">{user.userFullName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
