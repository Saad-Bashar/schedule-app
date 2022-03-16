import { createSlice } from '@reduxjs/toolkit'
import { DATA } from '../data'
import { RootState } from './store'
import dayjs from 'dayjs'
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        data: DATA
    },
    reducers: {
        generateTimeSlots: (state) => {
            const { data } = state
            for (let i = 0; i < data.length; i++) {
                let startTime = dayjs(data[i].available_at, 'HH:mm')
                let endTime = dayjs(data[i].available_until, 'HH:mm')
                let timeSlots = []
                while (startTime.isBefore(endTime) || startTime.isSame(endTime)) {
                    timeSlots.push({
                        slots: [startTime.format('HH:mm'), startTime.add(30, 'm').format('HH:mm')],
                        booked: false
                    })
                    startTime = startTime.add(30, 'm')
                }
                data[i].timeSlots = timeSlots
                timeSlots = []
            }  
        }
    }
})

export const { generateTimeSlots } = scheduleSlice.actions
export const selectSchedules = (state: RootState) => state.schedule.data

export default scheduleSlice.reducer

