import { configureStore } from '@reduxjs/toolkit'
import ProfileSlice from './features/ProfileSlice'
import ShiftsSlice from './features/ShiftsSlice'
import userSlice from './features/UserSlice'
import ActiveProfileSlice from './features/ActiveProfileSlice'


export const makeStore = () => {
  return configureStore({
    reducer: {
        profiles: ProfileSlice,
        shifts: ShiftsSlice, 
        users: userSlice,
        activeProfile: ActiveProfileSlice
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


