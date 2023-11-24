import React from "react";
import { useState } from "react";
import axios from "axios";

const PhotosUploader = ({addedPhotos, onChange}) => {

  const [photoLink, setPhotoLink] = useState('');

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link/", {
      link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  async function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    const { data: filenames } = await axios.post("/upload", data, {
      headers: { "Content-type": "multipart/form-data" },
    });
    onChange((prev) => {
      return [...prev, ...filenames];
    });
  }
  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          placeholder="Add using a link...jpg"
        />
        <button
          onClick={addPhotoByLink}
          className="bg-gray-200 px-4 rounded-2xl"
        >
          Add&nbsp;Snapshot
        </button>
      </div>
      <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div key={link} className="h-32 flex">
              <img
                className="w-full object-cover rounded-2xl"
                src={"http://localhost:4000/uploads/" + link}
                alt=""
              />
            </div>
          ))}
        <label className="h-32 cursor-pointer flex items-center justify-center gap-2 border bg-transparent rounded-2xl text-xl text-gray-600 p-2">
          <input
            multiple
            type="file"
            className="hidden"
            onChange={uploadPhoto}
          />
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
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
