import React, { useState, useEffect } from "react";
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
          const [show , setShow] = useState(false);
          const [allUsers, setAllUsers] = useState([]);
          const [openSearchUser, setOpenSearchUser] = useState(false);
          const socketConnection = useSelector(state => state?.user?.socketConnection);

          useEffect(() =>{
            if(socketConnection){
              socketConnection.emit('sidebar', user?._id);

              socketConnection.on('conversation', (data) =>{
                console.log("conversation", data);

                const conversationUserData = data.map((conversationUser, index) =>{
                  if(conversationUser?.sender?._id === conversationUser.receiver?._id){
                    return  {
                      ...conversationUser,
                      userDetails: conversationUser.sender
                    }
                  }
                  else if(conversationUser?.receiver?._id === user._id){
                    return {
                      ...conversationUser,
                      userDetails: conversationUser.receiver
                    }
                  }else{
                    return {
                      ...conversationUser,
                      userDetails: conversationUser.sender
                    }
                  }
                })

                setAllUsers(conversationUserData);



              })
            }
          },[socketConnection, user])


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
                    <Avatar width={40} height={40} imageUrl={user?.profile_Pic} userId={user?._id} />
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
             <div className="h-[calc(100vh-60px)] overflow-x-hidden overflow-y-scroll flex flex-col gap-4">
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

              {
                allUsers.map((conv, index) =>{
                  return (
                    <div kry={conv?._id} className="flex gap-2 items-center p-3 border">
                        <div>
                          <Avatar imageUrl={conv.userDetails.profile_Pic} name={conv?.userDetails?.name} width={50} height={50} />
                        </div>
                        <div>
                          <h3>{conv?.userDetails?.name}</h3>
                          </div>
                    </div>
                  )
                })
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
