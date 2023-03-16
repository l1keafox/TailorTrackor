
import {useEffect,useState} from 'react'
import { logout , selectUser } from "./../../features/userSlice"
import Auth from "./../../utils/auth"
import { useDispatch} from "react-redux";
function UserSettings() {
 const dispatch = useDispatch();
  function doLogout(evt){
    Auth.logout();
    dispatch(logout({}))
  }

  return (
    <div className='flex flex-col items-center bg-yellow-500'>
      <h1 className="text-xl text-black"> Settings </h1>
      <button onClick={doLogout} className="w-[10rem] bg-slate-100 p-2 m-2"> Logout </button>
    </div>
  )
}

export default UserSettings;