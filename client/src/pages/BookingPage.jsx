import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import PlaceGallery from '../components/PlaceGallery';
import BookingDates from '../components/BookingDates';

export const BookingPage = () => {
    const {id} = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
      if (!id) {
        return
      }
      axios.get(`/bookings/${id}`).then((response) => {
        setBooking(response.data);
      })
    }, [id]);

    if (!booking) {
      return '';
    }

  return (
    <div className='my-8 pl-32 pr-32 py-16'>
      <h1 className="text-3xl">{booking.place.title}</h1>
      <a
        className="flex gap-1 my-3 block font-semibold underline"
        target="_blank"
        href={"https://maps.google.com/?q=" + booking.place.address}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        {booking.place.address}
      </a>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your Booking Details</h2>
          <BookingDates booking={booking} />
        </div>
        <div className='bg-primary p-6 text-white rounded-2xl'>
          <div>Total Price</div>
          <div className='text-3xl'>£{booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  )
}
