import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections, removeConnections } from '../utils/connectionSlice';

const Connections = () => {

  const dispatch = useDispatch();
  const connections = useSelector(store => store.connections)
  const [error, setError] = useState(null);

  const fetchConnenections = async()=>{
    try {
        const res = await axios.get(BASE_URL + "/user/connections" , {withCredentials : true});
        console.log("Success:", res.data.data)
        dispatch(addConnections(res.data.data));
    } catch (err) {
        console.error(err);
        setError(err.response?.data || err.message || "Something went wrong");
    }
  }

  useEffect(()=>{
    fetchConnenections()
  }, [])

  if (error) return (
    <div className="flex justify-center items-center min-h-[40vh] text-error font-bold">
      Error: {error}
    </div>
  );

  if (!connections) return (
    <div className="flex justify-center items-center min-h-[40vh]">
      <span className="loading loading-dots loading-lg text-secondary"></span>
    </div>
  );

  if (connections.length === 0) return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4 animate-in fade-in duration-700">
      <div className="bg-base-300/50 p-6 rounded-full mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold opacity-40">No connections yet</h1>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12 text-center">
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Network</h2>
        <h1 className="text-4xl font-bold gradient-text">Your Connections</h1>
      </div>

      <div className="w-full max-w-2xl space-y-4">
        {connections.map((connection) => {
          if (!connection) return null;
          const { _id, firstName, lastName, photoUrl, age, gender, description } = connection;

          return (
            <div key={_id} className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 transition-all duration-300 hover:scale-[1.01] cursor-pointer">
              <div className="relative">
                <img src={photoUrl} className="w-24 h-24 rounded-full object-cover ring-4 ring-secondary/20 shadow-lg" alt={firstName} />
                <div className="absolute bottom-0 right-0 bg-success w-5 h-5 rounded-full border-4 border-base-100"></div>
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                  {age && <span className="badge badge-sm badge-ghost opacity-70">{age}</span>}
                </div>
                <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 opacity-80">{gender}</p>
                <p className="text-sm opacity-60 line-clamp-2 italic">"{description}"</p>
              </div>

              <div className="flex gap-2 mt-4 sm:mt-0">
                <button className="btn btn-ghost btn-circle hover:bg-primary/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Connections