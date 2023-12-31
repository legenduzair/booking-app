import React from 'react'
import { Link } from 'react-router-dom'
import AccountNav from '../components/AccountNav';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from '../components/Image';

const PlacesPage = () => {

  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/user-places').then(({data}) => {
      setPlaces(data);
    });
  }, []);
  
  return (
    <div>
      <AccountNav />
        <div className='text-center'>
            <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Add New Place
            </Link>
        </div>
        <div className='mt-4'>
          {places.length > 0 && places.map(place => (
            <Link to={'/account/places/' + place._id} key={place} className='flex cursor-pointer gap-4 bg-gray-200 p-4 mb-4 sm:m-4 rounded-2xl'>
              <div className='hidden sm:flex w-32 h-32 bg-gray-300 shrink-0'>
                {place.photos.length > 0 && (
                  <Image className='object-cover' src={place.photos[0]} alt="" />
                )}
              </div>
              <div className='grow-0 shrink'>
                <h2 className='text-xl'>{place.title}</h2>
                <p className='text-sm mt-2'>{place.description}</p>
              </div>
            </Link>
          ))}
        </div>
    </div>
  )
}

export default PlacesPage