import React, { useState } from "react";

const EditUserDetails = ({ data, onClose }) => {
  const [userData, setUserData] = useState({
    name: data.name,
    profile_Pic: data?.profile_Pic,
  });

  const handleChange = (e) =>{
          const {name, value} = e.target;

          setUserData({
                    ...userData,
                    [name]: value
          })
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-4 m-1 rounded max-w-sm">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit user details</p>

        <form>
          <div>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" value={userData.name} onChange={handleChange} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserDetails;
