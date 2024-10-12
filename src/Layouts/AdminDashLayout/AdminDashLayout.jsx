import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import Loading from "../../Components/Loading/Loading";
import AdminNavbar from "../../Components/AdminComponents/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../Components/AdminComponents/AdminSidebar/AdminSidebar";

const AdminDashLayout = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  return (
    <div className="bg-fifth">
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <AdminNavbar
            user={user}
            loading={loading}
            setLoading={setLoading}
          ></AdminNavbar>
          <div className="grid grid-cols-12">
            <div className="col-span-3">
              <div className="ml-5 my-5 bg-white rounded-lg shadow-xl h-[85vh] overflow-y-scroll mr-2">
                <AdminSidebar user={user} setUser={setUser}></AdminSidebar>
              </div>
            </div>
            <div className="col-span-9">
              <div className="mx-5 my-5">
                <Outlet></Outlet>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashLayout;
