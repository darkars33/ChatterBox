import React from "react";
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from "react-redux";

const Avatar = ({ userId, name, imageUrl, height, width }) => {
  
  const onlineUser = useSelector(state => state?.user?.onlineUser);
  
  let avatarName = "";

  if (name) {
    const splitName = name?.split(" ");

    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  const bgColor = [
          'bg-slate-200',
          'bg-teal-200',
          'bg-yellow-200',
          'bg-blue-200',
          'bg-indigo-200',
  ]

  const randomNumber = Math.floor(Math.random() * 5);

  const isOnline = onlineUser?.includes(userId);

  return (
    <div
      className={`text-slate-800 relative rounded-full shadow-lg border text-xl font-bold ${bgColor[randomNumber]}`}
      style={{ width: width + "px", height: height + "px" }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          width={width}
          height={height}
          alt={name}
          className="overflow-hidden rounded-full"
        />
          // <div style={{backgroundImage: `url(${imageUrl})`, backgroundSize: "150px"}}>

          // </div>
      ) : name ? (
        <div
          style={{ width: width + "px", height: height + "px" }}
          className="overflow-hidden rounded-full flex justify-center items-center"
        >
          {avatarName}
        </div>
      ) : (
        <PiUserCircle size={width} className="text-slate-800" />
      )}

      {
        isOnline && (
          <div className="bg-green-500 p-1 absolute bottom-0 -right-1 rounded-full"></div>
        )
      }

    </div>
  );
};

export default Avatar;
