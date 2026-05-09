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
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12">
          <div className="card glass-card w-full max-w-lg animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="card-body p-8">
              <h2 className="text-3xl font-bold gradient-text text-center mb-6">Edit Profile</h2>
              
              {error && (
                <div className="alert alert-error py-2 px-4 mb-6 text-sm">
                  <span>{error}</span>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold opacity-70">First Name</span>
                  </label>
                  <input 
                    type="text" 
                    value={firstName} 
                    className="input input-bordered premium-input bg-base-200/50" 
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold opacity-70">Last Name</span>
                  </label>
                  <input 
                    type="text" 
                    value={lastName} 
                    className="input input-bordered premium-input bg-base-200/50" 
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold opacity-70">Age</span>
                  </label>
                  <input 
                    type="number" 
                    value={age} 
                    className="input input-bordered premium-input bg-base-200/50" 
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold opacity-70">Gender</span>
                  </label>
                  <input 
                    type="text" 
                    value={gender} 
                    className="input input-bordered premium-input bg-base-200/50" 
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text font-semibold opacity-70">Photo URL</span>
                </label>
                <input 
                  type="text" 
                  value={photoUrl} 
                  className="input input-bordered premium-input bg-base-200/50" 
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text font-semibold opacity-70">About</span>
                </label>
                <textarea 
                  value={description} 
                  className="textarea textarea-bordered premium-input bg-base-200/50 h-24"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="card-actions mt-8">
                <button 
                  className="btn btn-primary premium-btn w-full text-lg font-bold" 
                  onClick={saveProfile}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="mb-4 text-center">
              <span className="badge badge-primary badge-outline font-bold">Preview</span>
            </div>
            <UserCard user={{firstName, lastName, photoUrl, age, gender, description}} hideButtons={true} />
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success shadow-lg border-none bg-success text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile