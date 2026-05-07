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
        
    if(!requests) return <h1>Loading...</h1>;
    if(requests.length === 0) return <h1>No Connection Requests</h1>

    return (
    <div className='text-center my-10 flex flex-col items-center'>
      <h1 className='text-3xl font-bold mb-6'>Connection Requests</h1>

      {requests.map((request )=>{
        if (!request) return null;
        const { _id, firstName , lastName , photoUrl , age , gender, description } = request;

        return (
            <div key={_id} className='flex m-4 p-4 rounded-lg bg-base-300 w-full w-1/2 items-center shadow-xl'>
              <div>
                <img src={photoUrl} className='w-24 h-24 rounded-full border-2 border-primary' alt="photo" />
              </div>
              <div className='flex-1 text-center'>
                <h2 className='font-bold text-2xl'>{firstName + " " + lastName}</h2>
               {age && gender && <p className="text-gray-400">{age + ", " + gender}</p> } 
                <p className="mt-2">{description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 ml-4">

                <button className="btn btn-primary btn-sm md:btn-md hover:scale-105 transition-transform" 
                onClick={()=>reviewRequest("accepted", request._id)}>
                    Accept
                </button>

                <button className="btn btn-outline btn-secondary btn-sm md:btn-md hover:scale-105 transition-transform" 
                onClick={()=>reviewRequest("rejected", request._id)}>
                    Decline
                </button>

              </div>
            </div>
        );
      })}
    </div>
  )
}

export default Requests