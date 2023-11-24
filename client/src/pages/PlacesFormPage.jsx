import React from "react";
import { useState } from "react";
import axios from "axios";

import AccountNav from "../components/AccountNav";
import PhotosUploader from "../components/PhotosUploader";
import Perks from "../components/Perks";
import { Navigate } from "react-router-dom";


const PlacesFormPage = () => {

  // States for all the places form fields
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

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

  async function addNewPlace(ev) {
    ev.preventDefault();
    await axios.post('/places', {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests
    });
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewPlace}>
        {preInput("Title", "Title for your place. Should be short and catchy!")}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Title: My lovely house"
        />
        {preInput("Address", "Where your place is located.")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="Address"
        />
        {preInput("Snapshots", "Showcase your place to the world!")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "Description of your place.")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Perks", "Select all the perks of living at your place.")}
        <div className="grid mt-3 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput(
          "Extra Information",
          "Include any extra information about your place."
        )}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {preInput(
          "Check In & Out Times, Max Guests",
          "Add check in and out times and the maximum number of guests allowed in your place."
        )}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-1">Check-In Time:</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="15:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check-Out Time:</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="22:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max Number of Guests:</h3>
            <input
              type="text"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              placeholder="4"
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
