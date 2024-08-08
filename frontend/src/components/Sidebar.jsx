import React, { useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Avatar from "./Avatar";
import EditUserDetails from "./EditUserDetails";
import { useSelector } from "react-redux";
import Divider from "./Divider";
import {FiArrowUpLeft} from "react-icons/fi";
import SearchUser from "./SearchUser";

const Sidebar = () => {
          const user = useSelector(state => state?.user);
          console.log("sidebar",user);
          const [show , setShow] = useState(false);
          const [allUsers, setAllUsers] = useState([]);
          const [openSearchUser, setOpenSearchUser] = useState(false);
  return (
    <div className="w-full h-full flex bg-white">
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
            onClick={() => setOpenSearchUser(!openSearchUser)}
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
      <div className="w-full">
             <div className="h-16 flex justify-center items-center">
             <h2 className="text-2xl font-bold p-4">Message</h2>
             </div>
             <Divider />
             <div className="h-[calc(100vh-60px)] overflow-x-hidden overflow-y-scroll">
              {
                allUsers.length == 0 && (
                  <div className="flex flex-col justify-center items-center my-4 text-slate-400">
                    <div>
                      <FiArrowUpLeft size={50} className="mx-auto" />
                    </div>
                    <p className="text-sm text-center p-3 text-slate-600">Explore users to start a conversation.</p>
                  </div>
                )
              }
             </div>
        </div>


          {show && <EditUserDetails onClose={() =>setShow(false)} user={user} />}

            {
              openSearchUser && (
                <SearchUser onClose={() => setOpenSearchUser(!openSearchUser)} />
              )
            }


    </div>
  );
};

export default Sidebar;
