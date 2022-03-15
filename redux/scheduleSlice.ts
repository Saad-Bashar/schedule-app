import { createSlice } from '@reduxjs/toolkit'
import { DATA } from '../data'
import { RootState } from './store'

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        data: DATA
    },
    reducers: {
        
    }
})

export const { } = scheduleSlice.actions
export const selectSchedules = (state: RootState) => state.schedule.data

export default scheduleSlice.reducer

