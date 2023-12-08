import React from 'react'
import AccountNav from '../components/AccountNav'
import { useEffect, useState } from 'react'
import axios from 'axios'

const BookingsPage = () => {

  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get('/bookings').then(response => {
        setBookings(response.data);
    });
  }, [])
  
  return (
    <div>
        <AccountNav />
        <div>
            {bookings?.length > 0 && bookings.map(booking => (
                <div>
                    {booking.checkIn} - {booking.checkOut}
                </div>
            ))}
        </div>
    </div>
  )
}

export default BookingsPage