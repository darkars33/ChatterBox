import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import uploadFile from "../helpers/uploadFile";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/userSlice";

const CheckPassword = () => {
  const [data, setData] = useState({
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/password`;
    try {
      const res = await axios({
        method: "post",
        url: URL,
        data: {
          password: data.password,
          userId: location?.state?._id,
        },
        withCredentials: true,
      });
      console.log("response", res);
      if (res.data.success) {
        dispatch(setToken(res?.data?.token));
        localStorage.setItem("token", res?.data?.token);
        // console.log("res", res.data.token)
        toast.success(res.data.message);
        setData({
          password: "",
        });
        navigate("/");
      }

    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx:2 rounded overflow-hidden p-4 md:mx-auto">
        <div className="w-fit mx-auto mb-2">
          <Avatar
            width={70}
            height={70}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_Pic}
          />
          <h1 className="text-center mt-2 text-2xl font-semibold">
            {location?.state?.name}
          </h1>
        </div>

        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Password :</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <button className="bg-primary text-lg px=4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
            Login
          </button>
        </form>
        <p className="text-center my-3">
          <Link to={"/register"} className="hover:text-primary hover:underline">
            Forgot Password ?
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default CheckPassword;
