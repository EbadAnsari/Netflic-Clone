import { checkEmail } from "@utils/functions";
import { useInputBox } from "@hooks/InputBox";
import { useLocalStorage } from "@hooks/Storage";
import { signIn } from "@store/slice/SigningSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ActionFunctionArgs, Form, redirect } from "react-router-dom";

export default function SignUp() {
	const local = useLocalStorage();
	const [email, setEmail] = useState(local.get("email"));

	const container = useRef<HTMLDivElement>(null);

	const { focus } = useInputBox(container, email.length !== 0);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(signIn());
	}, []);
	return (
		<section className="grid grid-cols-12">
			<div className="-z-10 col-span-12 col-start-1 row-start-1 w-full justify-center overflow-hidden md:h-[540px] lg:h-[720px]">
				<img
					src="/public/images/banner-image-small.jpg"
					srcSet="/public/images/banner-image-small.jpg 1000w, /public/images/banner-image-medium.jpg 1500w, /public/images/banner-image-large.jpg 1800w"
					className="h-full min-w-[120%] object-cover brightness-[.4]"
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
					<Form method="post" action="/sign/up">
						<p className="text-center text-lg font-normal text-white lg:text-xl">
							Ready to watch? Enter your email to create or
							restart your membership.
						</p>
						<div className="relative mt-4 flex flex-col items-center gap-3 sm:flex-row sm:items-stretch">
							<div
								ref={container}
								data-error-message="Please enter a valid email address."
								className="input-box-container relative w-full cursor-text overflow-hidden rounded-[4px] border-[1px] border-solid border-[#5f5e5e] bg-black bg-opacity-60"
							>
								<input
									type="email"
									name="email"
									required
									value={email}
									onChange={(event) => {
										const { target } = event;
										const { value } = target;

										if (checkEmail(value)) {
											target.parentElement!.style.borderColor =
												"#2bb871";
											target.parentElement?.classList.remove(
												"sign-up-error-message",
											);
										} else if (value.length === 0) {
											target.parentElement!.style.borderColor =
												"#5f5e5e";
											target.parentElement?.classList.remove(
												"sign-up-error-message",
											);
										} else {
											target.parentElement!.style.borderColor =
												"#eb3942";
											target.parentElement?.classList.add(
												"sign-up-error-message",
											);
										}

										setEmail(value);
									}}
									className="input-box w-full bg-transparent pb-1 pl-3 pr-2 pt-5 text-white [&_+_span]:bg-red-500"
								/>
								<label className="input-label absolute left-3 top-1/2 -translate-y-1/2 cursor-text select-none text-[#b9b8b8] transition-all">
									Email Address
								</label>
							</div>
							<input
								type="submit"
								value="Get Started >"
								onClick={focus}
								className="hello cursor-pointer rounded-[4px] bg-[#e50914] px-5 py-3 text-xl font-bold text-white sm:px-7 sm:py-1 sm:text-2xl"
							/>
						</div>
					</Form>
				</div>
			</div>
		</section>
	);
}

export async function SignUpAction({ request }: ActionFunctionArgs) {
	const data = await request.formData();

	const email = data.get("email") as string;

	sessionStorage.setItem("email", email);
	localStorage.setItem("email", email);

	if (checkEmail(email)) return redirect("/sign/in");
}
