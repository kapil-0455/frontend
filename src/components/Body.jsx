import React, { useEffect } from 'react'
import axios from 'axios'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.user);

  const fetchUser = async()=>{
    if(userData) return;
    try {
      const res = await axios.get(BASE_URL + '/profile/view' , {withCredentials : true});
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login')
      }
      console.error(error)
    }
  }

  useEffect(()=>{
      fetchUser()
  } , [])


  return (
    <div className="flex flex-col min-h-screen bg-base-100/50">
        <NavBar/>
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer/>
    </div>
  )
}

export default Body