import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice';
import Sidebar from '../components/Sidebar';
import { useLocation } from 'react-router-dom';
import io from "socket.io-client"


const Home = () => {

  const user = useSelector(state => state.user);
  console.log("redux user",user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('user', user);

  const fetchData = async () =>{
    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/userDetails`;
      const res = await axios({
        method: 'get',
        url: URL,
        withCredentials: true
      });

      dispatch(setUser(res.data.data));

      if(res.data.data.logout){
        dispatch(logout());
        navigate('/email');
      }

      console.log('response', res);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() =>{
    fetchData();
  },[])

  useEffect(() =>{
    const socketConnection = io(import.meta.env.VITE_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem('token'),
      }
    })

    socketConnection.on('onlineUser', (data) =>{
      console.log('online user', data);
      dispatch(setOnlineUser(data));
    })

    dispatch(setSocketConnection(socketConnection));

    return () =>{
      socketConnection.disconnect();
    }
  },[])

  const basePath= location.pathname=== '/';

  return (
    <div className='grid lg:grid-cols-[320px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && 'hidden'} lg:block`}>
       <Sidebar />
      </section>

      <section className={`${basePath && 'hidden'}`}>
        <Outlet />
      </section>

      {basePath && <div className='lg:flex justify-center items-center flex-col gap-2 hidden'>
        <div>
          <h1 className='text-[3rem]'>Chat App</h1>
        </div>
        <p className='text-lg mt-2 text-center'>Select user to send message</p>
      </div>}

    </div>
  )
}

export default Home
