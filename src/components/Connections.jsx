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

  if(error) return <h1>Error: {error}</h1>;
  if(!connections) return <h1>Loading...</h1>;
  if(connections.length === 0) return <h1>No Connections</h1>

  return (
    <div className='text-center my-10 flex flex-col items-center'>
      <h1 className='text-3xl font-bold mb-6'>Connections</h1>

      {connections.map((connection )=>{
        if (!connection) return null;
        const { _id, firstName , lastName , photoUrl , age , gender, description } = connection;

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
            </div>
        );
      })}
    </div>
  )
}

export default Connections