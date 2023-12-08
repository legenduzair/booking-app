import React from "react";
import { useState, useContext } from "react";
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from "../UserContext";
import { useEffect } from "react";

const Booking = ({place}) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');

  const {user} = useContext(UserContext)

  useEffect(() => {
    if(user) {
      setName(user.name);
    }
  }, [user])
  

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
    
    const response = await axios.post('/bookings', {
      place: place._id, checkIn, checkOut, 
      numberOfGuests, name, phone, 
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: £{place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check In:</label>
            <input value={checkIn} 
                   onChange={ev => setCheckIn(ev.target.value)}
                   type="date" />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check Out:</label>
            <input value={checkOut} 
                   onChange={ev => setCheckOut(ev.target.value)} 
                   type="date" />
          </div>
        </div>
        <div>
          <div className="py-3 px-4 border-t">
            <label>Guests:</label>
            <input value={numberOfGuests} 
                   onChange={ev => setNumberOfGuests(ev.target.value)} 
                   type="number" />
          </div>
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your Full Name:</label>
            <input value={name} 
                 onChange={ev => setName(ev.target.value)} 
                 type="text" />
            <label>Your Phone Number:</label>
            <input value={phone} 
                 onChange={ev => setPhone(ev.target.value)} 
                 type="tel" />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4">
        Book This Place
        {numberOfNights > 0 && (
          <>
            <span> £{numberOfNights * place.price}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default Booking;
