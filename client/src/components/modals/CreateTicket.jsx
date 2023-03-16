import {useState} from 'react'
import TextField from '@mui/material/TextField';
import auth from '../../utils/auth';

const CreateTicket = () => {
  const [ticket,changeTicket] = useState('');
  async function doCreate(evt){
    let token = auth.getToken()
    const ticket_id = ticket;
    const rspnse = await fetch('/api/ticket/create/', {
      method: "POST",
      headers: { "Content-Type": "application/json" ,
        "x-access-token":  token },		
      body: JSON.stringify({
        ticket_id,
		  }),
  });    
    const rpn = await rspnse.json();
    console.log(rpn);

  }
  function handleChange(evt){
    changeTicket(evt.target.value);
  }
  return (
    <div className = "bg-slate-50 flex flex-col justify-center items-center">
      <TextField
          className ='w-3/5'
          id="Ticket-search"
          label="Ticket Number"
          type="search"
          variant="filled"
          value = {ticket}
          onChange={handleChange}
        />
        <button className='bg-green-100 p-2 text-2xl' onClick={doCreate}> Create</button>
        Starting status will be "OPEN"
    </div>
  )
}

export default CreateTicket