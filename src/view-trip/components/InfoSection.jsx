// import React from 'react'
import { IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useRef } from 'react';
import { GetPlaceDetails,PHOTO_REF_URL } from '../../services/GlobalApi';

function InfoSection({ trip }) {
 
  // const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key='+import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const [photoUrl,setPhotoUrl] = useState();
  useEffect(()=>{
    trip&&GetPlacephoto();
  },[trip])

  const GetPlacephoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location
    }
    const result= await GetPlaceDetails(data).then(resp=>{
      // console.log(resp.data.places[0].photos[3].name)
      const photoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
      setPhotoUrl(photoUrl);
      // console.log('PhotoUrl:',PhotoUrl);
     
    })
  }

  if (!trip?.tripData) return <p>Loading...</p>;

  let parsedData;
  try {
    parsedData =
      typeof trip.tripData === "string"
        ? JSON.parse(trip.tripData)
        : trip.tripData;
  } catch (error) {
    console.error("❌ Invalid tripData JSON:", error);
    return <p></p>;
  }

  return (
    <div>
      <img
        src={photoUrl || '/road-trip-vacation.jpg'}
        alt="Trip"
        className='h-[600px] w-full object-cover rounded'
      />
      <div>
        <h2 className='font-bold text-2xl'>
          {trip?.userSelection?.location || 'Loading...'}
        </h2>
      </div>
      <div className='flex justify-between items-centre'>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>
          {trip?.userSelection?.totalDays ?? '--'} 📅 Days
        </h2>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>
          {trip?.userSelection?.budget ?? '--'} 💸 budget
        </h2>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>
          {trip?.userSelection?.traveler ?? '--'} 🛩️ traveller
        </h2>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  )
}

export default InfoSection;
