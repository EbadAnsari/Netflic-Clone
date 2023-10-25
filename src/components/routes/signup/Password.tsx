import { slideInOut } from "@animation/animate";
import Alert from "@components/Alert";
import InputBox, { InputBoxRef } from "@components/InputBox";
import { signIn, useAuth } from "@context/AuthContext";
import { CredentialError } from "@interfaces/interface";
import {
	checkEmail,
	checkPassword,
	validEmail,
	validPassword,
} from "@utils/functions";
import { motion as m } from "framer-motion";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { Form, useActionData } from "react-router-dom";

export default function Password() {
	const auth = useAuth();

	const [email, setEmail] = useState(
		checkEmail(localStorage.getItem("email")),
	);
	const [password, setPassword] = useState(checkPassword(""));

	const action = useActionData() as CredentialError;

	const [loading, setLoading] = useState(false);

	// if (auth?.user) return <Navigate to={"/signup/planform"} />;

	const isEmailSet = checkEmail(localStorage.getItem("email"));

	const passwordRef = useRef<InputBoxRef>(null);
	const emailRef = useRef<InputBoxRef>(null);

	useEffect(() => {
		console.log(passwordRef);
	}, []);

	return (
		<m.div
			{...slideInOut}
			className="mx-auto my-20 flex w-[clamp(15rem,_90%,_25rem)] flex-col"
		>
			<p className="text-xs uppercase">
				Step&nbsp;<span className="font-semibold">1</span>
				&nbsp;of&nbsp;
				<span className="font-semibold">3</span>
			</p>
			<h1 className="text-3xl font-bold">Welcome back!</h1>
			<h1
				className={`${isEmailSet ? "mb-7" : "mb-3"} text-3xl font-bold`}
			>
				{/* mb-7 */}
				Joining Netflix is easy.
			</h1>

			<Form>
				{isEmailSet && (
					<div>
						<p className="mb-5 text-base sm:text-lg">
							Enter your password and you'll be watching in no
							time.
						</p>
						{action && (
							<Alert
								className="mb-8"
								text={
									(action.errorFromServer &&
										"Unable to login.") ||
									(action.invalidCredentials &&
										"Invalid credentials.")
								}
								type="error"
							/>
						)}
						<div>
							Email
							<br />
							<input
								type="email"
								name="email"
								defaultValue={isEmailSet}
								className="bg-transparent font-semibold"
							/>
						</div>
					</div>
				)}
				{!isEmailSet && (
					<InputBox
						label="Email"
						type="email"
						name="email"
						ref={emailRef}
						value={email}
						className="[&+span.error]:text-red-500 dark:[&>label]:text-zinc-100 dark:[&_input]:bg-zinc-900 dark:[&_input]:text-zinc-100"
						// error={
						// 	validEmail(email) || email.length === 0
						// 		? { isError: false }
						// 		: {
						// 				isError: true,
						// 				color: "#f04f4f",
						// 				message:
						// 					"Please enter a valid email address.",
						// 		  }
						// }
						// sucess={{ isSucess: validEmail(email) }}
						data-errormessage="Please enter a valid email address."
						data-validation={(event) => {
							if (event.target.value.length === 0)
								return "neutral";
							else if (validEmail(event.target.value))
								return "sucess";
							else return "error";
						}}
						onChange={({
							target: { value },
						}: ChangeEvent<HTMLInputElement>) => {
							setEmail(value);
						}}
					/>
				)}
				<InputBox
					label="Password"
					type="password"
					name="password"
					ref={passwordRef}
					value={password}
					className="mt-4 [&+span.error]:text-red-500 dark:[&>label]:text-zinc-100 dark:[&_input]:bg-zinc-900 dark:[&_input]:text-zinc-100"
					data-errormessage="Your password must contain between 6 and 16 characters."
					data-sucessmessage=""
					data-validation={(event) => {
						if (event.target.value.length === 0) return "neutral";
						else if (validPassword(event.target.value))
							return "sucess";
						else return "error";
					}}
					onChange={({
						target: { value },
					}: ChangeEvent<HTMLInputElement>) => {
						setPassword(value);
					}}
					component={
						<span
							className="absolute right-0 top-0 inline-flex h-full cursor-pointer select-none items-center rounded bg-transparent p-3 text-center uppercase text-[#737373]"
							onClick={(event) => {
								if (!passwordRef.current?.inputElement.current)
									return;

								const target = event.target as HTMLSpanElement;

								if (
									passwordRef.current.inputElement.current
										.type === "password"
								) {
									passwordRef.current.inputElement.current.type =
										"text";
									target.innerText = "hide";
								} else {
									passwordRef.current.inputElement.current.type =
										"password";
									target.innerText = "show";
								}
								passwordRef.current.inputElement.current.focus();
							}}
						>
							show
						</span>
					}
				/>

				<a
					href="/signup/"
					onClick={async (event: MouseEvent) => {
						event.preventDefault();
						passwordRef.current?.focus.current();
						emailRef.current?.focus.current();
						if (!validEmail(email)) {
							emailRef.current?.setInputBoxStatus("error");
							return;
						}
						if (!validPassword(password)) {
							passwordRef.current?.setInputBoxStatus("error");
							return;
						}

						setLoading(true);

						try {
							await signIn(email, password);
							setLoading(false);
						} catch {
							setLoading(false);
						}
					}}
					className={`mx-auto mt-5 flex w-full select-none justify-center gap-5 rounded bg-netflix-red py-4 text-center text-2xl font-semibold text-white hover:bg-netflix-red-hover ${
						loading && "pointer-events-none"
					}`}
				>
					{loading && (
						<div className="h-max">
							<div className="aspect-square h-full w-8 animate-spin rounded-full border-4 border-[#ffffff1a] border-l-white"></div>
						</div>
					)}
					<p>{loading || "Next"}</p>
				</a>
			</Form>
		</m.div>
	);
}
