/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import useRequest from "../../ApiServices/useRequest";
import "./LoginUser.css";
import logo from "./man.png";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProviders";

const LoginUser = () => {
  const { handleLoginData, loading, setLoading, user } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;
      const userCreds = { email, password };
      await handleLoginData(userCreds);
      if (handleLoginData) {
        console.log(user, "Userrrr");
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="h-[100vh] bg-fifth grid grid-cols-12">
          <div className="col-span-4 px-10 h-[100vh] flex flex-col justify-center">
            <Link to="/">
              <div className="flex items-center gap-4 justify-center border-b pb-5 mx-5">
                <img src={logo} className="w-20 h-20" alt="" />
                <h1 className="text-4xl font-light">
                  Men's{" "}
                  <span className="font-extrabold text-fourth">Shelf</span>
                </h1>
              </div>
            </Link>
            <div className="mt-10 px-5">
              <form onSubmit={handleLogin}>
                <div className="flex flex-col justify-start">
                  <label className="my-2 text-xl font-semibold" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="text-xl py-4 rounded-lg px-4 focus:outline-none border border-sixth shadow-md"
                    type="email"
                    name="email"
                    id="loginEmail"
                  />
                </div>
                <div className="flex flex-col justify-start mt-5">
                  <label
                    className="my-2 text-xl font-semibold"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="text-xl py-4 rounded-lg px-4 focus:outline-none border border-sixth shadow-md"
                    type="password"
                    name="password"
                    id="loginPassword"
                  />
                </div>
                <div className="flex flex-col justify-start mt-14">
                  <input
                    type="submit"
                    className="w-full bg-fourth py-3 rounded-md text-2xl font-bold text-white duration-700 hover:duration-700 hover:cursor-pointer hover:bg-primary shadow-xl"
                    value="Login"
                  />
                </div>
              </form>
            </div>
            <div className="mt-2 text-center text-eleventh font-bold text-lg tracking-widest">
              <p className="duration-700 hover:duration-700 hover:text-primary hover:cursor-pointer">
                Forgot Password?
              </p>
            </div>
            <div className="mt-10 flex items-center justify-between px-5">
              <p>New to Men's Shelf?</p>
              <Link to="/signup">
                <p className="font-bold duration-700 hover:duration-700 hover:cursor-pointer hover:text-fourth">
                  Create Account
                </p>
              </Link>
            </div>
          </div>
          <div className="col-span-8 image-div"></div>
        </div>
      )}
    </div>
  );
};

export default LoginUser;
