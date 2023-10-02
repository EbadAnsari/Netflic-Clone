import { slideInOut } from "@animation/animate";
import { login } from "@context/AuthContext";
import { CredentialError } from "@interfaces/interface";
import { getRememberMe } from "@utils/RememberMe";
import { validEmail, validPassword } from "@utils/functions";
import { motion as m } from "framer-motion";
import { useState } from "react";
import {
	ActionFunctionArgs,
	Form,
	redirect,
	useNavigate,
} from "react-router-dom";

const plans = [
	{
		type: "premium",
		price: "646",
		curr: "₹",
		duration: "mo.",
		description: [
			"Our best video quality in 4K and HDR",
			"Watch on your TV, computer, mobile phone and tablet",
			"Downloads available",
		],
	},
	{
		type: "standard",
		price: "499",
		curr: "₹",
		duration: "mo.",
		description: [
			"Great video quality in 1080p",
			"Watch on your TV, computer, mobile phone and tablet",
			"Downloads available",
		],
	},
	{
		type: "basic",
		price: "199",
		curr: "₹",
		duration: "mo.",
		description: [
			"Great video quality in 720p",
			"Watch on your TV, computer, mobile phone and tablet",
			"Downloads available",
		],
	},
	{
		type: "mobile",
		price: "149",
		curr: "₹",
		duration: "mo.",
		description: [
			"Great video quality in 480p",
			"Watch on your TV, computer, mobile phone and tablet",
			"Downloads available",
		],
	},
];

export default function PlanForm() {
	const [selectedPlan, setPlan] = useState(0);
	const navigate = useNavigate();

	return (
		<m.div
			{...slideInOut}
			key={location.pathname}
			className="mx-auto my-16 w-80 sm:w-[35rem] lg:w-[58rem] xl:w-[65rem]"
		>
			<p className="text-xs uppercase">
				Step&nbsp;<span className="font-semibold">3</span>
				&nbsp;of&nbsp;
				<span className="font-semibold">3</span>
			</p>
			<h2 className="text-3xl font-bold">
				Choose the plan that's right for you
			</h2>

			<div className="mt-6 flex flex-col gap-1">
				<div className="flex gap-2 text-lg">
					<img
						src="/public/icons/checkbox-tick.svg"
						className="w-7 rotate-12 select-none p-1"
						alt=""
					/>
					Watch all you want. Ad-free.
				</div>
				<div className="flex gap-2 text-lg">
					<img
						src="/public/icons/checkbox-tick.svg"
						className="w-7 rotate-12 select-none p-1"
						alt=""
					/>
					Recommendations just for you.
				</div>
				<div className="flex gap-2 text-lg">
					<img
						src="/public/icons/checkbox-tick.svg"
						className="w-7 rotate-12 select-none p-1"
						alt=""
					/>
					Change or cancel your plan anytime.
				</div>
			</div>
			<Form action="/signup/planform" method="POST">
				<div className="plan-container my-6 flex grid-cols-4 flex-col gap-3 lg:grid">
					{plans.map(
						(
							{ curr, description, duration, price, type },
							index,
						) => {
							return (
								<div
									onClick={() => {
										setPlan(index);
									}}
									key={type + price}
									className={`cursor-pointer overflow-hidden rounded-xl border border-[rgba(128,128,128,0.4)] ${
										selectedPlan === index &&
										"type shadow-[rgba(0,0,0,0.1)_0px_0px_2px,rgba(0,0,0,0.1)_0px_4px_8px]"
									}`}
								>
									{selectedPlan === index && (
										<input
											type="number"
											className="hidden"
											name="planform"
											defaultValue={selectedPlan}
										/>
									)}
									<div
										className={`flex items-center justify-between px-4 py-3 text-lg font-semibold lg:justify-normal ${
											selectedPlan === index ? type : ""
										}`}
									>
										<div className="flex">
											{selectedPlan === index ? (
												<img
													src="/public/icons/tick.svg"
													className=""
												/>
											) : null}
											<p className="font-semibold capitalize lg:hidden">
												{type}
											</p>
										</div>
										<div className="">
											<p className="hidden font-semibold capitalize lg:block">
												{type}
											</p>
											<p className="text-base font-medium">
												{curr}
												{price}/{duration}
											</p>
										</div>
									</div>
									<ul className="list-item list-disc space-y-2 pb-4 pl-8 pr-6 pt-3 text-sm">
										{description.map((desc) => {
											return (
												<li
													key={desc.length}
													className="marker"
												>
													{desc}
												</li>
											);
										})}
									</ul>
								</div>
							);
						},
					)}
				</div>

				<div className="family text-xs font-medium text-zinc-500 dark:text-zinc-100 [&_p]:my-2 [&_p]:px-1">
					<p>
						HD (720p), Full HD (1080p), Ultra HD (4K) and HDR
						availability subject to your internet service and device
						capabilities. Not all content is available in all
						resolutions. See our
						<span className="cursor-pointer px-1 text-blue-500 hover:underline">
							Terms of Use
						</span>
						for more details.
					</p>
					<p>
						Only people who live with you may use your account.
						Watch on 4 different devices at the same time with
						Premium, 2 with Standard, and 1 with Basic and Mobile.
					</p>
				</div>

				<button
					type="submit"
					className="mx-auto mt-5 block w-[min(28rem,100%)] rounded bg-netflix-red py-5 text-2xl font-semibold text-white hover:bg-netflix-red-hover"
				>
					Next
				</button>
			</Form>
		</m.div>
	);
}

export async function PlanFormAction({
	request,
}: ActionFunctionArgs): Promise<CredentialError | Response> {
	const data = await request.formData();

	const email = getRememberMe("email");
	const password = getRememberMe("password");

	const planform = data.get("planform") as string;

	console.log({ email, password, planform });

	if (!(validEmail(email) && validPassword(password))) {
		return { invalidCredentials: true };
	}

	try {
		// await login(email, password);
		return redirect("/");
	} catch {
		redirect("/signup/password");
		return { errorFromServer: true };
	}
}