import { ReactNode, useState } from "react";

export default function DropDown({
	children,
	title,
}: {
	children: ReactNode;
	title: string;
}) {
	if (!Array.isArray(children))
		throw new Error("Must provide drop down something.");

	const [dropDownState, setDropDownState] = useState(false);

	return (
		<>
			<div
				onClick={() => {
					setDropDownState(!dropDownState);
				}}
				className="flex cursor-pointer select-none items-center gap-x-2 lg:hidden [&>p]:hover:underline"
			>
				<p>{title}</p>
				<img
					src="/public/icons/drop-down-icon.svg"
					className={`${(dropDownState && "rotate-180") || ""}`}
				/>
			</div>
			<div className="drop-down relative text-base">
				<div
					className={`${
						dropDownState ? "scale-100" : "scale-0"
					} absolute -left-1 top-1 flex w-36 origin-[20%_0%] flex-col items-center rounded-md bg-white bg-opacity-20 p-2 text-xs text-zinc-100 backdrop-blur-3xl transition-transform sm:w-48 sm:p-3 sm:text-sm md:rounded-lg lg:static lg:w-auto lg:scale-100 lg:flex-row lg:border-0 lg:bg-transparent lg:px-5 lg:text-base lg:text-white lg:backdrop-blur-0 [&>*]:cursor-pointer hover:[&>*]:underline`}
				>
					{children}
				</div>
			</div>
		</>
	);
}
