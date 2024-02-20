import { ProfileType } from '@/models/profile';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// profile slice
export interface ProfileState {
  profiles: ProfileType[];
}
// init
const initialState: ProfileState = {
  profiles: [],
};

// slice reducer
export const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    addProfileStore: (state, action: PayloadAction<ProfileType>) => {
      const existingIndex = state.profiles.findIndex(profile => profile._id === action.payload._id);
      if (existingIndex === -1) {
        state.profiles.push(action.payload);
      } else {
        return
      }
    },
    updateProfile: (state, action: PayloadAction<ProfileType>) => {
      const index = state.profiles.findIndex(profile => profile._id === action.payload._id);
      if (index !== -1) {
        state.profiles[index] = action.payload;
      }
    },
    deleteProfileStore: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.filter(profile => profile?._id !== action.payload);
    },
  },
});

// export slice reducer
export const { addProfileStore, updateProfile, deleteProfileStore } = profilesSlice.actions;
export default profilesSlice.reducer;