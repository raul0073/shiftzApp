import { ShiftType } from '@/models/shift';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// profile slice
export interface ShiftsState {
  shifts: ShiftType[];
}
// init
const initialState: ShiftsState = {
  shifts: [],
};


// slice reducer
export const shiftsSlice = createSlice({
  name: 'shifts',
  initialState,
  reducers: {
    addShift: (state, action: PayloadAction<ShiftType>) => {
      const existingShift = state.shifts.find(shift => shift._id === action.payload._id);
      if (!existingShift) {
        state.shifts.push(action.payload);
      }
    },
    updateShift: (state, action: PayloadAction<ShiftType>) => {
      const index = state.shifts.findIndex((shift) => shift._id === action.payload._id);
      if (index !== -1) {
        state.shifts[index] = action.payload;
      }
    },
    deleteShift: (state, action: PayloadAction<string>) => {
      state.shifts = state.shifts.filter((shift) => shift._id !== action.payload);
    },
  },
});

// export slice reducer
export const { addShift, updateShift, deleteShift } = shiftsSlice.actions;
export default shiftsSlice.reducer;