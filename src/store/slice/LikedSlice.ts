import { TrailerModalProps } from "@interfaces/ModalInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LikedMovieSliceType = { likedMovies: TrailerModalProps[] };

const initialState: TrailerModalProps[] = [];

const likedSlice = createSlice({
	initialState,
	name: "likedSlice",
	reducers: {
		setLikedMovie(state, actions: PayloadAction<TrailerModalProps>) {
			// const list = actions.payload
			state.unshift(actions.payload);
		},
	},
});

export const { setLikedMovie } = likedSlice.actions;
export default likedSlice.reducer;
