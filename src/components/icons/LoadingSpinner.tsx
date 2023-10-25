export default function LoadingSpinner({
	borderWidth,
}: {
	borderWidth: string;
}) {
	return (
		<div className="aspect-square h-full w-20">
			<div
				style={{ borderWidth: borderWidth }}
				className="aspect-square h-full w-full animate-spin rounded-full border-[1rem] border-zinc-300 border-l-white"
			></div>
		</div>
	);
}
