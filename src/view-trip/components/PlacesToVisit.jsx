import React from 'react'
import PlaceCardItem from './PlaceCardItem'



function PlacesToVisit({ trip }) {
  
  let parsedData; // <-- declare first
  try {
    parsedData =
      typeof trip.tripData === 'string'
        ? JSON.parse(trip.tripData)
        : trip.tripData;
  } catch (error) {
    console.error('Invalid tripData JSON:', error);
    return <p></p>;
  }

  // Optional: log here, AFTER initializat
  // console.log('parsedData:', parsedData);

  const itineraryArray = Array.isArray(parsedData.itinerary)
  ? parsedData.itinerary
  : Object.values(parsedData.itinerary || {});

  
    if (!trip?.tripData) return <p>Loading...</p>;



    return (
        <div>
            <h2 className='font-bold text-lg'>Places to visit</h2>
            <div>
       {itineraryArray.map((item, index) => (
  <div key={index}>
    <h2 className='font-bold text-lg'> {item.day}</h2>
      <div className='grid md:grid-cols-2 gap-4'>
    {item.plan?.map((place, idx) => (
      <div key={idx}>
        <PlaceCardItem place={place} />
      </div>
    ))}
    </div>
  </div>
))}


        </div>
        </div>


    )
}



export default PlacesToVisit;
//   import React from 'react';
// import PlaceCardItem from './PlaceCardItem';

// function PlacesToVisit({ trip }) {
//   if (!trip?.tripData) return <p>Loading...</p>;

//   let parsedData;
//   try {
//     parsedData =
//       typeof trip.tripData === 'string'
//         ? JSON.parse(trip.tripData)
//         : trip.tripData;
//   } catch (error) {
//     console.error('Invalid tripData JSON:', error);
//     return <p>Error loading trip data</p>;
//   }

//   // Normalize itinerary to array
//   const itineraryArray = Array.isArray(parsedData.itinerary)
//     ? parsedData.itinerary
//     : Object.values(parsedData.itinerary || {});

//   return (
//     <div>
//       <h2 className='font-bold text-lg'>Places to visit</h2>
//       <div>
//         {itineraryArray.map((item, index) => (
//           <div key={index}>
//             <h2 className='font-bold text-lg'>Day {item.day}</h2>
//             {item.plan?.map((place, idx) => (
//               <div key={idx}>
//                 <PlaceCardItem place={place} />
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PlacesToVisit;
