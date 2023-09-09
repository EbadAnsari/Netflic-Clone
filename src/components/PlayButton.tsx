import { MouseEventHandler } from "react";

export default function PlayButton({
	icon,
	text,
	onClick,
	className,
}: {
	icon: string;
	text: string;
	onClick?: Function;
	className?: string;
}) {
	return (
		<button
			onClick={(event) => {
				onClick?.(event);
			}}
			className={`flex h-fit w-fit items-center justify-center rounded-sm bg-white px-2 py-1 md:rounded-md md:px-4 md:py-2 ${className}`}
		>
			<div className="w-4 md:w-7">
				<img src={icon} />
			</div>
			<p className="w-max text-center text-xs md:text-base">{text}</p>
		</button>
	);
}
