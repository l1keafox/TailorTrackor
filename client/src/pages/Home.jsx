import { useSelector } from "react-redux";
import { selectUser } from "./../features/userSlice";
import { selectTicket } from "./../features/ticketSlice";

import CreateTicket from "../components/modals/CreateTicket";
import { useState,useEffect } from "react";
import Modal from "@mui/material/Modal";
import Ticket from "./../components/Ticket"
import { Box } from "@mui/material";

function HomePage() {
	const user = useSelector(selectUser);
	const ticket = useSelector(selectTicket);
	const [open, setOpen] = useState(false);
	const [modalContent, changeModal] = useState(<CreateTicket />);
	function openModal() {
		setOpen(true);
	}
  useEffect(() => {
    console.log(ticket,"New ticket?");
  }, [ticket])
  
	console.log(user, ticket ," WHAT IS IT?");
	return (
		<div className="bg-green-200 h-[calc(100vh-75px)] p-3">
			{user ? (
				<div className="flex items-center justify-center fixed bottom-0 m-5">
					<button className="bg-slate-300 w-[10rem] p-3" onClick={openModal}>
						Create Ticket
					</button>
				</div>
			) : < div />
			}
      {ticket ? <Ticket ticket={ticket}/> : <div/> }

			<div>
				<Modal
					open={open}
					onClose={() => setOpen(false)}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description">
					<Box>{modalContent ?? <div></div>}</Box>
				</Modal>
			</div>
		</div>
	);
}

export default HomePage;
