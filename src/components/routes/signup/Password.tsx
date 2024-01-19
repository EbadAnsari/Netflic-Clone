import { slideInOut } from "@animation/animate";
import Alert, { AlertInterface } from "@components/Alert";
import InputBox, { InputBoxRef } from "@components/InputBox";
import { signIn, useUser } from "@context/AuthContext";
import {
	checkEmail,
	checkPassword,
	validEmail,
	validPassword,
} from "@utils/functions";
import { FirebaseError } from "firebase/app";
import { motion as m } from "framer-motion";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { ActionFunctionArgs, Form, Navigate, redirect } from "react-router-dom";

export default function Password() {
	const auth = useUser();

	const [email, setEmail] = useState(
		checkEmail(localStorage.getItem("email")),
	);
	const [password, setPassword] = useState(checkPassword(""));

	const [error, setError] = useState<
		| { error: false }
		| { error: true; errorMessage: string; link: AlertInterface["link"] }
	>({ error: false });

	const [loading, setLoading] = useState(false);

	const isEmailSet = checkEmail(localStorage.getItem("email"));

	const passwordRef = useRef<InputBoxRef>(null);
	const emailRef = useRef<InputBoxRef>(null);

	if (auth?.user?.uid) return <Navigate to={"/signup/"} />;

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
				Joining Netflix is easy.
			</h1>

			<Form
				action="/signup/"
				method="post"
				onSubmit={async (event: FormEvent) => {
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
						const result = await signIn(email, password);
						// console.log(result.user.uid);
						setLoading(false);
					} catch (e) {
						if (e instanceof FirebaseError) {
							if (e.code === "auth/email-already-in-use") {
								setError({
									error: true,
									errorMessage: "Email alredy exist.",
									link: {
										linkTo: "/in/login",
										linkMessage: "Login",
									},
								});
							}
							setLoading(false);
						}
					}
				}}
			>
				{isEmailSet && (
					<div>
						<p className="mb-5 text-base sm:text-lg">
							Enter your password and you'll be watching in no
							time.
						</p>
						{error.error && (
							<Alert
								className="mb-8"
								text={error.errorMessage}
								type="error"
								link={error.link}
							/>
						)}
						<div>
							Email
							<br />
							<p className="font-semibold">{isEmailSet}</p>
							<input
								type="hidden"
								name="email"
								defaultValue={isEmailSet}
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
						className="[&+span.error]:text-[#e87c03] dark:[&>label]:text-zinc-100 dark:[&_input]:bg-zinc-900 dark:[&_input]:text-zinc-100"
						errorMessage="Please enter a valid email address."
						validation={(event) => {
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
					className="mt-4 dark:[&>label]:text-zinc-100 dark:[&_input]:bg-zinc-900 dark:[&_input]:text-zinc-100"
					errorMessage="Your password must contain between 6 and 16 characters."
					sucessMessage=""
					validation={(event) => {
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

				<button
					type="submit"
					className={`mx-auto mt-5 flex w-full select-none justify-center gap-5 rounded bg-netflix-red py-4 text-center font-semibold text-white hover:bg-netflix-red-hover ${
						loading && "pointer-events-none"
					}`}
				>
					{loading && (
						<div className="h-max">
							<div className="aspect-square h-full w-6 animate-spin rounded-full border-[3px] border-[#ffffff44] border-l-white"></div>
						</div>
					)}
					{loading || <p>Next</p>}
				</button>
			</Form>
		</m.div>
	);
}

export async function passwordAction({ request }: ActionFunctionArgs) {
	const data = await request.formData();

	const email = data.get("email") as string;

	localStorage.setItem("email", email);

	if (validEmail(email)) {
		return redirect("/signup/password");
	}

	return redirect("/signup/password");
}
