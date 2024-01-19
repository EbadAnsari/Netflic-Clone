import { slideInOut } from "@animation/animate";
import { signIn } from "@context/AuthContext";
import { ActionReturn } from "@interfaces/interface";
import { auth } from "@utils/firebase-config";
import { validEmail, validPassword } from "@utils/functions";
import { FirebaseError } from "firebase/app";
import { motion as m } from "framer-motion";
import { ActionFunctionArgs, Link } from "react-router-dom";

export default function SignUpHome() {
	return (
		<m.div
			{...slideInOut}
			className="mx-auto my-20 flex w-80 flex-col items-center"
		>
			<div className="mx-auto w-fit rounded-full border-[3px] border-netflix-red p-2">
				<img
					src="/public/icons/checkbox-tick.svg"
					className="w-6 select-none"
				/>
			</div>
			<p className="mt-5 text-xs uppercase">
				Step&nbsp;<span className="font-semibold">2</span>
				&nbsp;of&nbsp;
				<span className="font-semibold">3</span>
			</p>
			<h2 className="text-3xl font-semibold">Choose your plan.</h2>

			<div className="mt-6 flex flex-col gap-5">
				<div className="flex gap-2 text-lg">
					<img
						src="/public/icons/checkbox-tick.svg"
						className="w-7 rotate-12 select-none p-1"
					/>
					No commitments, cancel anytime.
				</div>
				<div className="flex gap-2 text-lg">
					<img
						src="/public/icons/checkbox-tick.svg"
						className="w-7 rotate-12 select-none p-1"
					/>
					Everything on Netflix for one low price.
				</div>
				<div className="flex gap-2 text-lg">
					<img
						src="/public/icons/checkbox-tick.svg"
						className="w-7 rotate-12 select-none p-1"
					/>
					No ads and no extra fees. Ever.
				</div>
			</div>

			<Link
				to="/signup/planform"
				className="mt-10 w-full select-none rounded bg-netflix-red px-12 py-4 text-center text-2xl text-white hover:bg-netflix-red-hover"
			>
				Next
			</Link>
		</m.div>
	);
}
