import { TrailerModalProps } from "@interfaces/ModalInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LikedMovieSliceType = { likedMovieList: TrailerModalProps[] };

const initialState: LikedMovieSliceType = {
	likedMovieList: [],
};

const likedSlice = createSlice({
	initialState,
	name: "likedSlice",
	reducers: {
		setLikeMovie(state, actions: PayloadAction<TrailerModalProps>) {
			const indexOf = state.likedMovieList.findIndex(
				(element) => element.id === actions.payload.id,
			);

			if (indexOf === -1) state.likedMovieList.unshift(actions.payload);
			else state.likedMovieList[indexOf] = actions.payload;
		},
		unLikeMovie(state, actions: PayloadAction<TrailerModalProps>) {
			state.likedMovieList = state.likedMovieList.filter(
				(element) => element.id !== actions.payload.id,
			);
		},
	},
});

export const { setLikeMovie, unLikeMovie } = likedSlice.actions;
export default likedSlice.reducer;
