import { ReactNode } from "react";

export default function ImageButton({
	icon,
	text,
	onClick,
	className,
}: {
	icon: string | ReactNode;
	text: string;
	onClick?: Function;
	className?: string;
}) {
	return (
		<div
			onClick={(event) => {
				onClick?.(event);
			}}
			className={`flex h-fit w-fit cursor-pointer items-center justify-center rounded bg-white px-2 py-2 text-black sm:rounded-md sm:px-4 ${className}`}
		>
			<div className="w-5 sm:w-7 md:w-9">
				{typeof icon === "string" ? <img src={icon} /> : icon}
			</div>
			<p className="mx-1 w-max select-none text-center text-sm sm:mx-2 sm:text-base md:text-xl">
				{text}
			</p>
		</div>
	);
}
