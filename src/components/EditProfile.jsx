import React, { useState } from 'react'
import axios from 'axios'
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
    const [firstName , setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl , setPhotoUrl] = useState(user.photoUrl);
    const [age , setAge] = useState(user.age);
    const [gender , setGender] = useState(user.gender);
    const [description , setDescription] = useState(user.description);
    const [error, setError] = useState("");

    const [showToast , setShowToast] = useState(false);

    const dispatch = useDispatch();
    
    const saveProfile = async ()=> {
        setError("")
        try{
            const res = await axios.patch(BASE_URL + "/profile/edit" , 
                {firstName , lastName , photoUrl , age , gender, description },
                {withCredentials : true}
            )

            dispatch(addUser(res.data.data))
            setShowToast(true)

            setTimeout(() => {
                setShowToast(false)
            }, 3000);
        } catch (error) {
            setError(error.response?.data || "Something went wrong")
        }
    }
  return (

<div>
    <div className='flex justify-center my-10'>
        <div className='flex justify-center mx-10'>
            <div className="card bg-base-300 w-full max-w-lg shadow-xl">
                <div className="card-body p-6">
                <h2 className="card-title justify-center mb-2">Edit Profile</h2>          
                {error && <p className='text-red-500 text-center text-sm'>{error}</p>}          
                
                <div className="grid grid-cols-2 gap-4">
                    <label className="form-control w-full">
                        <div className="label py-1">
                            <span className="label-text text-sm">First Name</span>
                        </div>
                        <input type="text" value={firstName} className="input input-bordered input-sm w-full" 
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>

                    <label className="form-control w-full">
                        <div className="label py-1">
                            <span className="label-text text-sm">Last Name</span>
                        </div>
                        <input type="text" value={lastName} className="input input-bordered input-sm w-full" 
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>

                    <label className="form-control w-full">
                        <div className="label py-1">
                            <span className="label-text text-sm">Age</span>
                        </div>
                        <input type="number" value={age} className="input input-bordered input-sm w-full" 
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </label>

                    <label className="form-control w-full">
                        <div className="label py-1">
                            <span className="label-text text-sm">Gender</span>
                        </div>
                        <input type="text" value={gender} className="input input-bordered input-sm w-full" 
                            onChange={(e) => setGender(e.target.value)}
                        />
                    </label>
                </div>

                <label className="form-control w-full mt-2">
                    <div className="label py-1">
                        <span className="label-text text-sm">Photo URL</span>
                    </div>
                    <input type="text" value={photoUrl} className="input input-bordered input-sm w-full" 
                        onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                </label>

                <label className="form-control w-full mt-2">
                    <div className="label py-1">
                        <span className="label-text text-sm">About</span>
                    </div>
                    <textarea value={description} className="textarea textarea-bordered textarea-sm w-full leading-tight" rows="2"
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </label>

                <div className="card-actions justify-center mt-5">
                    <button className="btn btn-primary btn-sm w-full" onClick={saveProfile}>Save Profile</button>
                </div>
                </div>
            </div>
        </div>
        <UserCard user={{firstName , lastName , photoUrl , age , gender, description }} hideButtons={true}></UserCard>
    </div>
    {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
            <span>Profile saved successfully</span>
        </div>
    </div>
    }

</div>
    
  )
}

export default EditProfile