import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { selectUser } from "./../features/userSlice";
import { setTicket } from "./../features/ticketSlice";
import Auth from "../utils/auth";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from '@mui/material/Button';
const Ticket = (prop) => {
	const user = useSelector(selectUser);
  const dispatch = useDispatch();

	const { ticket } = prop;
	const [age, setAge] = React.useState("");

	const handleChange = (event) => {
		setAge(event.target.value);
	};

  const submit = async (event) => {
    const ticket_id = ticket.ticket_id;
    const status = age;
    console.log(ticket_id, status,"UPDATING TOO");
    let token = Auth.getToken()
    const rspnse = await fetch('/api/ticket/update/', {
      method: 'POST',
      headers: { "Content-Type": "application/json", "x-access-token":  token },
      body: JSON.stringify({ ticket_id, status:status })
    });    
     const rpn = await rspnse.json();
     dispatch(setTicket(rpn));
    console.log(rpn,"Dispatch updating set ticket");
  }
	console.log(prop);
	console.log(ticket, user);
	return (
		<div className="bg-[#F1D592] p-2 m-2 h-[50rem] ticket">
			<div id="outer-circle" className="left-50">
			</div>
			{ticket ? (
				<div>
					{/* <h1 className="text-xl p-2"> Ticket Name: {ticket.ticket_id} </h1>
					<h1 className="text-xl p-2"> Status: {ticket.status} </h1> */}
				</div>
			) : (
				<div />
			)}
			{user && user.adminlevel >= 5 ? (
				<div>
          <div className ="flex p-2"> 
					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Status</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={age}
								label="Status"
								onChange={handleChange}>
								<MenuItem value={"Open"}>Open</MenuItem>
								<MenuItem value={'Working On'}>Working On</MenuItem>
								<MenuItem value={'Done'}>Done</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<Button variant="outlined" onClick={submit}>Update </Button>
          </div>
				</div>
			) : (
				<div />
			)}
		</div>
	);
};

export default Ticket;
