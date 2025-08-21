import React from 'react';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
      if (!trip?.tripData) return <p>Loading...</p>;

  let parsedData;
  try {
    parsedData = typeof trip?.tripData === "string" ? JSON.parse(trip?.tripData) : trip?.tripData;
  } catch (error) {
    console.error("Invalid tripData JSON:", error);
    return <p></p>;
  }
  return (
    <div>
      <h2 className='font-bold text-2xl'>Recommended Hotels</h2>
      <div className='grid grid-cols-3 gap-4'>
        {parsedData?.hotelOptions?.map((item, index) => (
          <div
            key={index}
            className='hover:scale-105 transition-all cursor-pointer p-4 border rounded-lg shadow-md'
          >
          <HotelCardItem hotel={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
