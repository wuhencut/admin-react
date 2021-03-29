import { createSlice } from "@reduxjs/toolkit";
export const adminListSlice = createSlice({
  name: "adminList",
  initialState: {
    value: [],
  },
  reducers: {
    getAdminList: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { getAdminList } = adminListSlice.actions;
export default adminListSlice.reducer;
