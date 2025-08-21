import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { PHOTO_REF_URL ,  GetPlaceDetails } from '@/services/GlobalApi';


function HotelCardItem({ hotel }) {
  // const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key='+import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [PhotoUrl,setPhotoUrl] = useState();
    useEffect(()=>{
      hotel&&GetPlacephoto();
    },[hotel])
  
    const GetPlacephoto=async()=>{
      const data={
        textQuery:hotel?.hotelName
      }
      const result= await GetPlaceDetails(data).then(resp=>{
        // console.log(resp.data.places[0].photos[3].name)
        const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
        setPhotoUrl(PhotoUrl);
        // console.log('PhotoUrl:',PhotoUrl);
       
      })


    }
    return (
          <Link
              to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + "," + hotel?.geoCoordinates}
              target='_blank'
            >
              <img
                src={PhotoUrl}
                alt={hotel?.hotelName}
                className='rounded-xl h-[180px] w-full object-cover'
              />
              <h2 className='my-2 text-lg font-semibold'>{hotel?.hotelName}</h2>
              <h2 className='text-gray-500 text-xs'>📌 {hotel?.hotelAddress}</h2>
              <h2 className='text-gray-500 text-xs'>💰 {hotel?.price}</h2>
              <h2 className='text-gray-500 text-xs'>⭐ {hotel?.rating}</h2>
            </Link>
    )
}
export default HotelCardItem;