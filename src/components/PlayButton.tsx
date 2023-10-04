export default function ImageButton({
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
		<div
			onClick={(event) => {
				onClick?.(event);
			}}
			className={`flex h-fit w-fit items-center justify-center rounded bg-white px-2 py-2 sm:rounded-md sm:px-4 ${className}`}
		>
			<div className="w-4 sm:w-7 md:w-9">
				<img src={icon} />
			</div>
			<p className="mx-2 w-max text-center text-sm sm:text-base md:text-xl">
				{text}
			</p>
		</div>
	);
}
