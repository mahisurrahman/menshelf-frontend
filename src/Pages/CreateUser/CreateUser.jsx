/* eslint-disable react/style-prop-object */
import React, { useState } from "react";
import Swal from "sweetalert2";
import { GiTShirt, GiTrousers, GiHoodie } from "react-icons/gi";
import "./CreateUser.css";
import useRequest from "../../ApiServices/useRequest.js";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading.jsx";
import { Link } from "react-router-dom";

const CreateUser = () => {
  const [postRequest] = useRequest();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("2");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setLoading(true);
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImagePreview(URL.createObjectURL(selectedImage));
      console.log(selectedImage);
      setImage(selectedImage);
      setLoading(false);
    }
  };

  const handleSignUpUser = async (event) => {
    setLoading(true);
    event.preventDefault();
    console.log("image", image);
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("userEmail", email);
    formData.append("userFullName", fullName);
    formData.append("userImg", image);
    formData.append("userPass", password);
    formData.append("gender", gender);
    formData.append("phoneNumber", phoneNumber);
    formData.append("userType", userType);
    formData.append("shippingCountry", country);
    formData.append("shippingState", state);
    formData.append("shippingAddress", address);
    formData.append("shippingPostalCode", postalCode);

    await postRequest("/users/crt", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setLoading(false);
    Swal.fire("Created User");
    navigate("/login");
  };

  return (
    <div className="bgImage w-[100vw] h-[100vh]">
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-primary bg-opacity-40 h-[100vh] w-full grid grid-cols-2 items-center overflow-y-hidden">
          <div className="pl-10">
            <form
              onSubmit={handleSignUpUser}
              className="formContainer py-[30px] w-full border-4 border-secondary rounded-xl flex flex-col items-start justify-center px-[40px]"
            >
              <div className="grid grid-cols-2 gap-4 w-full">
                <div>
                  <label className="mb-1 text-white" htmlFor="username">
                    Username
                  </label>
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    name="username"
                    placeholder="User Name"
                    className="text-lg focus:outline-none py-1 px-4 w-full rounded-md border-0 placeholder:text-sm"
                    id="username"
                  />
                </div>
                <div>
                  <label className="text-white" htmlFor="fullname">
                    Full Name
                  </label>
                  <input
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    className="text-lg focus:outline-none py-1 px-4 w-full rounded-md border-0 placeholder:text-sm"
                    id="fullname"
                  />
                </div>
              </div>

              <div className="mt-5 w-full">
                <div>
                  <label className="text-white" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="number"
                    name="phoneNumber"
                    placeholder="User Phone Number"
                    className="text-lg focus:outline-none py-1 px-4 w-full rounded-md border-0 placeholder:text-sm"
                    id="phoneNumber"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5 w-full">
                <div>
                  <label className="text-white" htmlFor="email">
                    Email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    placeholder="User Email"
                    className="text-lg focus:outline-none py-1 px-4 w-full rounded-md border-0 placeholder:text-sm"
                    id="email"
                  />
                </div>
                <div>
                  <label className="text-white" htmlFor="password">
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    placeholder="User Password"
                    className="text-lg focus:outline-none py-1 px-4 w-full rounded-md border-0 placeholder:text-sm"
                    id="password"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-5 w-full">
                <div>
                  <label className="text-white" htmlFor="country">
                    Country
                  </label>
                  <input
                    onChange={(e) => setCountry(e.target.value)}
                    type="text"
                    name="country"
                    placeholder="Country"
                    className="text-lg focus:outline-none py-1 px-4 w-full rounded-md border-0 placeholder:text-sm"
                    id="country"
                  />
                </div>
                <div>
                  <label className="text-white" htmlFor="state">
                    State
                  </label>
                  <input
                    onChange={(e) => setState(e.target.value)}
                    type="text"
                    name="state"
                    placeholder="State"
                    className="text-lg focus:outline-none py-1 px-4 w-full rounded-md border-0 placeholder:text-sm"
                    id="state"
                  />
                </div>
                <div>
                  <label className="text-white" htmlFor="address">
                    Address
                  </label>
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="text-lg focus:outline-none py-1 px-4 w-full rounded-md border-0 placeholder:text-sm"
                    id="address"
                  />
                </div>
                <div>
                  <label className="text-white" htmlFor="postalCode">
                    Postal Code
                  </label>
                  <input
                    onChange={(e) => setPostalCode(e.target.value)}
                    type="number"
                    name="postalCode"
                    placeholder="Postal Code"
                    className="text-lg focus:outline-none py-1 px-4 w-full rounded-md border-0 placeholder:text-sm"
                    id="postalCode"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5">
                <div>
                  <div className="flex gap-2 items-center mt-5">
                    <div className="flex items-center justify-center">
                      <label htmlFor="userImage" className="text-white">
                        Image:{" "}
                      </label>
                      <input
                        id="image"
                        className=" px-5 w-[100%] text-lg text-white"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                      />
                    </div>
                    {imagePreview && (
                      <div className="flex items-center">
                        <img
                          src={imagePreview}
                          alt="Pic Preview"
                          className="w-20 h-10 rounded-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="mt-5 text-white" htmlFor="gender">
                    Gender
                  </label>
                  <select
                    onChange={(e) => setGender(e.target.value)}
                    name="gender"
                    className="text-lg focus:outline-none py-1 px-4 w-full rounded-md border-0 placeholder:text-sm"
                    id="gender"
                    value={gender}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <input
                className="mt-10 w-full px-6 py-3 rounded-2xl border-none bg-fourth text-white font-bold duration-700 hover:duration-700 hover:cursor-pointer hover:bg-third hover:text-white"
                type="submit"
                value="Create User"
              />
              <div className="text-white flex items-center justify-between mt-5 w-full">
                <p className="text-lg">Old User of Men's Shelf? </p>
                <Link to="/login">
                  <p className="font-bold tracking-widest duration-700 hover:duration-700 hover:text-seventh hover:cursor-pointer">
                    Login With Creds
                  </p>
                </Link>
              </div>
            </form>
          </div>
          <div className="flex flex-col text-center items-center justify-center">
            <h1 className=" text-8xl font-bold tracking-widest uppercase text-white">
              Create <br />
              <span className="font-extrabold">User</span>
            </h1>
            <hr />
            <div>
              <p className=" text-xl tracking-widest mt-5 text-white">
                Get Some Unique, Versatile and Trending <br /> Products for your
                Classified Attire
              </p>
            </div>
            <div className="flex mt-10 gap-10">
              <GiTShirt className="text-5xl text-white" />
              <GiTrousers className="text-7xl text-white" />
              <GiHoodie className="text-5xl text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateUser;
