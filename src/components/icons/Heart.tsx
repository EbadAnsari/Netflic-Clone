interface HeartProps {
	liked?: boolean;
	shatter?: boolean;
}

export default function Heart({ liked, shatter }: HeartProps) {
	return (
		<svg x="0px" y="0px" viewBox="0 0 1000 1000">
			{/* transform: rotate(-2deg); transform-origin: 50% 84%; */}
			<path
				className={`origin-[50%_84%] ${
					shatter ? "-rotate-2" : "rotate-1"
				} ${liked ? "fill-netflix-red" : "fill-zinc-400"}`}
				d="M464.3,577.9l35.6,273.5l-0.1-0.1l-0.1-0.1L166.5,518.1c-84.6-84.5-84.6-221.6,0-306.2
	c42.3-42.3,97.7-63.4,153.1-63.4c55.4,0,110.8,21.1,153.1,63.4l27.3,27.3l-0.1,0l35.7,159.2L464.3,577.9L464.3,577.9z"
			/>
			<path
				className={`origin-[50%_84%] ${
					shatter ? "rotate-2" : "-rotate-1"
				} ${liked ? "fill-netflix-red" : "fill-zinc-400"}`}
				d="M833.5,518.1L500.3,851.3l-0.1,0.1l-0.1,0.1L464.6,578l71.3-179.4l0,0l-35.8-159.3l-0.1,0l27.3-27.3
	c42.3-42.3,97.7-63.4,153.1-63.4c55.4,0,110.8,21.1,153.1,63.4C918.1,296.5,918.1,433.6,833.5,518.1z"
			/>
		</svg>
	);
}
