import { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import authService from './appwrite/auth';
import {login,logout} from './store/authSlice';
import './App.css'
// import {Header,Footer} from './Components/index';
import { Header,Footer } from './Components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading,setLoading] =useState(true);
  const dispatch=useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}));
      }else{
        dispatch(logout());
      }
    })
    .finally(()=>setLoading(false));
  },[]);


  return !loading ?(
   <div className='min-h-screen flex flex-wrap content-between bg-blue-300 w-full'>
    <div className='w-full '>
      <Header />
      <main>
        <Outlet/> 
      </main>
      <Footer/>
    </div>
    </div>
  ): null;
}

export default App
