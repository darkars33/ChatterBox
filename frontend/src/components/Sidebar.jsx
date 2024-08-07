import React, { useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Avatar from "./Avatar";
import EditUserDetails from "./EditUserDetails";
import { useSelector } from "react-redux";

const Sidebar = () => {
          const user = useSelector(state => state?.user);
          console.log("sidebar",user);
          const [show , setShow] = useState(false);
  return (
    <div className="w-full h-full">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between">
        <div>
          <div
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
            title="chat"
          >
            <IoChatbubbleEllipses size={25} />
          </div>
          <div
            title="add friend"
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
          >
            <FaUserPlus size={25} />
          </div>
        </div>

        <div >
          <button className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded" onClick={() =>setShow(!show)}>
                    <Avatar width={40} height={40} imageUrl={user?.profile_Pic} />
          </button>
          <button className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded">
            <span className="-ml-2">
              <BiLogOut size={25} />
            </span>
          </button>
        </div>
      </div>


          {show && <EditUserDetails onClose={() =>setShow(false)} user={user} />}

    </div>
  );
};

export default Sidebar;
