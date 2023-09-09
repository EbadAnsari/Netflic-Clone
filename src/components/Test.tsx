import { useInputBox } from "@hooks/InputBox";
import { useRef } from "react";

export default function Test() {
	const container = useRef<HTMLDivElement>(null);

	const a = useInputBox(container);

	return (
		<>
			<div ref={container} className="flex gap-5">
				<label className="text-white">Ebad</label>
				<input type="text" />
			</div>
			<button
				onClick={a.focus}
				className="m-5 bg-lime-600 px-8 text-white"
			>
				focus
			</button>
			<button
				onClick={a.leave}
				className="m-5 bg-lime-600 px-8 text-white"
			>
				leave
			</button>
		</>
	);
}
