import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

const Requests = () => {

    const dispatch = useDispatch();
    const requests = useSelector((state) => state.requests)

    const reviewRequest = async(status , _id)=>{
        try {
            const res = await axios.post(BASE_URL + "/request/review" + '/'+ status + '/' + _id, {} , {withCredentials : true});
            dispatch(removeRequest(_id));
        } catch (err) {
            console.error("Error Reviewing Request", err)
        }
    }
    const fetchRequests = async()=>{
        try {
            const res = await axios.get(BASE_URL + '/user/request/recived' , {
                withCredentials : true,
            });
            dispatch(addRequests(res.data.data));
        } catch (error) {
            console.error('Requests error:', error);
        }
        
    }

    useEffect(() => {
        fetchRequests(); 
    }, []);
        
    if (!requests) return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );

    if (requests.length === 0) return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4 animate-in fade-in duration-700">
        <div className="bg-base-300/50 p-6 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold opacity-40">No pending requests</h1>
      </div>
    );

    return (
      <div className="container mx-auto px-4 py-10 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-12 text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-secondary mb-2">Social</h2>
          <h1 className="text-4xl font-bold gradient-text">Connection Requests</h1>
        </div>

        <div className="w-full max-w-2xl space-y-4">
          {requests.map((request) => {
            if (!request) return null;
            const { _id, firstName, lastName, photoUrl, age, gender, description } = request;

            return (
              <div key={_id} className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 transition-all duration-300 hover:scale-[1.01]">
                <div className="relative">
                  <img src={photoUrl} className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/20 shadow-lg" alt={firstName} />
                  <div className="absolute -bottom-1 -right-1 bg-primary w-6 h-6 rounded-full border-4 border-base-100"></div>
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                    <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                    {age && <span className="badge badge-sm badge-ghost opacity-70">{age}</span>}
                  </div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2 opacity-80">{gender}</p>
                  <p className="text-sm opacity-60 line-clamp-2 italic">"{description}"</p>
                </div>

                <div className="flex gap-3 mt-4 sm:mt-0">
                  <button 
                    className="btn btn-primary premium-btn btn-sm" 
                    onClick={() => reviewRequest("accepted", _id)}
                  >
                    Accept
                  </button>
                  <button 
                    className="btn btn-outline btn-error premium-btn btn-sm" 
                    onClick={() => reviewRequest("rejected", _id)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default Requests