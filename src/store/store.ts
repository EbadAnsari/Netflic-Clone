import { configureStore } from "@reduxjs/toolkit";
import SigningReducer from "./slice/SigningSlice";
import TrailerModalReducer from "./slice/TrailerModalSlice";
import LikedSliceReducer from "./slice/LikedSlice";

export default configureStore({
	reducer: { SigningReducer, TrailerModalReducer, LikedSliceReducer },
});
