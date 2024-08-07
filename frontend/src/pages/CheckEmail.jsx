import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import uploadFile from "../helpers/uploadFile";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckEmail = () => {
  const [data, setData] = useState({
    email: "",
  });


  const navigate = useNavigate();

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
    const url = `${import.meta.env.VITE_APP_BACKEND_URL}/api/email`;
    try {
      const res = await axios.post(url, data);
      console.log("response", res);
      if (res.data.success) {
        toast.success(res.data.message);
        setData({
          email: "",
        });
        navigate("/password",{
          state: res?.data?.data
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx:2 rounded overflow-hidden p-4 md:mx-auto">
        <h3 className="text-center">Welcome to Chat app!</h3>

        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <button className="bg-primary text-lg px=4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
            Let's Go
          </button>
        </form>
        <p className="text-center my-3">
          New User ? {" "}
          <Link to={"/register"} className="hover:text-primary hover:underline">
            Register
          </Link>{" "}
        </p>
      </div>
    </div>
  )
}

export default CheckEmail
