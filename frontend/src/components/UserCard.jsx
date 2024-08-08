import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

const UserCard = ({user, onClose}) => {
  return (
    <Link to={"/"+user?._id} onClick={onClose} className='flex items-center gap-3 p-3 lg:p-4 border border-transparent border-t-slate-200 hover:border-primary cursor-pointer'>
      <div>
          <Avatar width={50}  height={50} name={user?.name} />
      </div>
      <div>
          <div className='font-semibold'>
                    {user?.name}
          </div>
          <p>{user?.email}</p>
      </div>
    </Link>
  )
}

export default UserCard
