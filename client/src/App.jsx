import { useEffect } from 'react'
import Header from "./components/Header"
import Home from "./pages/Home"

import './App.css'
import Auth from "./utils/auth";
import {useSelector, useDispatch} from "react-redux";
import { selectUser, login } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(Auth.loggedIn()){
      const user = Auth.getUser();
      dispatch( login( user ) )
    }
  },[])

  return (
    <div className="App">
      <Header/>
      <Home/>
    </div>
  )
}

export default App
