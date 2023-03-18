import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./../features/userSlice";

const Ticket = (prop) => {
  const user = useSelector(selectUser);
  const {ticket} = prop;
  console.log(prop);
  console.log(ticket,user);
	return (
		<div className = "bg-yellow-100 p-2 m-2 border border-blue-300">
      {
      ticket ?
      <div> 
			  <h1> Ticket Name: {ticket.ticket_id} </h1>
        <h1> Status: {ticket.status} </h1>
      </div>
      : <div />
      }
      {user && user.adminlevel >= 5 ? (
      <div> 
				<h1>Update Status</h1>
      	<button>Change </button> 
			</div>
      ):<div />
      }

		</div>
	);
};

export default Ticket;
