import Alert from "@components/Alert";
import InputBox from "@components/InputBox";
import { login } from "@context/AuthContext";
import { useCheckBox } from "@hooks/CheckBox";
import { CredentialError } from "@interfaces/interface";
import { signUp } from "@store/slice/SigningSlice";
import { RememberMeValues, getRememberMe } from "@utils/RememberMe";
import {
	checkEmail,
	checkPassword,
	validEmail,
	validPassword,
} from "@utils/functions";
import { ChangeEvent, createRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	ActionFunctionArgs,
	Form,
	Link,
	redirect,
	useActionData,
	useNavigate,
} from "react-router-dom";

export default function SignIn() {
	const [email, setEmail] = useState(
		checkEmail(getRememberMe(RememberMeValues.email)),
	);

	const [password, setPassword] = useState(
		checkPassword(getRememberMe(RememberMeValues.password)),
	);

	const passwordRef = createRef<HTMLInputElement>();

	const { checkBox, checked } = useCheckBox(true);

	const dispatch = useDispatch();

	const action = useActionData() as CredentialError;

	useEffect(() => {
		dispatch(signUp());
	}, []);

	return (
		<>
			<div className="absolute top-0 -z-20 col-span-12 col-start-1 row-start-1 w-full justify-center overflow-hidden">
				<img
					src="/public/images/banner-image-small.jpg"
					srcSet="/public/images/banner-image-small.jpg 1000w, /public/images/banner-image-medium.jpg 1500w, /public/images/banner-image-large.jpg 1800w"
					className="hidden min-w-[120rem] select-none object-cover brightness-[.4] md:block"
				/>
			</div>

			<div className="signin-body z-20 mx-auto flex w-full flex-col bg-black px-6 pt-24 md:my-20 md:mt-24 md:w-[450px] md:bg-opacity-75 md:px-16 md:py-10">
				<h1 className="mb-7 text-3xl font-bold text-white">Sign In</h1>
				<Form method="POST" action="/in/login">
					{action && (
						<Alert
							className="mb-4"
							text="Invalid Credential."
							type="error"
						/>
					)}
					<InputBox
						label="Email"
						type="email"
						name="email"
						value={email}
						className="bg-[#333] [&>input]:border-0 [&>input]:bg-[#333] [&>input]:text-white [&>label]:text-[#b3b3b3]"
						error={
							validEmail(email) || email.length === 0
								? { isError: false }
								: {
										isError: true,
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
					<InputBox
						label="Password"
						type="password"
						name="password"
						ref={passwordRef}
						value={password}
						className="mt-4 bg-[#333] [&>input]:border-0 [&>input]:bg-[#333] [&>input]:text-white [&>label]:text-[#b3b3b3]"
						error={
							validPassword(password) || password.length === 0
								? { isError: false }
								: {
										isError: true,
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

									const target =
										event.target as HTMLSpanElement;

									if (
										passwordRef.current.type === "password"
									) {
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

					<input
						value="Sign In"
						type="submit"
						onClick={(event) => {
							if (
								!validEmail(getRememberMe("email")) &&
								validPassword(getRememberMe("password"))
							) {
								event.preventDefault();
								// 	try {
								// 		console.log(await login(email, password));
								// 		navigate("/");
								// 	} catch {
								// 		navigate("/in/login");
								// 	}
								// } else {
								// 	setError(true);
							}
						}}
						className="mt-8 flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded bg-[#e50914] p-4 py-3 text-[16px] font-medium text-white transition-all"
					/>
					<div className="mt-4 flex justify-between">
						<label
							ref={checkBox}
							onClick={() => {
								(
									checkBox.current
										?.nextElementSibling as HTMLInputElement
								).value = checked() ? "1" : "0";
							}}
						>
							Remember Me
						</label>
						<input
							type="text"
							className="hidden"
							name="set-session"
						/>
						<label className="cursor-pointer text-xs text-[#b3b3b3]">
							Need Help?
						</label>
					</div>
				</Form>
				<div className="my-10">
					<p>
						<label className="text-[#737373]">
							New to Netflix?
						</label>
						&nbsp;
						<Link
							to={"/in"}
							className="cursor-pointer text-white hover:underline"
						>
							Sign up now
						</Link>
						<span className="cursor-pointer text-white">.</span>
					</p>
					<p className="my-3 text-xs text-[#8c8c8c]">
						This page is protected by Google reCAPTCHA to ensure
						you're not a bot.
					</p>
				</div>
			</div>
		</>
	);
}

export async function SignInAction({
	request,
}: ActionFunctionArgs): Promise<CredentialError | Response> {
	const data = await request.formData();

	const email = data.get("email") as string;
	const password = data.get("password") as string;

	console.log("asdfs");

	try {
		await login(email, password);
		return redirect("/");
	} catch {
		return { invalidCredentials: true };
	}
}