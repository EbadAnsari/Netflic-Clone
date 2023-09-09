export default function Spinner({
	animate,
	dotColor,
}: {
	animate: boolean;
	dotColor: string;
}) {
	if (!animate) return <></>;

	return (
		<div className="spinner flex aspect-square w-full items-center justify-center">
			<div className="relative aspect-square w-3/5 animate-spinner [&>div]:absolute [&>div]:aspect-square [&>div]:w-2/5 [&>div]:rounded-full">
				<div
					className="t top-0 -translate-x-1/2 -translate-y-1/2"
					style={{
						backgroundColor: dotColor,
					}}
				></div>
				<div
					className="r right-0 -translate-y-1/2 translate-x-1/2"
					style={{
						backgroundColor: dotColor,
					}}
				></div>
				<div
					className="b bottom-0 right-0 translate-x-1/2 translate-y-1/2"
					style={{
						backgroundColor: dotColor,
					}}
				></div>
				<div
					className="l bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
					style={{
						backgroundColor: dotColor,
					}}
				></div>
			</div>
		</div>
	);
}
