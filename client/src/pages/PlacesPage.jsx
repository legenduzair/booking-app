import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PlacesPage = () => {
  const {action} = useParams();
  return (
    <div>
        {action !== 'new' && (
            <div className='text-center'>
                <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Add New Place
                </Link>
            </div>
        )}
        {action === 'new' && (
            <div>
                <form>
                    <h2 className='text-2xl mt-4'>Title</h2>
                    <p className='text-gray-500 text-sm'>Example Title for Place.</p>
                    <input type="text" placeholder='Title: My lovely house' />
                    <h2 className='text-2xl mt-4'>Address</h2>
                    <p className='text-gray-500 text-sm'>Example Address.</p>
                    <input type="text" placeholder='Address' />
                    <h2 className='text-2xl mt-4'>Snapshots</h2>
                    <p className='text-gray-500 text-sm'>More Snapshots...</p>
                    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                        <button className='border bg-transparent rounded-2xl text-2xl text-gray-600 p-8'>+</button>
                    </div>
                </form>
            </div>
        )}
    </div>
  )
}

export default PlacesPage