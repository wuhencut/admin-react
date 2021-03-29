import { configureStore } from "@reduxjs/toolkit";
import { adminListSlice } from "./adminList/index";
export default configureStore({
  reducer: {
    adminList: adminListSlice,
  },
});
