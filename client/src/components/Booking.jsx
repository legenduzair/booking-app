import React from "react";
import { useState } from "react";
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

const Booking = ({place}) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
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
      </div>
      <button className="primary mt-4">
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
