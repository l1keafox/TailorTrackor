import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./../features/userSlice";
import { setTicket } from "./../features/ticketSlice";
import Auth from "../utils/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DEFAULT_ATTRIBUTE } from "@mui/system/cssVars/getInitColorSchemeScript";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import dayjs from "dayjs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
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
	const apiData = location.protocol === "https:" ? `` : `/api`;
	const { ticket } = prop;
	const [status, setStatus] = React.useState(ticket.status);
	const [date, setDate] = React.useState(dayjs(ticket.date_created));
	const [name, setName] = React.useState(ticket.customer_name);
	const [phone, setPhone] = React.useState(ticket.customer_phone);
	const [price, setPrice] = React.useState(ticket.price);
	const [doneBy, setDoneBy] = React.useState(dayjs(ticket.to_be_done));
	const [remake, setRemake] = React.useState(ticket.remake);

	const inputStyle = "w-[100rem]";

	// useEffect(()=>{
	// 	console.log( )
	// },[ticket] )

	const handleChange = (event) => {
		setStatus(event.target.value);
	};

	const clearticket = (evt) => {
		dispatch(setTicket(null));
	};

	const submit = async (event) => {
		const ticket_id = ticket.ticket_id;
		// console.log(ticket_id, "UPDATING TOO");

		let token = Auth.getToken();
		const rspnse = await fetch(apiData+"/ticket/update/", {
			method: "POST",
			headers: { "Content-Type": "application/json", "x-access-token": token },
			body: JSON.stringify({
				ticket_id,
				status,
				date,
				price,
				name,
				phone,
				doneBy,
				remake,
			}),
		});
		const rpn = await rspnse.json();
		dispatch(setTicket(rpn));
		// console.log(rpn, "Dispatch updating set ticket");
	};

	return (
		<div className="bg-[#F1D592] p-3 m-2 h-[45rem] w-[21rem] ticket">
			<div id="outer-circle" className="left-50"></div>
			{ticket ? (
				<>
					<h1 className="text-xl font-bold  p-2 text-red-500 absolute left-10">
						{ticket.ticket_id}
					</h1>
					<div className="text-xl font-bold  p-2 text-blue-500  absolute left-[9rem]  items-center flex">
						<span className="mr-3">Status:</span>
						{user && user.adminlevel >= 5 ? (
							<Box sx={{ minWidth: 120 }}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">
										{ticket.status}
									</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={status}
										label="Status"
										onChange={handleChange}>
										<MenuItem value={"NEW"}>New</MenuItem>
										<MenuItem value={"OPEN"}>Open</MenuItem>
										<MenuItem value={"WORK"}>Working On</MenuItem>
										<MenuItem value={"DONE"}>Done</MenuItem>
									</Select>
								</FormControl>
							</Box>
						) : (
							<div> {ticket.status} </div>
						)}
					</div>
				</>
			) : (
				<div />
			)}

			{user && user.adminlevel >= 5 ? (
				<div className=" top-[5rem] relative px-2 h-3/4">
					<div className="relative h-3/4 flex flex-col justify-between ">
						<div className="flex justify-between items-center">
							<DatePicker
								value={date}
								label="Date Accepted"
								className={inputStyle}
								onChange={(newValue) => {
									return setDate(newValue);
								}}
							/>
						</div>
						<div className="flex justify-between items-center">
							
							<TextField
								className={inputStyle}
								value={name}
								label="Name"
								onChange={(event) => {
									return setName(event.target.value);
								}}
							/>
						</div>

						<div className="flex justify-between items-center">
							
							<TextField
								id="outlined-adornment-amount"
								className={inputStyle}
								startAdornment={
									<InputAdornment position="start">$</InputAdornment>
								}
								label="Price"
								value={price}
								onChange={(event) => {
									return setPrice(event.target.value);
								}}
							/>
						</div>
						<div className="flex justify-between items-center">
							
							<TextField
								className={inputStyle}
								label="Phone #"
								value={phone}
								onChange={(event) => setPhone(event.target.value)}
							/>
						</div>

						<div className="flex justify-between items-center">
							
							<DatePicker
								className={inputStyle}
								label="Done By"
								value={doneBy}
								onChange={(newValue) => {
									return setDoneBy(newValue);
								}}
							/>
						</div>
						<div className="flex justify-between items-center">
							
							<TextField
								className={inputStyle}
								label="Remakes"
								value={remake}
								onChange={(event) => setRemake(event.target.value)}
							/>
						</div>
					</div>
					<div className="absolute bottom-0 right-1 flex flex-col">
						<Button variant="outlined" size="large" onClick={submit}>
							Update Ticket
						</Button>
						<Button variant="outlined" size="large" onClick={clearticket}>
							Close
						</Button>
					</div>
				</div>
			) : (
				<div className=" top-[5rem] relative px-2 h-3/4">
					<List
						sx={{
							width: "100%",
							maxWidth: 360,
							bgcolor: "#F1D592",
						}}>
						<ListItem>
							<ListItemText secondary={date.$M + 1+'/'+date.$D} primary=" Date Accepted" />
						</ListItem>
						<Divider component="li" />
						<ListItem>
							<ListItemText secondary={name}  primary="Name" />
						</ListItem>
						<Divider component="li" />
						<ListItem>
							<ListItemText secondary=  {price} primary="Price" />
						</ListItem>
						<Divider component="li" />
						<ListItem>
							<ListItemText secondary= {doneBy.$M + 1 +'/'+doneBy.$D} primary="Est. Done By" />
						</ListItem>
						<Divider component="li" />
						<ListItem>
							<ListItemText secondary=  {remake}  primary="Remakes" />
						</ListItem>
					</List>
					<div className="absolute bottom-0 right-1 flex flex-col">
						<Button variant="outlined" size="large" onClick={clearticket}>
							Close
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Ticket;
