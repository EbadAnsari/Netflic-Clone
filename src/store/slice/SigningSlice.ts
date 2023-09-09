import { SigningState } from "@interfaces/interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SigningState = { location: "/sign/in", text: "Sign In" };

const signingSlice = createSlice({
	initialState,
	name: "signing",
	reducers: {
		signIn(state: SigningState) {
			state.location = "/sign/in";
			state.text = "Sign In";
		},
		signUp(state: SigningState) {
			state.location = "/sign/up";
			state.text = "Sign Up";
		},
	},
});

export const { signIn, signUp } = signingSlice.actions;
export default signingSlice.reducer;
