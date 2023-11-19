import React, { useContext } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';

const AccountPage = () => {

  const {ready, user} = useContext(UserContext);

  if(!ready) {
    return 'Loading...';
  }

  if(ready && !user) {
    return <Navigate to={'/login'} />
  }

  const {subpage} = useParams();

  function linkClasses(type=null) {
    let classes = 'py-2 px-6';
    if (type === subpage || (subpage === undefined && type === 'profile')) {
        classes += ' bg-primary text-white rounded-full';
    }

    return classes;
  }

  return (
    <div>
        <nav className='w-full flex justify-center mt-8 gap-2'>
            <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
            <Link className={linkClasses('places')} to={'/account/places'}>My Accommodations</Link>
        </nav>
    </div>
  )
}

export default AccountPage