import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null },
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;


