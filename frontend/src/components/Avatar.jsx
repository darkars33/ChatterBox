import React from "react";
import { PiUserCircle } from "react-icons/pi";

const Avatar = ({ userId, name, imageUrl, height, width }) => {
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

  return (
    <div
      className={`text-slate-800 overflow-hidden rounded-full shadow-lg border text-xl font-bold ${bgColor[randomNumber]}`}
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
    </div>
  );
};

export default Avatar;
