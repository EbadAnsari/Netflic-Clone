import {
	TrailerModalInputs,
	TrailerModalSliceType,
} from "@interfaces/ModalInterface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: TrailerModalSliceType = {
	modalState: "close",
};

const modalSlice = createSlice({
	initialState,
	name: "modalResult",
	reducers: {
		openModal(
			state: TrailerModalSliceType,
			actions: PayloadAction<TrailerModalInputs>,
		) {
			state.modalState = "open";
			state.modalValue = actions.payload;
		},
		closeModal(state: TrailerModalSliceType) {
			state.modalState = "close";
			state.modalValue = undefined;
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
