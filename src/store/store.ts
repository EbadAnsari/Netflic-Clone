import { configureStore } from "@reduxjs/toolkit";
import SigningReducer from "./slice/SigningSlice";
import TrailerModalReducer from "./slice/TrailerModalSlice";
import LikedSliceReducer from "./slice/LikedSlice";

export const store = configureStore({
	reducer: { SigningReducer, TrailerModalReducer, LikedSliceReducer },
});
