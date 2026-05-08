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
    <>
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img
                src={user.photoUrl}
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {(age || gender) && <p className="text-gray-400 font-semibold">{[age, gender].filter(Boolean).join(", ")}</p>}
                <p className="mt-2 line-clamp-3" title={description}>{description}</p>
                {!hideButtons && (
                  <div className="card-actions justify-center my-4">
                      <button className='btn btn-primary' onClick={()=> handleSendRequest("ignored" , _id)}>Ignore</button>
                      <button className="btn btn-secondary" onClick={()=> handleSendRequest("interested" , _id)}>Interested</button>
                  </div>
                )}
            </div>
        </div>
    </>
  )
}

export default UserCard