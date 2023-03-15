import { useEffect } from 'react'
import Login from './components/Login';
import Logout from "./components/Logout"
import './App.css'
import Auth from "./utils/auth";
import {useSelector,useDispatch} from "react-redux";
import { selectUser,login } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(Auth.loggedIn()){
      const user = Auth.getUser();
       dispatch(
         login({
           user,
           loggedIn:true
         } )
       )
    }
  },[])

  return (
    <div className="App">
      { user ? <Logout/>:<Login/> }
    </div>
  )
}

export default App
