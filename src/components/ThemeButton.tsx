interface ThemeButtonProps {
	readonly onClick?: () => void;
}

export default function ThemeButton({ onClick }: ThemeButtonProps) {
	return (
		<div
			className="aspect-square w-full"
			onClick={() => {
				onClick?.();
			}}
		>
			<div className="h-full w-full bg-moon bg-cover bg-center bg-no-repeat dark:bg-sun"></div>
		</div>
	);
}
