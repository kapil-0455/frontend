import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { removeUser } from '../utils/userSlice'

const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((store) => store.user)
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logOut', {}, { withCredentials: true })
      dispatch(removeUser())
      navigate('/login')
    } catch (error) {
      console.error('Logout failed', error)
      // redirect to error page if needed
    }
  }
  return (
    <div className="navbar glass-nav px-4 md:px-8">
      <div className="flex-1">
        <Link to={user ? "/" : "/login"} className="btn btn-ghost normal-case text-2xl font-bold tracking-tight">
          <span className="gradient-text">DevTinder</span>
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-4 items-center">
          <div className="hidden md:block text-sm font-medium opacity-80">
            Welcome, <span className="text-primary font-semibold">{user.firstName}</span>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ring-2 ring-primary ring-offset-base-100 ring-offset-2 hover:scale-110 transition-transform"
            >
              <div className="w-10 rounded-full border border-white/20">
                <img alt="User Photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content glass-card mt-3 z-[1] w-56 p-3 rounded-2xl shadow-2xl border border-white/10"
            >
              <li className="mb-1">
                <Link to="/profile" className="flex items-center gap-2 p-2 hover:bg-primary/20 rounded-xl transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Profile
                  <span className="badge badge-secondary badge-sm">New</span>
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/connections" className="flex items-center gap-2 p-2 hover:bg-primary/20 rounded-xl transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3.005 3.005 0 013.75-2.906z" />
                  </svg>
                  Connections
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/requests" className="flex items-center gap-2 p-2 hover:bg-primary/20 rounded-xl transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                  Requests
                </Link>
              </li>
              <div className="divider my-1 opacity-20"></div>
              <li>
                <button
                  type="button"
                  className="flex items-center gap-2 p-2 text-error hover:bg-error/20 rounded-xl transition-colors w-full text-left font-semibold"
                  onClick={handleLogout}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar