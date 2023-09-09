import { configureStore } from "@reduxjs/toolkit";
import SigningReducer from "./slice/SigningSlice";
import TrailerModalReducer from "./slice/TrailerModalSlice";

export default configureStore({
	reducer: { SigningReducer, TrailerModalReducer },
});
