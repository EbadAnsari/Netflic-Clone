import { useRef } from "react";

export default function SelectLanguage() {
	const languageSelect = useRef<HTMLSelectElement>(null);

	return (
		<div className="w-fit select-none">
			<div className="relative">
				<img
					src="/public/icons/language-logo.svg"
					className="absolute left-2 translate-y-1/2"
				/>
				<img
					src="/public/icons/drop-down-icon.svg"
					className="absolute right-2 translate-y-1/2"
					alt=""
				/>
			</div>
			<select
				ref={languageSelect}
				className="relative flex flex-col rounded-[4px] border-[1px] border-solid border-[#5f5e5e] bg-transparent py-1 text-transparent sm:px-8 sm:text-white [&>option]:text-black"
			>
				<option value="english">English</option>
				<option value="hindi">Hindi</option>
			</select>
		</div>
	);
}
