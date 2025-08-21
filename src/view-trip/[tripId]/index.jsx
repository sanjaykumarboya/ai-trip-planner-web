import {db} from '@/services/fireBaseConfig'
import {doc, getDoc} from 'firebase/firestore'
import { useParams } from 'react-router-dom';   
import { toast} from 'sonner'
import { useEffect } from 'react'
import React, { useState} from "react";
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlaceToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer'
function ViewTrip() {
    const {tripId} = useParams();
    const [trip,setTrip] = useState();
useEffect(() => {
   tripId && GetTripData();
}, [tripId]);

    const GetTripData = async () => {
        const docRef = doc(db, "AITrip", tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setTrip(docSnap.data());
            // You can set the data to state or do something with it
        } else {
            // doc.data() will be undefined in this case
            toast.error("No such document!");
        }
    }

  return (
    <>
    <div className='p-10 md:px-20 lg:px-44 xl:px-40'>
      {/* Information Section */}
      <InfoSection trip={trip} />
       <Hotels trip={trip}/>
      
      {/* recomended hotels */}
      {/* Daily PLans */}
      <PlaceToVisit trip={trip} />
      {/* Activities */}
      <Footer></Footer>
    </div>
         
          </>

  )
}   

export default ViewTrip