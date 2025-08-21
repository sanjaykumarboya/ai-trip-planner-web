import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import MyTrips from './mytrips/index.jsx';
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Import RouterProvider
import Header from './components/custom/Header';
import CreateTripp from './create-trip/index.jsx';
import Hero from './components/custom/Hero.jsx'; // Assuming you have a hero component
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/[tripId]/index.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App /> // Corrected typo from 'elemet' to 'element'
  },
  {
    path : '/create-trip',
    element: <CreateTripp/>
  },
  {
    path : '/view-trip/:tripId',
    element : <ViewTrip/>
  },
  {
    path: '/my-trips',
    element:<MyTrips/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header />
    {/* <Hero /> */}
     <Toaster />

    <RouterProvider router={router} />
  </GoogleOAuthProvider>

  </StrictMode>
)