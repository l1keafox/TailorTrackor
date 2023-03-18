
import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { logout , selectUser } from "./../features/userSlice"
import { setTicket } from "./../features/ticketSlice"
import Auth from "./../utils/auth"
import TextField from '@mui/material/TextField';
import Login from "./modals/Login";
import UserSettings from "./modals/UserSettings";


import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
// const dispatch = useDispatch();
function Header() {
  const dispatch = useDispatch();
  // const [user,setUser] = useState({username:null,adminlevel:null});
  const gettingUser = useSelector(selectUser);
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
    // console.log('HEADER HAS USER:',gettingUser);
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
          value = {search}
          onChange = {doChange}
        />
        <button onClick={doSearch} className="w-1/5 bg-red-50"> Search </button>
      {gettingUser ? <button onClick={showModal} data-btn="settings" className="w-1/5 bg-yellow-50"> Logout  </button> : <button onClick={showModal} data-btn="login" className="w-1/5 bg-yellow-50"> Login  </button>  }
      {/*  */}
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