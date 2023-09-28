import { slideInOut } from "@animation/animate";
import InputBox from "@components/InputBox";
import { useLocalStorage, useSession } from "@hooks/Storage";
import {
	checkEmail,
	checkPassword,
	validEmail,
	validPassword,
} from "@utils/functions";
import { motion as m } from "framer-motion";
import { ChangeEvent, MouseEvent, createRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Password() {
	const local = useLocalStorage();
	const session = useSession();

	const [email, setEmail] = useState(checkEmail(local.get("email")));
	const [password, setPassword] = useState(
		checkPassword(local.get("password")),
	);

	const isEmailSet = local.get("email").length != 0;

	const passwordRef = createRef<HTMLInputElement>();
	const emailRef = createRef<HTMLInputElement>();

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

			{isEmailSet && (
				<div>
					<p className="mb-5 text-lg">
						Enter your password and you'll be watching in no time.
					</p>
					<div>
						Email
						<p className="font-semibold">{local.get("email")}</p>
					</div>
				</div>
			)}
			<div>
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

				<Link
					to={"/signup/"}
					onClick={(event: MouseEvent) => {
						if (!validEmail(email)) {
							emailRef.current?.focus();
							event.preventDefault();
							return;
						}
						if (!validPassword(password)) {
							passwordRef.current?.focus();
							event.preventDefault();
							return;
						}

						local.set("email", email);
						local.set("password", password);

						session.set("email", email);
						session.set("password", password);
					}}
					className="mx-auto mt-5 block w-full select-none rounded bg-netflix-red py-4 text-center text-2xl font-semibold text-white hover:bg-netflix-red-hover"
				>
					Next
				</Link>
			</div>
		</m.div>
	);
}
