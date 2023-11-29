import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';


const IndexPage = () => {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    });
  }, [])
  
  return (
    <div className='mt-8 grid gap-6 gap-y-8 gap-x-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {places.length > 0 && places.map(place => (
      <div>
        <div className='bg-gray-500 mb-2 rounded-2xl flex'>
          {place.photos?.[0] && (
            <img className='object-cover aspect-square rounded-2xl' src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt="" />
          )}
        </div>
        <h2 className='font-bold'>{place.address}</h2>
        <h3 className='text-sm'>{place.title}</h3>
        <div className='mt-1'>
          <span className='font-bold'>£{place.price} per night</span>
        </div>
      </div>
      ))}
    </div>
  )
}

export default IndexPage