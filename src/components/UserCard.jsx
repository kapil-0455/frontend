import React from 'react'

const UserCard = ({user}) => {
  const {firstName , lastName , photoUrl , age , gender, description } = user
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
                {age && gender && <p>{age + " " + gender + " "}</p>}
                <p>{description}</p>
                <div className="card-actions justify-center my-4">
                    <button className='btn btn-primary'>Ignore</button>
                    <button className="btn btn-secondary">Intersted</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserCard