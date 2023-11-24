import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

import Perks from '../components/Perks';
import PhotosUploader from '../components/PhotosUploader';

const PlacesPage = () => {
  const {action} = useParams();

  // States for all the places form fields
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text) {
    return (
        <h2 className='text-2xl mt-4'>{text}</h2>
    );
  }

  function inputDescription(text) {
    return (
        <p className='text-gray-500 text-sm'>{text}</p>
    );
  }

  function preInput(header, description) {
    return (
        <>
          {inputHeader(header)}
          {inputDescription(description)}
        </>
    )
  }

  return (
    <div>
      {action !== 'new' && (
          <div className='text-center'>
              <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Add New Place
              </Link>
          </div>
      )}
      {action === 'new' && (
          <div>
              <form>
                  {preInput('Title', 'Title for your place. Should be short and catchy!')}
                  <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='Title: My lovely house' />
                  {preInput('Address', 'Where your place is located.')}
                  <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder='Address' />
                  {preInput('Snapshots', 'Showcase your place to the world!')}
                  <PhotosUploader />
                  {preInput('Description', 'Description of your place.')}
                  <textarea value={description} 
                            onChange={ev => setDescription(ev.target.value)} />
                  {preInput('Perks', 'Select all the perks of living at your place.')}
                  <div className='grid mt-3 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                    <Perks selected={perks} 
                           onChange={setPerks} />
                  </div>
                  {preInput('Extra Information', 'Include any extra information about your place.')}
                  <textarea value={extraInfo} 
                            onChange={ev => setExtraInfo(ev.target.value)} />
                  {preInput('Check In & Out Times, Max Guests', 'Add check in and out times and the maximum number of guests allowed in your place.')}
                  <div className='grid gap-2 sm:grid-cols-3'>
                    <div>
                      <h3 className='mt-2 -mb-1'>Check-In Time:</h3>
                      <input type="text" value={checkIn} 
                             onChange={ev => setCheckIn(ev.target.value)} 
                             placeholder='15:00' />
                    </div>
                    <div>
                      <h3 className='mt-2 -mb-1'>Check-Out Time:</h3>
                      <input type="text" value={checkOut} 
                             onChange={ev => setCheckOut(ev.target.value)} 
                             placeholder='22:00' />
                    </div>
                    <div>
                      <h3 className='mt-2 -mb-1'>Max Number of Guests:</h3>
                      <input type="text" value={maxGuests} 
                                         onChange={ev => setMaxGuests(ev.target.value)} 
                                         placeholder='4 guests maximum' />
                    </div>
                  </div>
                  <button className='primary my-4'>Save</button>
              </form>
          </div>
      )}
    </div>
  )
}

export default PlacesPage