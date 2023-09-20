import { slideInOut } from "@animation/animate";
import { useSession } from "@hooks/Storage";
import { motion as m } from "framer-motion";
import { Link, Navigate } from "react-router-dom";

export default function SignUpHome() {
	const session = useSession();

	if (!session.get("password")) {
		return <Navigate to={"/signup/password"} />;
	}
	return (
		<m.div
			variants={slideInOut}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{
				duration: 0.4,
				delay: 0.1,
			}}
			className="mx-auto my-20 flex w-80 flex-col items-center"
		>
			<div className="mx-auto w-fit rounded-full border-[3px] border-netflix-red p-2">
				<img
					src="/public/icons/checkbox-tick.svg"
					className="w-6 select-none"
					alt=""
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
						alt=""
					/>
					No commitments, cancel anytime.
				</div>
				<div className="flex gap-2 text-lg">
					<img
						src="/public/icons/checkbox-tick.svg"
						className="w-7 rotate-12 select-none p-1"
						alt=""
					/>
					Everything on Netflix for one low price.
				</div>
				<div className="flex gap-2 text-lg">
					<img
						src="/public/icons/checkbox-tick.svg"
						className="w-7 rotate-12 select-none p-1"
						alt=""
					/>
					No ads and no extra fees. Ever.
				</div>
			</div>

			<Link
				to="planform"
				className="mt-10 w-full select-none rounded bg-netflix-red px-12 py-4 text-center text-2xl text-white hover:bg-netflix-red-hover"
			>
				Next
			</Link>
		</m.div>
	);
}
