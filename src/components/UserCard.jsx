import React from 'react'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../utils/feedSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const UserCard = ({user, hideButtons}) => {
  const {_id , firstName , lastName , photoUrl , age , gender, description } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async(status , userId)=>{
   try{ 
    const res = await axios.post(BASE_URL + "/request/send" + '/'+ status + '/'+ userId, {} , {withCredentials : true});
    dispatch(removeUserFromFeed(userId));
   }catch(error){
    console.error("Error sending request", error)
   } 
  }

  return (
    <div className="card glass-card w-full max-w-[360px] md:max-w-md overflow-hidden transition-all duration-500 hover:shadow-primary/20 group">
      <figure className="relative h-[400px] overflow-hidden">
        <img
          src={user.photoUrl}
          alt={firstName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-6 text-white">
          <h2 className="text-3xl font-bold">{firstName + " " + lastName}</h2>
          {(age || gender) && (
            <p className="text-sm font-medium opacity-90 flex items-center gap-2 mt-1">
              <span className="badge badge-primary badge-sm">{age}</span>
              <span className="badge badge-outline badge-sm text-white border-white/50">{gender}</span>
            </p>
          )}
        </div>
      </figure>
      <div className="card-body p-6">
        <p className="text-sm opacity-80 leading-relaxed line-clamp-3 mb-4" title={description}>
          {description}
        </p>
        {!hideButtons && (
          <div className="card-actions grid grid-cols-2 gap-4 mt-2">
            <button 
              className="btn btn-outline btn-error premium-btn" 
              onClick={() => handleSendRequest("ignored", _id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Ignore
            </button>
            <button 
              className="btn btn-primary premium-btn" 
              onClick={() => handleSendRequest("interested", _id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              Connect
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard