import { useCheckBox } from "@hooks/CheckBox";
import { useInputBox } from "@hooks/InputBox";
import {
	CredentialError,
	InputError,
	LoadingState,
} from "@interfaces/interface";
import { signUp } from "@store/slice/SigningSlice";
import { checkEmail, checkPassword } from "@utils/functions";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	ActionFunctionArgs,
	Form,
	redirect,
	useActionData,
} from "react-router-dom";

export default function SignIn() {
	const [email, setEmail] = useState(
		checkEmail(localStorage.getItem("email")),
	);
	const [password, setPassword] = useState(
		checkPassword(localStorage.getItem("password")),
	);

	const emailInputBox = useRef<HTMLDivElement>(null);
	const passwordInputBox = useRef<HTMLDivElement>(null);
	const { focus: emailFocus, leave: emailLeave } = useInputBox(emailInputBox);
	const { focus: passwordFocus, leave: passwordLeave } =
		useInputBox(passwordInputBox);

	const checkBox = useRef<HTMLLabelElement>(null);
	const value = useCheckBox(checkBox);

	const action = useActionData() as InputError & CredentialError;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(signUp());
	}, []);

	return (
		<>
			<div className="absolute top-0 -z-20 col-span-12 col-start-1 row-start-1 w-full justify-center overflow-hidden">
				<img
					src="/public/images/banner-image-small.jpg"
					srcSet="/public/images/banner-image-small.jpg 1000w, /public/images/banner-image-medium.jpg 1500w, /public/images/banner-image-large.jpg 1800w"
					className="hidden min-w-[120rem] object-cover brightness-[.4] md:block"
				/>
			</div>

			<div className="signin-body z-20 mx-auto flex w-full flex-col bg-black px-6 pt-24 md:my-20 md:mt-24 md:w-[450px] md:bg-opacity-75 md:px-16 md:py-10">
				<h1 className="mb-7 text-3xl font-bold text-white">Sign In</h1>
				<Form method="POST" action="/sign/in">
					<div
						ref={emailInputBox}
						className={`input-box-container ${
							action?.emailErrorCheck && "sign-in-error-input"
						} relative w-full rounded border-b-2 bg-[#333] [&_input]:bg-[#333]`}
					>
						<input
							onFocus={() => {
								emailFocus();
								passwordLeave();
							}}
							required
							value={email}
							onChange={(event) => {
								const { value } =
									event.target as HTMLInputElement;

								setEmail(value);

								emailInputBox.current?.classList.toggle(
									"sign-in-error-input",
									!checkEmail(value).length,
								);
							}}
							type="email"
							name="email"
							className="input-box h-12 w-full rounded px-5 pt-4 text-base text-white"
						/>
						<label
							htmlFor="email"
							className={`input-label ${
								checkEmail(email) && "input-email-focus"
							} absolute left-5 top-1/2 -translate-y-1/2 cursor-text select-none text-[#8c8c8c] transition-all`}
						>
							Email
						</label>
					</div>
					<span className="error hidden">
						Please enter a valid email address.
					</span>
					<div
						ref={passwordInputBox}
						className={`input-box-container ${
							action?.passwordErrorCheck && "sign-in-error-input"
						} relative mt-4 w-full rounded border-b-2 bg-[#333] [&_input]:bg-[#333]`}
					>
						<input
							onFocus={() => {
								passwordFocus();
								emailLeave();
							}}
							required
							value={password}
							onChange={(event) => {
								const { value } =
									event.target as HTMLInputElement;

								setPassword(value);

								passwordInputBox.current?.classList.toggle(
									"sign-in-error-input",
									!checkPassword(value).length,
								);
							}}
							type="password"
							name="password"
							className="input-box h-12 w-full rounded px-5 pt-4 text-base text-white"
						/>
						<label
							htmlFor="password"
							className={`input-label ${
								checkPassword(password) && "input-email-focus"
							} absolute left-5 top-1/2 -translate-y-1/2 cursor-text select-none text-[#8c8c8c] transition-all`}
						>
							Password
						</label>
						<span
							className="absolute right-0 h-full cursor-pointer select-none rounded bg-inherit p-3 uppercase text-[#737373]"
							onClick={(event) => {
								const target = event.target as HTMLSpanElement;
								const input = target.previousSibling
									?.previousSibling as HTMLInputElement;

								if (input.type === "password") {
									input.type = "text";
									target.innerText = "hide";
								} else {
									input.type = "password";
									target.innerText = "show";
								}
							}}
						>
							show
						</span>
					</div>
					<span className="error hidden">
						Your password must contain between 6 and 16 characters.
					</span>
					<input
						value="Sign In"
						type="submit"
						className="mt-8 flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded bg-[#e50914] p-4 py-3 text-[16px] font-medium text-white transition-all"
					/>
					<div className="mt-4 flex justify-between">
						<label
							ref={checkBox}
							onClick={() => {
								(
									checkBox.current
										?.nextElementSibling as HTMLInputElement
								).value = value() ? "1" : "0";
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
							Already have account?
						</label>
						&nbsp;
						<a className="cursor-pointer text-white hover:underline">
							Login
						</a>
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
}: ActionFunctionArgs): Promise<InputError | CredentialError | Response> {
	const data = await request.formData();

	const email = data.get("email") as string;
	const password = data.get("password") as string;
	const rememberMe = !!parseInt(data.get("set-session") as string);
	const isAuthenticated = true;

	// await sleep(2000);

	if (rememberMe) {
		localStorage.setItem("email", email);
		localStorage.setItem("password", password);
	} else localStorage.clear();

	const emailErrorCheck = !(email && checkEmail(email));
	const passwordErrorCheck = !(password && checkPassword(password));

	if (emailErrorCheck || passwordErrorCheck) {
		redirect("/sign/in");
		return {
			emailErrorCheck,
			passwordErrorCheck,
		};
	}

	if (!isAuthenticated) {
		redirect("/sign/in");
		return { invalidCredentials: false };
	}

	sessionStorage.setItem("email", email);
	sessionStorage.setItem("password", password);

	return redirect("/");
}
