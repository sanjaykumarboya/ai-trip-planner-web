import { User } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import  UserTripCardItem from './components/UserTripCardItem.jsx';
import { collection, query, where, getDocs } from "firebase/firestore";
// src/components/index.jsx
import { db } from "../services/fireBaseConfig";
import axios from 'axios';
import { Link } from 'react-router-dom';



function MyTrips(){
    const navigation = useNavigate();
    const [userTrips,setUserTrips] = useState([]);

    useEffect(() =>{
        GetUserTrips();
    }, [])
    const GetUserTrips=async()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            navigation('/');
            return;
        }

        const q= query(collection(db,'AITrip'), where('userEmail', '==',user?.email ));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>" , doc.data()); 
            setUserTrips(prevVal =>[...prevVal,doc.data()]);
        });
    }

    return (
       
        <div className='p-10 md:20 lg:px-56 xl:px-72 mx-5 mt-10'>
            <h2 className='font-bolds text-3xl'>My Trips</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 my-3'>
                
                {userTrips?.length>0?userTrips.map((trip,index) =>(
                    <UserTripCardItem trip={trip} key={index}/>
                ))
            :[1,2,3,4,5,6].map((item,index) =>(
                <div className='h-[250px] bg-slate-200 animate-pulse rounded-xl' key={index}>
            </div>
             )
            )}
        </div>
        </div>
    )
}
export default MyTrips