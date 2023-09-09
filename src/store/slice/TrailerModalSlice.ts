import { TrailerModalState } from "@interfaces/interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TrailerModalState = { result: "close" };

const trailerModalSlice = createSlice({
	initialState,
	name: "modalResult",
	reducers: {
		add(state: TrailerModalState) {
			state.result = "add";
		},
		close(state: TrailerModalState) {
			state.result = "close";
		},
		play(state: TrailerModalState) {
			state.result = "play";
		},
	},
});

export const { add, close, play } = trailerModalSlice.actions;
export default trailerModalSlice.reducer;
