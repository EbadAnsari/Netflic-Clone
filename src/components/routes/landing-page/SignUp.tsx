import InputBox from "@components/InputBox";
import { useAuth } from "@context/AuthContext";
import { useInputRef } from "@hooks/InputBox";
import { signIn } from "@store/slice/SigningSlice";
import { validEmail } from "@utils/functions";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

export default function SignUp() {
	const auth = useAuth();

	const emal = auth?.user?.email ?? "";

	const [email, setEmail] = useState("");
	// auth?.user && auth.user.email ? auth.user?.email : "",

	const { focus } = useInputRef(email?.length !== 0);

	const dispatch = useDispatch();

	useEffect(() => {
		if (validEmail(email)) {
			focus.current();
		}

		dispatch(signIn());

		if (auth?.user?.email) {
			setEmail(auth.user.email);
		}
	}, [auth]);

	if (auth?.userInfo?.isPaid) {
		return <Navigate to={"/"} />;
	}

	return (
		<section className="grid grid-cols-12">
			<div className="-z-10 col-span-12 col-start-1 row-start-1 w-full justify-center overflow-hidden md:h-[540px] lg:h-[720px]">
				<img
					src="/public/images/banner-image-small.jpg"
					srcSet="/public/images/banner-image-small.jpg 1000w, /public/images/banner-image-medium.jpg 1500w, /public/images/banner-image-large.jpg 1800w"
					className="h-full min-w-[120%] select-none object-cover brightness-[.4]"
				/>
			</div>

			<div className="col-span-12 col-start-1 row-start-1 mx-auto my-auto mt-24 w-[calc(100%_-_4rem)] py-8 sm:w-fit md:py-28 lg:py-48">
				<div className="flex flex-col gap-y-6">
					<h1 className="text-center text-3xl font-black text-white lg:text-5xl">
						Unlimited movies, TV shows and more
					</h1>
					<p className="text-center text-lg text-white lg:text-2xl">
						Watch anywhere. Cancel anytime.
					</p>
				</div>
				<div className="mt-6 lg:px-44">
					<p className="text-center text-lg font-normal text-white lg:text-xl">
						Ready to watch? Enter your email to create or restart
						your membership.
					</p>
					<div
						// action={auth?.user?.email ? "/signup/planform" : "/in"}
						// method="POST"
						// onSubmit={(event) => {
						// 	if (!validEmail(email)) {
						// 		event.preventDefault();
						// 	}
						// }}
						className="relative mt-4 flex flex-col items-center gap-3 sm:flex-row sm:items-stretch"
					>
						{!auth?.user?.email && (
							<InputBox
								autoComplete="email"
								type="email"
								name="email"
								required
								value={email}
								className="rounded-md [&+label]:text-[#8c8c8c] [&>*]:rounded-md [&>input]:bg-slate-950 [&>input]:bg-opacity-40 [&>input]:text-white [&>label]:font-semibold [&>label]:text-[#b3b3b3]"
								label="Email address"
								sucess={{ isSucess: validEmail(email) }}
								onChange={({
									target: { value },
								}: ChangeEvent<HTMLInputElement>) => {
									setEmail(value);
								}}
								error={
									validEmail(email) || email.length === 0
										? { isError: false }
										: {
												isError: true,
												message:
													"Please enter a valid email address.",
										  }
								}
							/>
						)}
						<a
							href={
								auth?.user
									? "/signup/planform"
									: "/signup/password"
							}
							className={`h-fit cursor-pointer whitespace-nowrap rounded-[4px] bg-[#e50914] px-5 py-3 text-lg font-semibold text-white sm:px-7 sm:text-2xl ${
								auth?.user?.email && "mx-auto text-center"
							}`}
							onClick={(event) => {
								if (!validEmail(email)) event.preventDefault();

								localStorage.setItem("email", email);
							}}
						>
							{auth?.user?.email
								? "Finish Signup >"
								: "Get Started >"}
							{/* Get Stated &gt; */}
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
