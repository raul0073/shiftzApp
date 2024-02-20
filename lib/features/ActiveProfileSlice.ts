
import { ProfileType } from '@/models/profile';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// profile slice
export interface ActiveProfileState {
  profile: ProfileType;
}
// init
const initialState: ActiveProfileState = {
  profile: {} as ProfileType,
};

// slice reducer
export const activeProfileSlice = createSlice({
  name: 'activeProfile',
  initialState,
  reducers: {
    toggleProfile: (state, action: PayloadAction<ProfileType>) => {
        state.profile = action.payload
    }
  },
});

// export slice reducer
export const { toggleProfile} = activeProfileSlice.actions;
export default activeProfileSlice.reducer;