import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/userSlice"
import ticketReducer from "../features/ticketSlice"

export default configureStore({
  reducer:{
    user: userReducer,
    ticket: ticketReducer,
  }
})