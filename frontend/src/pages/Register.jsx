import React, { useState } from "react";
import {IoMdClose} from "react-icons/io";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_Pic: "",
  });

  const [profilePic, setProfilePic] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleProfileUpload = (e) =>{
          const file = e.target.files[0];
          setProfilePic(file);
  }

  console.log(profilePic)

  const handleSubmit = (e) =>{
          e.preventDefault();
          e.stopPropagation();
  }

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4">
        <h3>Welcome to Chat app!</h3>

        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Photo :
              <div className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                    {profilePic ? profilePic.name : "Upload your profile picture"}
                </p>
                {profilePic && <button className="text-lg ml-2 hover:text-red-500" onClick={(e) =>{ e.stopPropagation(), e.preventDefault(), setProfilePic(null)}}>
                    <IoMdClose />
                </button>}
              </div>
            </label>
            <input
              type="file"
              id="profile_pic"
              name="profile_Pic"
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
              onChange={handleProfileUpload}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
