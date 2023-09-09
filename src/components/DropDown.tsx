import { ReactNode, useState } from "react";

export default function DropDown({ children }: { children: ReactNode }) {
	if (!Array.isArray(children))
		throw new Error("Must provide drop down options.");

	const [dropDownState, setDropDownState] = useState(false);

	return (
		<>
			<div
				onClick={() => {
					setDropDownState(!dropDownState);
				}}
				className="flex cursor-pointer select-none items-center gap-x-2 lg:hidden"
			>
				<p>Browse</p>
				<img
					src="/public/icons/drop-down-icon.svg"
					className={(dropDownState && "rotate-180") || ""}
					alt=""
				/>
			</div>
			<div className="drop-down relative text-base">
				<div
					className={`${
						dropDownState ? "flex" : "hidden"
					} absolute top-2 w-56 flex-col items-center gap-x-6 gap-y-4 border border-[#1f2937] bg-black px-3 py-5 lg:static lg:flex lg:w-auto lg:flex-row lg:border-0 lg:bg-transparent [&>*]:cursor-pointer hover:[&>*]:underline`}
				>
					{children}
				</div>
			</div>
		</>
	);
}
