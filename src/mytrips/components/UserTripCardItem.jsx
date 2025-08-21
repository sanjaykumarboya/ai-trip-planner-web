import React, { useState, useEffect } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';
import { Link } from 'react-router-dom';
import axios from 'axios';


function UserTripCardItem({ trip }) {

      const [PhotoUrl,setPhotoUrl] = useState();
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
  return (
     <Link to={'/view-trip/'+trip?.id}>
    <div className="hover:scale-105 traansition-all hover:shadow-mdborder p-3 rounded-lg shadow-md mb-4">
    <img src= {PhotoUrl ? PhotoUrl: '/road-trip-vacation.jpg'}
    className='object-cover rounded-xl'/>
    <div>
      
        <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
        <h2 className='text-sm text-gray-400'>{trip?.userSelection?.totalDays} days trip with {trip?.userSelection?.budget} Budget </h2>
    </div>
    </div>
     </Link>
  );
}
export default UserTripCardItem;