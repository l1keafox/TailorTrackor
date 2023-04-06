import {useState} from 'react'
import TextField from '@mui/material/TextField';
import auth from '../../utils/auth';
import { useDispatch } from 'react-redux'; 
import { setTicket } from '../../features/ticketSlice';


const CreateTicket = (prop) => {
  const apiData = location.protocol === "https:" ? `` : `/api`;
  const [ticket,changeTicket] = useState('');
  const dispatch = useDispatch();
  async function doCreate(evt){
    let token = auth.getToken()
    const ticket_id = ticket;
    const rspnse = await fetch(apiData+'/ticket/create/', {
      method: "POST",
      headers: { "Content-Type": "application/json" ,
        "x-access-token":  token },		
      body: JSON.stringify({
        ticket_id,
		  }),
  });    
    const rpn = await rspnse.json();
    if(rpn.ticket_id == ticket_id){
      dispatch(setTicket(rpn));
      prop.doClose();
    }
  }
  function handleChange(evt){
    changeTicket(evt.target.value);
  }
  return (
      <div className = "bg-slate-50 flex flex-col justify-center items-center h-[25rem] p-2 m-2 ">
        <TextField
          className ='w-3/5 p-2'
          id="Ticket-search"
          label="Ticket Number"
          type="search"
          variant="filled"
          value = {ticket}
          onChange={handleChange}
        />
        <button className='bg-green-100 p-2 m-2 text-2xl' onClick={doCreate}> Create</button>
        Starting status will be "NEW"
      </div>
  )
}

export default CreateTicket