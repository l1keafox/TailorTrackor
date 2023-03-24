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
	const [modalContent, changeModal] = useState(<CreateTicket doClose={() => setOpen(false)}/>);
	function openModal() {
		setOpen(true);
	}
  useEffect(() => {
    console.log(ticket,"New ticket?");
  }, [ticket])
  
	console.log(user, ticket ," WHAT IS IT?");
	return (
		<div className="h-[calc(100vh-75px)] p-3">
			{user ? (
				<div className="flex items-center justify-center fixed bottom-0 m-5 z-50">
					<button className="bg-slate-300 text-5xl h-[5rem] w-[5rem] p-3 text-center justify-center flex hover:scale-105" onClick={openModal}>
						+
					</button>
				</div>
			) : < div />
			}
      {ticket ? <Ticket ticket={ticket} /> : <div/> }

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
