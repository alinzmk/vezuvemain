import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profiledata/profileSlice";
import planReducer from "../features/plandata/planSlice";
import dashReducer from "../features/dashdata/dashSlice";
import taskReducer from "../features/taskdata/taskSlice";
import productReducer from "../features/productdata/productSlice";
import docReducer from "../features/docdata/docSlice";
import userAdminReducer from "../features/useradmin/userAdminSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    plan: planReducer,
    dash: dashReducer,
    task: taskReducer,
    product: productReducer,
    doc: docReducer,
    useradmin: userAdminReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;