import { UserType } from '@/models/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// profile slice
export interface UserSlice {
  user: UserType;
}
// init
const initialState: UserSlice = {
  user: {} as UserType,
};


// slice reducer
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

// export slice reducer
export const { addUser } = userSlice.actions;
export default userSlice.reducer;