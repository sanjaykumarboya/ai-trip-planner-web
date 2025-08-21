import React, { useState, useEffect, useRef } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AI_PROMPT, SelectBudgetOptions,SelectTravelList } from "@/constants/options"
import { LoadScript } from '@react-google-maps/api';
import { Input } from "@/components/ui/input";

import { toast } from 'sonner';
import { chatSession } from "@/services/AiModel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { setDoc, doc } from "firebase/firestore"; // Ensure this is imported
import { db } from "../services/fireBaseConfig"; // Adjust the import path as necessary
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


function CreateTrip(){
  const [place,setPlace] = useState();
  const [formData,setFormData] = useState({});
  const [finalPrompt, setFinalPrompt] = useState([]);
  const [openDailog,setOpenDailog] = useState(false);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name,value) =>{
     setFormData({
      ...formData,
      [name]: value
    })
  }
    useEffect(() =>{

      console.log(formData);
    },[formData])

    const login = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
    await GetUserProfile(tokenResponse);
  },
  onError: (error) => console.log("Login Failed:", error),
});
// const login = useGoogleLogin({
//   onSuccess: async (tokenResponse) => {
//     console.log("Login Success:", tokenResponse);
//     await GetUserProfile(tokenResponse); // call your function
//   },
//   onError: (error) => console.log("Login Failed:", error),
// });


    
    const onGenerateTrip = async() => {
      const user = localStorage.getItem('user');
      if(!user) {
        setOpenDailog(true);
        return;
      }

      if (!formData?.location || !formData?.budget || !formData?.traveler || !(formData?.totalDays > 0 && formData?.totalDays < 5)) {
         toast("Please fill all fields correctly");
        return;

      }
     
        console.log(formData);
         const FINAL_PROMPT = AI_PROMPT
  .replace('{location}' , formData?.location)
    .replace('{totalDays}', formData?.totalDays)
    .replace('{traveler}', formData?.traveler)
        .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.totalDays)
             .replace('{totalDays}', formData?.totalDays);
          setLoading(false);


    
  setFinalPrompt(FINAL_PROMPT);
  // handleGenerateTrip(FINAL_PROMPT); 
   console.log(FINAL_PROMPT);    
  //  await handleGenerateTrip(FINAL_PROMPT); 
   const result  = await chatSession.sendMessage(FINAL_PROMPT);
const responseText = await result.response.text(); // ✅ this line is required

  console.log(result?.response?.text());
          await saveAiTrip(responseText); // ✅ Save the AI response in Firebase

      
    setLoading(false); // End loading
  
    
  }
    
  const saveAiTrip=async (TripData) => {

          setLoading(true);

    const user=JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrip", docId), {
      userSelection:formData,
      tripData:TripData,
      userEmail:user?.email,
      id: docId,
      });
                setLoading(false);
      navigate('/view-trip/' + docId)

  }


    const GetUserProfile = (tokenInfo) => {
        setLoading(true);

      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`  ,{
      headers:{
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept : 'Application/json'
      }
    }).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDailog(false);
      toast.success("Login Successful");
          onGenerateTrip();
            setLoading(false);

    })
}
  
    return (
      <>
      <div className='sm:ppx-10 md:px32 lg:px-56 xl:px-5 mt-10' >
       <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2> 
       <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
      
       </div>
     <div className="mt-20 flex flex-col gap-10 ">
       <div className="mb-5">
        <label className="text-xl mb-3 font-medium">What is destination of choice?</label>
    
    
     <GooglePlacesAutocomplete
  apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
  selectProps={{
    value: place,
    onChange: (v) => {
      setPlace(v);
      handleInputChange('location', v.label);
    }
  }}
/>

       </div>

        <div className="mb-5">
          <label className="text-xl font-medium">How many days are you planning your trip?</label>
          <Input placeholder={'ex.3'} type='number' min="1" 
          onChange={(v)=>handleInputChange('totalDays',v.target.value)}/>
        </div>

        <div>
            <label className="text-xl my-3 font-medium">What is Your Budget?</label>
            <p>The budget is exclusively allocated for activities and dining purposes. </p>
            <div className="grid grid-cols-3 gap-5 mt-5 mb-5">
              {SelectBudgetOptions.map((item,index)=>(
                <div key={index} 
                onClick={()=>handleInputChange('budget',item.title)}
                className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg
                ${formData?.budget==item.title&&'shadow-lg border-cyan-500'}
                `}>
                  <h2 className="text-3xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>

            <label className="text-xl font-medium my-3"> Who do you plan on traveling with on your next adventure?</label>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectTravelList.map(( item,index)=>(
                <div key={index}
                onClick={()=>handleInputChange('traveler',item.people)}
                className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg
                  ${formData?.traveler==item.people&&'shadow-lg border-cyan-500'}
                  `}>
                  <h2 className="text-3xl">{item.icon}</h2> 
                  <h2 className="text-lg font-bold">{item.title}</h2> 
                  <h2 className="text-sm text-gray-500">{item.desc}</h2> 
                </div>
              ))}
            </div>
        </div>
      </div>


        <div className='mt-10 justify-end flex '>

       <button
  disabled={loading}
  className="px-5 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition duration-200 flex items-center justify-center gap-2"
  onClick={onGenerateTrip}
>
  {loading ? (
    <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
  ) : (
    "Generate Trip"
  )}
</button>

        </div> 
        <Dialog open = {openDailog} onOpenChange={setOpenDailog}>
  <DialogContent>
    <DialogHeader>
      <DialogDescription>
      <img src="./public/logo.svg" alt="Google Logo" />
        <h2 className='text-2xl font-bold'>Sign in to Google</h2>
        <p className='text-gray-500'>sign in app with google Authentication</p>
      <Button
  disabled={loading}
  onClick={login}
  className="flex gap-2 items-center justify-center bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md hover:shadow"
>
  <FcGoogle size={24} />
 
</Button>

      </DialogDescription>
        
    </DialogHeader>
  </DialogContent>
</Dialog>
       </>
    )
}
export default CreateTrip

 