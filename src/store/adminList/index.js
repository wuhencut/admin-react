/* eslint-disable array-callback-return */
import { createSlice } from "@reduxjs/toolkit";
export const adminListSlice = createSlice({
  name: "adminList",
  initialState: {
    value: [],
    allAdmin: {},
  },
  reducers: {
    AdminList: (state, action) => {
      state.value = action.payload;
      action.payload.map((item) => {
        state.allAdmin[item.user_id] = item.nickname;
      });
    },
  },
});
export const { AdminList } = adminListSlice.actions;
export default adminListSlice.reducer;
