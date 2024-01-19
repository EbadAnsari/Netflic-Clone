import { ReactNode } from "react";

export default function DropDown({
	children,
	title,
}: {
	readonly children: ReactNode;
	readonly title: string;
}) {
	if (!Array.isArray(children))
		throw new Error("Must provide drop down something.");

	return (
		<div>
			<div
				tabIndex={0}
				className="open-drop-down relative flex cursor-pointer select-none items-center gap-x-2 hover:underline"
			>
				<div className="flex lg:hidden">
					<div className="text-white">{title}</div>
					<img
						src="/public/icons/drop-down-icon.svg"
						className="brightness-100"
					/>
				</div>
				<div className="drop-down absolute left-0 top-full origin-[20%_0%] translate-y-3 text-base lg:static lg:translate-y-0 lg:!scale-100 lg:!opacity-100 lg:!transition-none">
					<div className="-left-1 top-1 flex w-36 flex-col items-center rounded-md bg-zinc-400 !bg-opacity-20 p-2 text-xs text-zinc-50 backdrop-blur-md dark:bg-zinc-400 sm:w-48 sm:p-3 sm:text-sm md:rounded-lg lg:static lg:w-auto lg:scale-100 lg:flex-row lg:border-0 lg:!bg-opacity-0 lg:px-5 lg:text-base lg:backdrop-blur-none [&>*]:cursor-pointer hover:[&>*]:underline">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
