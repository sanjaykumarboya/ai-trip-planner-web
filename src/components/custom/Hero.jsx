import React from 'react';
import { Link } from 'react-router-dom';


function Hero(){
    return (
      <>

      <div className='flex flex-col items-center  gap-9'>
     
       <h1 className='font-extrabold  text-3xl' ><span className='text-[#f56551]'>Discover Your Next Adventure with AI: </span><br></br>Personalized Itineraries at Your Fingertips</h1>
     <p>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
      <Link to={'./create-trip'}>
      <button className='inline-block text-base leading-none p-0 m-0 px-5 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-200'>get started  its free</button>
      </Link>
      </div>
            <img src="/landing.png" className="w-[80%] mx-auto block" />

      </>
    )
}
export default Hero