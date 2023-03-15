import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from "./../features/userSlice"

function Logout() {
  const dispatch = useDispatch();

  function doLogout(evt){
    dispatch(logout({}))
  }

  return (
    <div>
      <h1> Welcome! <span>username </span></h1>
      <button onClick={doLogout}> Logout </button>
    </div>
  )
}

export default Logout