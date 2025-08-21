import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from "axios";


function Header() {
  const sUser = localStorage.getItem('user');
    const [openDialog,setOpenDialog]=useState(false);

  const user= sUser ? JSON.parse(sUser) : null;
  useEffect(()=>{
    console.log('User :' , user);
  },[]);


     const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error),
    scope: "openid profile email", 
  })

    const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,{
      headers: {
       Authorization: `Bearer ${tokenInfo?.access_token}`,
       Accept:'Application/json'
      }
    }).then((resp) => {console.log(resp.data);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    })
  }

  return (
    <>
     <div className='p-2 shadow-sm flex justify-between items-center px-4'>
      
      <img src="/public/logo.svg" alt="Logo1" className="h-10 w-auto" />

      <div>
        {user ?
        
        <div className='flex items-centre gap-3'>
        <a href="/create-trip">
         <Button variant="outline" className= "rounded-full">Create Trip</Button> 
        </a>
         <a href="/my-trips">
        <Button variant="outline" className= "rounded-full">My Trips </Button> 
        </a>
         <Popover>
         <PopoverTrigger> <img src={user?.picture} className='rounded-full w-[38px] h-[38px]' /></PopoverTrigger>
       <PopoverContent><h2 className='cursor-pointer' onClick={() => {
          googleLogout();
          localStorage.clear();
          // Navigation('/');
          window.location.reload();
       }}>Log Out</h2></PopoverContent>
        </Popover>
        </div>:
        <Button onClick={()=>setOpenDialog(true)}>Sign In</Button>
        }
      
      </div>
      {/* Sign in button on the top-right
      <button className="px-5 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-200">
        Sign in
      </button> */}
            
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
             <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              <img src="/logo.svg"/>
              <h2 className="font-bold text-lg mt-6">Sign In with Google</h2>
              <p>Sign In to the App with Google authentication securely</p>
              <Button 
              onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7"/>
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
    </div>
    </>
  );
}

export default Header;
