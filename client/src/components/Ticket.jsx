import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./../features/userSlice";
import { setTicket } from "./../features/ticketSlice";
import Auth from "../utils/auth";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DEFAULT_ATTRIBUTE } from "@mui/system/cssVars/getInitColorSchemeScript";
/*

So ticket has several different states.

State 1 - Create ticket, input all new data and save it.
	- When it is saved it will 

State 2 - Update ticket for worker

State 0 - Customer facing information, nothing can be changed just information can be looked at. 


So ticket needs to look at several things.

Status of the ticket - NEW / OPEN / WORKED ON / DONE / CLOSED
AdminLevel of the user - Determine how much they can change.



*/


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
		console.log(ticket_id, status, "UPDATING TOO");
		let token = Auth.getToken();
		const rspnse = await fetch("/api/ticket/update/", {
			method: "POST",
			headers: { "Content-Type": "application/json", "x-access-token": token },
			body: JSON.stringify({ ticket_id, status: status }),
		});
		const rpn = await rspnse.json();
		dispatch(setTicket(rpn));
		console.log(rpn, "Dispatch updating set ticket");
	};

	function getFieldByAdmin(data){
		if(user){

		}
		console.log("ADMIN LVL",user ? user.adminlevel : 0," TICK STATUS:",ticket.status,DEFAULT_ATTRIBUTE);
		switch(data){
			case 'date':
				if(ticket && ticket.status){
					return (<TextField/>)
				}
				// return {ticket.date};
			case 'status':
				if(user && user.adminlevel >= 5){
					return (
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
					)
				}
			return (ticket.status)
		}
		return (<TextField/>)
	}

	return (
		<div className="bg-[#F1D592] p-2 m-2 h-[45rem] ticket">
			<div id="outer-circle" className="left-50"></div>
			{ticket ? (
				<>
					<h1 className="text-xl font-bold  p-2 text-red-500 absolute left-12">
						{ticket.ticket_id}
					</h1>
					<h1 className="text-xl font-bold  p-2 text-blue-500  absolute right-12 text-center"> Status: {getFieldByAdmin('status')} </h1>
				</>
			) : (
				<div />
			)}
			<div className=" top-[5rem] relative px-2">
				<h1 className="text-center text-xl font-bold pb-8"> Store Name</h1>
				<div className="relative h-[30rem]">
					<div className="flex justify-between items-center">
						<h1 className="mb-2 text-xl"> Date: </h1> {getFieldByAdmin('date')} 
					</div>	
					<div className="flex justify-between items-center">
						<h1 className="mb-2 text-xl"> Name: </h1> <TextField/>
					</div>	
					<div className="flex justify-between items-center">
						<h1 className="mb-2 text-xl"> Phone: </h1> <TextField/>
					</div>	
					<div className="flex justify-between items-center">
						<h1 className="mb-2 text-xl"> Price: </h1> <TextField/>
					</div>	
					<div className="flex justify-between items-center">
						<h1 className="mb-2 text-xl"> Done By: </h1> <TextField/>
					</div>	
					<div className="flex justify-between items-center">
						<h1 className="mb-2 text-xl"> Remakes: </h1> <TextField/>
					</div>	

					<Button> Update </Button>
				</div>
			</div>

		</div>
	);
};

export default Ticket;
