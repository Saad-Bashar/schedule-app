import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export const launchSlice = createSlice({
  name: 'launch',
  initialState: {
    isLaunched: false
  },
  reducers: {
    setLaunched: (state) => {
      state.isLaunched = true
    }
  }
})

export const { setLaunched } = launchSlice.actions
export const selectLaunch = (state : RootState) => state.launch.isLaunched

export default launchSlice.reducer