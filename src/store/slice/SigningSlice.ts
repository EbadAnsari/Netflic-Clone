import { SigningState } from "@interfaces/interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SigningState = { location: "/in/login", text: "Sign In" };

const signingSlice = createSlice({
	initialState,
	name: "signing",
	reducers: {
		signIn(state: SigningState) {
			state.location = "/in/login";
			state.text = "Sign In";
		},
		signUp(state: SigningState) {
			state.location = "/in";
			state.text = "Sign Up";
		},
	},
});

export const { signIn, signUp } = signingSlice.actions;
export default signingSlice.reducer;
