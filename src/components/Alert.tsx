import { titlCase } from "@utils/functions";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export interface AlertInterface {
	text: string | ReactNode;
	type: "sucess" | "error" | "warn" | "info";
	link?: { linkTo: AppRoutes; linkMessage: string };
	className?: string;
}

// #202124

export default function Alert({ text, type, link, className }: AlertInterface) {
	return (
		<div
			className={`w-full rounded p-4 text-white ${className} ${(() => {
				if (type === "error") return "bg-orange-600 dark:bg-orange-600";
				if (type === "info") return "bg-sky-500 dark:bg-sky-600";
				if (type === "sucess")
					return "bg-green-500 dark:bg-green-600 dark:bg-opacity-80";
				if (type === "warn") return "bg-amber-500 dark:bg-amber-600";
			})()}`}
		>
			<span className="pr-1 font-bold">{titlCase(type) + "!"}</span>
			{text}
			{link && (
				<span className="pl-1">
					<Link className="underline" to={link.linkTo}>
						{link.linkMessage}
					</Link>
				</span>
			)}
		</div>
	);
}
