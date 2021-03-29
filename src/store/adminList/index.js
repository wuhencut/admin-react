import { createSlice } from "@reduxjs/toolkit";
export const adminListSlice = createSlice({
  name: "adminList",
  initialState: {
    value: [],
  },
  reducers: {
    AdminList: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { AdminList } = adminListSlice.actions;
export default adminListSlice.reducer;
