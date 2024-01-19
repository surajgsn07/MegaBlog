import { useEffect, useState } from 'react'
import './App.css'
import conf from './conf/conf'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login , logout} from "./store/authSlice"
import {Header , Footer} from './components/Index.js'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch();
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }else{
        
        dispatch(logout());
      }
    })
    .finally(()=>setloading(false))
  } , [])

  return !loading ? (
    <div className='p-0 m-0 w-full'>
    <Header/>
    <div className='w-full'>
      <Outlet/>
       </div>
    <Footer />
    </div>
  ) :(null)
}

export default App
