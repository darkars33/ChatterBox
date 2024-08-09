import React, { useEffect, useRef, useState } from "react";
import { PiUserCircle } from "react-icons/pi";
import Avatar from "./Avatar";
import uploadFile from "../helpers/uploadFile";
import Divider from "./Divider";
import axios from "axios";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {setUser} from "../redux/userSlice"

const EditUserDetails = ({ onClose, user }) => {
  const [userData, setUserData] = useState({
    name: user.name,
    profile_Pic: user?.profile_Pic,
  });

  const uploadPhotoRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData((prev) => {
      return {
        ...prev,
        ...user,
      };
    });
  }, [user]);

  console.log("user", userData);

  const handleUploadPhotoOpen = () =>{
      uploadPhotoRef.current.click();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];

    const uploadPhoto = await uploadFile(file);
    console.log("updatedphoto", uploadPhoto);
    setUserData({
      ...userData,
      profile_Pic: uploadPhoto,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const URL= `${import.meta.env.VITE_APP_BACKEND_URL}/api/updateUser`;
      const res = await axios({
        method: "POST",
        url: URL,
        data: userData,
        withCredentials: true,
      });
      console.log("response", res);
      if(res.data.success){
        toast.success(res.data.message);
        dispatch(setUser(res?.data?.data));
        onClose();
      }
    } catch (error) {
     toast.error(error?.response?.data?.message);
     console.log("error", error);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10">
      <div className="bg-white p-4 py-5 m-1 rounded w-[300px]">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit user details</p>

        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={userData.name}
              onChange={handleChange}
              className="w-full py-1 px-2 border-1 rounded bg-slate-200 focus:outline-primary"
            />
          </div>
          <div>
            <div>Photo:</div>
            <div className="my-1 flex items-center gap-4">
              <Avatar
                width={40}
                height={40}
                imageUrl={userData?.profile_Pic}
                name={userData?.name}
              />
              <label htmlFor="profile_Pic">
                <button className="font-semibold" onClick={handleUploadPhotoOpen}>Change Photo</button>
                <input
                  type="file"
                  id="profile_Pic"
                  className="hidden"
                  onChange={handleUploadPhoto}
                  ref={uploadPhotoRef}
                />
              </label>
            </div>
          </div>
          <Divider />
          <div className="flex gap-2 w-fit ml-auto">
            <button
              onClick={onClose}
              className="border-primary border text-primary px-4 py-1 rounded hover:bg-primary hover:text-white"
            >
              Cancel
            </button>
            <button className="border-primary bg-primary text-white border px-4 py-1 rounded hover:bg-secondary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserDetails;
