import Alert, { AlertInterface } from "@components/Alert";
import InputBox, { InputBoxRef, PasswordShowHide } from "@components/InputBox";
import { useUser } from "@context/UserContext";
import { useCheckBox } from "@hooks/CheckBox";
import { signUp } from "@store/slice/SigningSlice";
import {
	checkEmail,
	titleCase,
	validEmail,
	validPassword,
} from "@utils/functions";
import { FirebaseError } from "firebase/app";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Login() {
	const user = useUser();

	const [email, setEmail] = useState(checkEmail(user?.user?.email));
	const [password, setPassword] = useState("");

	const emailRef = useRef<InputBoxRef>(null);
	const passwordRef = useRef<InputBoxRef>(null);

	const { checkBox, checked } = useCheckBox(true);

	const dispatch = useDispatch();

	const [error, setError] = useState<
		| { error: false }
		| { error: true; errorMessage: string; link?: AlertInterface["link"] }
	>({ error: false });

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (user?.user?.email) setEmail(user.user.email);
		dispatch(signUp());
	}, [user]);

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
				<div
				// method={auth ? "GET" : "POST"}
				// action={auth ? "/" : "/in/login"}
				>
					{error.error && (
						<Alert
							className="mb-4"
							text={error.errorMessage}
							type="error"
						/>
					)}
					<InputBox
						label="Email"
						type="email"
						name="email"
						value={email}
						ref={emailRef}
						focused={user?.user?.email?.length !== 0 || undefined}
						className="bg-[#333] [&>input]:border-0 [&>input]:bg-[#333] [&>input]:text-white [&>label]:text-[#b3b3b3]"
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
					<InputBox
						label="Password"
						type="password"
						name="password"
						ref={passwordRef}
						value={password}
						className="mt-4 bg-[#333] [&>input]:border-0 [&>input]:bg-[#333] [&>input]:text-white [&>label]:text-[#b3b3b3]"
						errorMessage="Your password must contain between 6 and 16 characters."
						validation={(event) => {
							if (event.target.value.length === 0)
								return "neutral";
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
							<PasswordShowHide
								passwordElement={
									passwordRef.current?.inputElement.current
								}
							/>
						}
					/>

					<Link
						to="/"
						type="submit"
						onClick={async (event) => {
							event.preventDefault();
							if (
								!(validEmail(email) && validPassword(password))
							) {
								passwordRef.current?.setInputBoxStatus("error");
								return;
							}
							setLoading(true);

							try {
								const result = await user?.login(
									email,
									password,
								);
								setError({
									error: false,
								});

								console.log(result.user.uid);
							} catch (e) {
								if (e instanceof FirebaseError) {
									console.log(e.code);
									const match = e.code.match(
										/auth\/([\w-]*)/,
									) as ["auth", string];

									const errorMessage = titleCase(
										match[1].replace(/-/g, " "),
									);
									if (
										e.code ===
										"auth/invalid-login-credentials"
									) {
										setError({
											error: true,
											errorMessage,
										});
									}
								}
							}
							setLoading(false);
						}}
						className={`mt-8 flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded bg-[#e50914] p-4 py-3 font-medium text-white transition-all ${
							loading && "pointer-events-none"
						}`}
					>
						{loading && (
							<div className="h-max">
								<div className="aspect-square h-full w-6 animate-spin rounded-full border-[3px] border-[#ffffff44] border-l-white"></div>
							</div>
						)}
						{loading || <p>Sign In</p>}
					</Link>
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
						<label className="cursor-pointer text-xs text-[#b3b3b3]">
							Need Help?
						</label>
					</div>
				</div>
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
