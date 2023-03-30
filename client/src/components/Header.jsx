
import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { logout , selectUser } from "./../features/userSlice"
import { setTicket } from "./../features/ticketSlice"
import Auth from "./../utils/auth"
import TextField from '@mui/material/TextField';
import Login from "./modals/Login";
import UserSettings from "./modals/UserSettings";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';

import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
// const dispatch = useDispatch();
function Header() {
  const dispatch = useDispatch();
  // const [user,setUser] = useState({username:null,adminlevel:null});
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [modalContent, changeModal] = useState(null);
  const [search,changeSearch] = useState('');
  function showModal(evt){
    if(evt.target.dataset.btn === 'settings'){
      changeModal(<UserSettings doClose={handleClose}/>);
      setOpen(true);
    } else {
      changeModal(<Login doClose={handleClose}/>);
      setOpen(true);
    }
  }
  function showSetting(evt){
      changeModal(<UserSettings doClose={handleClose}/>);
      setOpen(true);
  }

  async function doSearch(evt){
    let token = Auth.getToken()
    console.log('Serach butn requested',evt.target,search);
    const rspnse = await fetch(`/api/ticket/${search}`, {
      headers: { "Content-Type": "application/json" ,
      "x-access-token":  token
    }});    
    const rpn = await rspnse.json();
    console.log(rpn);    
     dispatch(setTicket(rpn))

  }
  function doChange(evt){
    changeSearch(evt.target.value)
  }

  useEffect(() => {
    // console.log('HEADER HAS USER:',user);
    // setUser({ ...user, username: user.username, adminlevel: user.adminlevel })
  }, [])
  
  return (
    <div className='flex flex-col'>
      {/* <h1> Welcome! <span> {user.username} </span></h1>
      <h2> AdminLevel: {user.adminlevel} </h2> */}
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Enter Ticket Number"
        inputProps={{ 'aria-label': 'search google maps' }}
        value = {search}
        onChange = {doChange}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={doSearch}>
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      {user ? 
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={showSetting} data-btn="settings">
      <SettingsIcon />
    </IconButton>
    :   
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={showModal}  data-btn="login">
        <LoginIcon />
      </IconButton>
      }
    </Paper>      
      <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box> {modalContent  ?? <div>Loading</div> } </Box>
          </Modal>      
    </div>
  )
}

export default Header;