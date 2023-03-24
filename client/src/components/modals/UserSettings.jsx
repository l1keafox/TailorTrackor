
import {useEffect,useState} from 'react'
import { logout , selectUser } from "./../../features/userSlice"
import Auth from "./../../utils/auth"
import { useDispatch, useSelector } from "react-redux";
function UserSettings() {
 const dispatch = useDispatch();
 const user = useSelector(selectUser);
  function doLogout(evt){
    Auth.logout();
    dispatch(logout({}))
  }

  return (
    <div className='flex flex-col items-center bg-yellow-500'>
      <h1 className="text-xl text-black"> Settings </h1>
      <h1> Admin Level: {user.adminlevel}.</h1>
      <button onClick={doLogout} className="w-[10rem] bg-slate-100 p-2 m-2"> Logout </button>
    </div>
  )
}

export default UserSettings;