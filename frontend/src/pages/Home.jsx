import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, setUser } from '../redux/userSlice';
import Sidebar from '../components/Sidebar';

const Home = () => {

  const user = useSelector(state => state.user);
  console.log("redux user",user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async () =>{
    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/userDetails`;
      const res = await axios({
        method: 'get',
        url: URL,
        withCredentials: true
      });

      dispatch(setUser(res.data.data));

      if(res.data.logout){
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

  return (
    <div className='grid lg:grid-cols-[320px,1fr] h-screen max-h-screen'>
      <section className='bg-white'>
       <Sidebar />
      </section>

      <section>
        <Outlet />
      </section>
    </div>
  )
}

export default Home
