import React, { useState, useEffect, useRef } from 'react';
import { FaLocationArrow } from "react-icons/fa";
import { Link } from 'react-router-dom';
// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { Button } from "@/components/ui/button";
import { PHOTO_REF_URL ,  GetPlaceDetails } from '@/services/GlobalApi';


function PlaceCardItem({ place }) {
      const [PhotoUrl,setPhotoUrl] = useState();
        useEffect(()=>{
          place&&GetPlacephoto();
        },[place])
      
        const GetPlacephoto=async()=>{
          const data={
            textQuery:place?.placeName
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
          to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName + ', ' + place?.geoCoordinates)}`}
          target='_blank'
        >
            <div className='p-4 border rounded-lg shadow-md mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                
                <img 
                  src={ PhotoUrl?PhotoUrl:'/road-trip-vacation.jpg'} 
                  alt={place?.placeName} 
                  className='w-[140px] h-[140px] rounded-xl object-cover' 
                />
                <div>
                    <h2 className='font-bold text-lg'>{place.placeName}</h2>
                    <p className='text-gray-500 text-xs'>{place.placeDetails}</p>
                    <h2 className='mt-2'>⌛ {place.time}</h2>
                    <Button>
                        <FaLocationArrow />
                    </Button>
                </div>
            </div>
        </Link>
    )
}
export default PlaceCardItem;
