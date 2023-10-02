import { slideInOut } from "@animation/animate";
import Alert from "@components/Alert";
import InputBox from "@components/InputBox";
import { useLocalStorage, useSession } from "@hooks/Storage";
import { CredentialError } from "@interfaces/interface";
import { getRememberMe, setRememberMe } from "@utils/RememberMe";
import {
	checkEmail,
	checkPassword,
	validEmail,
	validPassword,
} from "@utils/functions";
import { motion as m } from "framer-motion";
import { ChangeEvent, MouseEvent, createRef, useState } from "react";
import {
	ActionFunctionArgs,
	Form,
	redirect,
	useActionData,
} from "react-router-dom";

export default function Password() {
	const local = useLocalStorage();
	const session = useSession();

	const [email, setEmail] = useState(checkEmail(getRememberMe("email")));
	const [password, setPassword] = useState(
		checkPassword(getRememberMe("password")),
	);

	const isEmailSet = getRememberMe("email");

	const passwordRef = createRef<HTMLInputElement>();
	const emailRef = createRef<HTMLInputElement>();

	const action = useActionData() as CredentialError;

	return (
		<m.div
			{...slideInOut}
			className="mx-auto my-20 flex w-[clamp(15rem,90%,25rem)] flex-col"
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

			<Form action="/signup/password" method="POST">
				{isEmailSet && (
					<div>
						<p className="mb-5 text-lg">
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
						error={
							validEmail(email) || email.length === 0
								? { isError: false }
								: {
										isError: true,
										color: "#f04f4f",
										message:
											"Please enter a valid email address.",
								  }
						}
						sucess={{ isSucess: validEmail(email) }}
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
					onSubmit={() => {
						console.log("hello");
					}}
					className="mt-4 [&+span.error]:text-red-500 dark:[&>label]:text-zinc-100 dark:[&_input]:bg-zinc-900 dark:[&_input]:text-zinc-100"
					error={
						validPassword(password) || password.length === 0
							? { isError: false }
							: {
									isError: true,
									color: "#f04f4f",
									message:
										"Your password must contain between 6 and 16 characters.",
							  }
					}
					sucess={{ isSucess: validPassword(password) }}
					onChange={({
						target: { value },
					}: ChangeEvent<HTMLInputElement>) => {
						setPassword(value);
					}}
					component={
						<span
							className="absolute right-0 top-0 inline-flex h-full cursor-pointer select-none items-center rounded bg-transparent p-3 text-center uppercase text-[#737373]"
							onClick={(event) => {
								if (passwordRef.current === null) return;

								const target = event.target as HTMLSpanElement;

								if (passwordRef.current.type === "password") {
									passwordRef.current.type = "text";
									target.innerText = "hide";
								} else {
									passwordRef.current.type = "password";
									target.innerText = "show";
								}
							}}
						>
							show
						</span>
					}
				/>

				<button
					type="submit"
					onClick={(event: MouseEvent) => {
						if (!validEmail(email) || !validPassword(password)) {
							event.preventDefault();
							passwordRef.current?.focus();
							emailRef.current?.focus();
						} else {
							setRememberMe("email", email);
							setRememberMe("password", password);
						}
					}}
					className="mx-auto mt-5 block w-full select-none rounded bg-netflix-red py-4 text-center text-2xl font-semibold text-white hover:bg-netflix-red-hover"
				>
					Next
				</button>
			</Form>
		</m.div>
	);
}
export async function PasswordAction({
	request,
}: ActionFunctionArgs): Promise<CredentialError | Response> {
	const data = await request.formData();

	const email = data.get("email") as string;
	const password = data.get("password") as string;

	try {
		// await login(email, password);
		console.log({ email, password });
		return redirect("/signup/");
	} catch {
		return { invalidCredentials: true };
	}
}
