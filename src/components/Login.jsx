import React, { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (error) {
      setError(error.response?.data || "Something went wrong");
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signUp",
        { email, password, firstName, lastName },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (error) {
      setError(error.response?.data || "Something went wrong");
    }
  };
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/bg.png')` }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      
      <div className="card glass-card w-full max-w-md relative animate-float">
        <div className="card-body p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">
              {isLoginForm ? "Welcome Back" : "Join DevTinder"}
            </h1>
            <p className="text-sm opacity-70">
              {isLoginForm ? "Connect with developers worldwide" : "Start your journey today"}
            </p>
          </div>

          <div className="space-y-4">
            {!isLoginForm && (
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input input-bordered premium-input bg-base-200/50"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered premium-input bg-base-200/50"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="form-control relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Email Address"
                className="input input-bordered premium-input bg-base-200/50 pl-12"
                value={email}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>

            <div className="form-control relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered premium-input bg-base-200/50 pl-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="alert alert-error mt-4 py-2 px-4 text-xs">
              <span>{error}</span>
            </div>
          )}

          <div className="card-actions mt-8">
            <button 
              className="btn btn-primary premium-btn w-full text-lg font-bold"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Register"}
            </button>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="opacity-70">
              {isLoginForm ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              className="ml-2 text-primary font-bold hover:underline"
              onClick={() => {
                setIsLoginForm(!isLoginForm);
                setError("");
              }}
            >
              {isLoginForm ? "Register" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
