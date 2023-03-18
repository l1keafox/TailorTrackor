import {createSlice} from '@reduxjs/toolkit'

export const ticketSlice = createSlice({
  name:"ticket",
  initialState:{
    ticket:null
  },
  reducers:{
    setTicket:(state,action) =>{
      state.ticket = action.payload;
    },
    clearTicket:() =>{
      state.ticket = null;
    }
  }
});

export const {setTicket, clearTicket} = ticketSlice.actions;

export const selectTicket = (state) => state.ticket.ticket;

export default ticketSlice.reducer;