export default function ProfileIcon({
	className,
	size,
	startColorHue,
	endColorHue,
}: {
	className?: string;
	size?: string;
	startColorHue: number;
	endColorHue: number;
}) {
	return (
		<div
			className={className}
			style={{
				height: size,
				width: size,
				backgroundImage: `linear-gradient(hsl(${startColorHue}, 51%, 47%) 0%, hsl(${endColorHue}, 53%, 60%) 100%)`,
			}}
		>
			<svg x="0px" y="0px" viewBox="0 0 813.9 813.9">
				<circle
					id="left-eye"
					className="fill-white"
					cx="161.9"
					cy="269.6"
					r="47.3"
				/>
				<circle
					id="right-eye"
					className="fill-white"
					cx="653.9"
					cy="269.6"
					r="47.3"
				/>
				<path
					id="smile"
					className="fill-white"
					d="M518,510.1c-1.4,0-2.9,0-4.4,0c-57.4-0.7-113.8-13.8-167.8-39.2c-8.3-3.9-11.8-13.7-7.9-21.9
                c3.9-8.3,13.7-11.8,21.9-7.9c49.7,23.3,101.6,35.4,154.2,36c77.6,0.9,124.5-23.8,155.5-40.2c2.1-1.1,4.2-2.2,6.2-3.3
                c8.1-4.2,18-1.1,22.3,7c4.2,8.1,1.1,18-7,22.3c-1.9,1-4,2.1-6,3.2C653.6,482.6,601.5,510.1,518,510.1z"
				/>
			</svg>
		</div>
	);
}
