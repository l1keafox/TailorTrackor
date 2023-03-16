
import {useSelector} from "react-redux";
import { selectUser } from "./../features/userSlice";
import CreateTicket from "../components/modals/CreateTicket";
import {useState} from 'react';
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

function HomePage() {
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [modalContent, changeModal] = useState(<CreateTicket/>);
  function openModal(){
    setOpen(true);
  }
  console.log(user)
  return (
    <div className = "bg-green-200 h-[calc(100vh-75px)] p-3" >
      { user ? 
      <div className = "bg-green-300 flex items-center justify-center">
        <button className = "bg-slate-300 w-[10rem] p-3" onClick={openModal}> Create Ticket </button>
      </div> 
      :
      <div>

      </div>
      }
      <div>
      <Modal
            open={open}
            onClose={()=> setOpen(false) }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box> 
        { modalContent ?? <div></div>}
        </Box>
          </Modal>      
      </div>
    </div>
  )
}

export default HomePage