import { TIME_SLOT } from './../data';
import { createSlice } from '@reduxjs/toolkit'
import { DATA } from '../data'
import { RootState } from './store'
import dayjs from 'dayjs'
import uuid from 'react-native-uuid';

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
                        id: uuid.v4(),
                        slots: [startTime.format('HH:mm'), startTime.add(30, 'm').format('HH:mm')],
                    } as TIME_SLOT)
                    startTime = startTime.add(30, 'm')
                }
                data[i].timeSlots = timeSlots
                timeSlots = []
            }  
        },
        updateTimeSlots: (state, action) => {
            const { data } = state;
            const { name, selectedSlot, selectedDay } = action.payload;
            // filter the coach with name
            const coach = data.filter(coach => coach.name === name);
            // filter the array day with selectedDay
            const foundDay = coach.filter(item  => item.day_of_week === selectedDay)[0];
            // filter the array timeSlots with selectedSlot
            const foundSlot = foundDay?.timeSlots?.filter(item => item.id === selectedSlot)[0];

            if (foundSlot) {
                foundSlot.booked = !foundSlot.booked
            }
        }
    }
})

export const { generateTimeSlots, updateTimeSlots } = scheduleSlice.actions
export const selectSchedules = (state: RootState) => state.schedule.data

export default scheduleSlice.reducer

