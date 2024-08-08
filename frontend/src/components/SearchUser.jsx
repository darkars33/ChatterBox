import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import UserCard from "./UserCard";
import toast from "react-hot-toast";
import axios from "axios";
import {IoClose} from "react-icons/io5";

const SearchUser = ({onClose}) => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchUser = async () => {
    const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/search-user`;
    try {
      const res = await axios.post(URL,{
        search: search
      })
      setLoading(false);

      setSearchUser(res.data.data);

    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() =>{
    handleSearchUser();
  },[search])

  console.log("searchUser", searchUser);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 overflow-y-scroll">
      <div className="w-full max-w-lg mx-auto mt-10">
        <div className="bg-white rounded h-14 overflow-hidden flex">
          <input
            type="text"
            placeholder="Search User"
            className="w-full outline-none py-1 h-full px-4"
            value={search}
            onChange={(e) => setSearch(e.target.value) }
          />
          <div className="h-14 w-14 flex justify-center items-center">
            <IoSearchOutline size={25} className="text-slate-400" />
          </div>
        </div>
        <div className="bg-white mt-2 w-full p-4 rounded overflow-y-scroll">
          {searchUser.length === 0 && !loading && (
                    <p className="text-center text-slate-500">no user found!</p>
          )}
          {
                    loading && (<p className="text-center">loading...</p>)
          }
          {
            searchUser.length !==0 && !loading && (
              searchUser.map((user, index) =>{
                return (
                  <UserCard key={user._id} user={user} onClose={onClose} />
                )
              })
            )
          }
        </div>
      </div>
          <div className="absolute top-0 right-0">
          <button>
            <IoClose size={25} onClick={onClose} className="cursor-pointer text-white bg-primary rounded-full p-1 fixed top-5 right-5" />
          </button>
          </div>
    </div>
  );
};

export default SearchUser;
