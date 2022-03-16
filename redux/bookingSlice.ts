import { Booking } from './../types';
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    data: []
  },
  reducers: {
    addBooking: (state, action) => {
        //@ts-ignore
        state.data.push(action.payload as Booking)
    }
  }
})

export const { addBooking } = bookingSlice.actions
export const selectBookings = (state : RootState) => state.booking.data

export default bookingSlice.reducer