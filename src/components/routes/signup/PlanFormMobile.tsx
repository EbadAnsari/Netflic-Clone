import { PlanInterface } from "@interfaces/interface";
import { motion as m } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

export default function PlanFormMobile({
	plans,
	selectedPlan,
	setPlan,
}: {
	plans: PlanInterface[];
	selectedPlan: number;
	setPlan: Dispatch<SetStateAction<number>>;
}) {
	const ref = [
		useRef<HTMLDivElement>(null),
		useRef<HTMLDivElement>(null),
		useRef<HTMLDivElement>(null),
		useRef<HTMLDivElement>(null),
	];

	useEffect(() => {}, [ref]);

	return (
		<div className="plan-container mx-auto my-6 flex flex-col gap-3">
			PlanFormMobile mounted
			<m.div className="scrollbar-none relative mx-auto flex h-40 w-full snap-x snap-mandatory gap-6 overflow-x-auto p-6">
				{plans.map(
					(
						{
							currencyType,
							description,
							duration,
							planType,
							price,
							resolution,
						},
						index,
					) => (
						<div
							className="type absolute left-0 snap-center"
							key={index}
							ref={ref[index]}
							onClick={() => {
								setPlan(index);
							}}
							style={{
								translate: index * 140 + "%",
							}}
						>
							<div
								className={`${planType} aspect-[16/9] w-44 rounded-xl p-4 capitalize ${
									index === selectedPlan && "mx-7 scale-125"
								}`}
							>
								<p className="font-semibold">{planType}</p>
								<p className="">{resolution}</p>
							</div>
						</div>
					),
				)}
			</m.div>
		</div>
	);
}
