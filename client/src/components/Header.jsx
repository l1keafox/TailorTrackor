
import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { logout , selectUser } from "./../features/userSlice"
import Auth from "./../utils/auth"
import TextField from '@mui/material/TextField';

function Header() {
  // const dispatch = useDispatch();
  // const [user,setUser] = useState({username:null,adminlevel:null});
  const gettingUser = useSelector(selectUser);

  function doLogout(evt){
    Auth.logout();
    dispatch(logout({}))
  }

  function showModal(evt){
    
  }

  function doSearch(evt){

  }

  useEffect(() => {
    console.log('HEADER HAS USER:',gettingUser);
    // setUser({ ...user, username: gettingUser.username, adminlevel: gettingUser.adminlevel })
  }, [])
  
  return (
    <div className='flex'>
      {/* <h1> Welcome! <span> {user.username} </span></h1>
      <h2> AdminLevel: {user.adminlevel} </h2> */}
        <TextField
          className ='w-3/5'
          id="Ticket-search"
          label="Ticket Number"
          type="search"
          variant="filled"
        />
        <button onClick={doSearch} className="w-1/5 bg-red-50"> Search </button>
      {gettingUser ? <button onClick={doLogout} className="w-1/5 bg-yellow-50"> {gettingUser.username}  </button> : <button onClick={showModal} className="w-1/5 bg-yellow-50"> Login  </button>  }
      {/*  */}
    </div>
  )
}

export default Header;