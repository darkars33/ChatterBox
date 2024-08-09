import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import { FaPlus } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import uploadFile from "../helpers/uploadFile";
import { IoClose } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import moment from "moment";

const Messages = () => {
  const params = useParams();

  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const user = useSelector((state) => state?.user);
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_Pic: "",
    online: false,
    _id: "",
  });
  console.log("params", params);

  const [openImagevideo, setOpenImageVideo] = useState(false);

  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const currentMessage = useRef(null);

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [allMessages]);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);

      socketConnection.on("message-user", (data) => {
        setDataUser(data);
      });

      socketConnection.on("message", (data) => {
        console.log("data", data);
        setAllMessages(data);
      });
    }
  }, [socketConnection, params?.userId, user]);

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadImage = await uploadFile(file);
    setLoading(false);
    setOpenImageVideo(false);
    setMessage((prev) => {
      return {
        ...prev,
        imageUrl: uploadImage,
      };
    });
  };

  const handleClear = () => {
    setMessage((prev) => {
      return {
        ...prev,
        imageUrl: "",
      };
    });
  };

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadImage = await uploadFile(file);
    setLoading(false);
    setOpenImageVideo(false);
    setMessage((prev) => {
      return {
        ...prev,
        videoUrl: uploadImage,
      };
    });
  };

  const handleClearVideo = () => {
    setMessage((prev) => {
      return {
        ...prev,
        videoUrl: "",
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage((prev) => {
      return {
        ...prev,
        text: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit("new-message", {
          sender: user?._id,
          receiver: params?.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: user?._id,
        });
        setMessage({
          text: "",
          imageUrl: "",
          videoUrl: "",
        });
      }
    }
  };
  return (
    <div className="z-0">
      <header className="sticky top-0 h-16 bg-white">
        <div className="flex items-center gap-4">
          <div>
            <Avatar
              width={50}
              height={50}
              imageUrl={dataUser?.profile_Pic}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg my-1">{dataUser?.name}</h3>
            <p className="-my-2">
              {dataUser?.online ? (
                <span className="text-primary">online</span>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </p>
          </div>
        </div>
      </header>

      <section className="relative h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar">
        
      <div className="flex flex-col gap-2 ml-2" ref={currentMessage}>
          {allMessages.map((msg, index) => {
            return (
              <div
                className={`bg-white p-1 py-1 rounded w-fit max-w-sm ${
                  user._id === msg.msgByUserId ? "ml-auto bg-teal-100" : ""
                }`}
              >
                <div className="w-full">
                {msg.imageUrl && (
                  <video
                    src={msg.imageUrl}
                    className="w-full h-full object-cover rounded"
                    alt="uploadImage"
                  />
                )}
                </div>

                <div className="w-full">
                {msg.videoUrl && (
                  <img
                    src={msg.videoUrl}
                    className="w-full h-full object-cover rounded"
                    alt="uploadImage"
                  />
                )}
                </div>

                <p className="px-2">{msg.text}</p>
                <p className="text-xs ml-auto">
                  {moment(msg.createdAt).format("hh:mm")}
                </p>
              </div>
            );
          })}
        </div>
        
        {message.imageUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-primary">
              <IoClose size={30} onClick={handleClear} />
            </div>
            <div className="bg-white p-3">
              <img
                src={message.imageUrl}
                className="aspect-video w-full h-full max-w-sm object-scale-down"
                alt="uploadImage"
              />
            </div>
          </div>
        )}

        {message.videoUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-primary">
              <IoClose size={30} onClick={handleClearVideo} />
            </div>
            <div className="bg-white p-3">
              <video
                src={message.videoUrl}
                className="aspect-video w-full h-full max-w-sm"
                controls
                muted
                autoplay
              />
            </div>
          </div>
        )}

        {loading && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-3 rounded">
              <p className="text-primary">Uploading...</p>
            </div>
          </div>
        )}

        
      </section>

      <section className="h-16 bg-white flex items-center px-4">
        <div className="relative ">
          <button
            onClick={() => setOpenImageVideo(!openImagevideo)}
            className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white"
          >
            <FaPlus size={20} />
          </button>

          {openImagevideo && (
            <div className="bg-white shadow rounded absolute bottom-16 w-36 p-2">
              <form>
                <label
                  htmlFor="uploadImage"
                  className="flex items-center p-2 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-primary">
                    <FaImage size={18} />
                  </div>
                  <p>Image</p>
                </label>
                <label
                  htmlFor="uploadImage"
                  className="flex items-center p-2 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-primary">
                    <FaVideo size={18} />
                  </div>
                  <p>Video</p>
                </label>

                <input
                  type="file"
                  id="uploadImage"
                  onChange={handleUploadImage}
                  className="hidden"
                />
                <input
                  type="file"
                  id="uploadImage"
                  onChange={handleUploadVideo}
                  className="hidden"
                />
              </form>
            </div>
          )}
        </div>

        <form className="w-full h-full flex" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type here message..."
            className="py-1 px-4 outline-none w-full h-full"
            value={message.text}
            onChange={handleChange}
          />
          <button className="text-primary hover:text-secondary">
            <IoMdSend size={30} />
          </button>
        </form>
      </section>
    </div>
  );
};

export default Messages;
