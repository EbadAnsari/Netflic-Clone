interface HeartProps {
	color: string | { r: number; g: number; b: number; a?: number };
}

export default function Heart({ color }: HeartProps) {
	if (typeof color !== "string")
		color = `rgb${color.a ? "a" : ""}(${color.r}, ${color.g}, ${color.b}${
			color.a ? ", " + color.a : ""
		})`;

	return (
		<div className="relative flex aspect-square h-min w-full translate-y-[3px]">
			<div
				style={{
					backgroundColor: color,
				}}
				className="h-1/2 w-1/2 translate-x-[10%] rounded-full"
			></div>
			<div
				style={{
					backgroundColor: color,
				}}
				className="h-1/2 w-1/2 -translate-x-[10%] rounded-full"
			></div>
			<div
				style={{
					backgroundColor: color,
					translate: "0% -14.7%",
				}}
				className="absolute left-1/2 top-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl-full"
			></div>
		</div>
	);
}
