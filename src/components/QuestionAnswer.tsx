import { useState } from "react";

export default function QuestionAnswer({
	questionAndAnswer,
}: {
	questionAndAnswer: { question: string; answer: string[] }[];
}) {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	return (
		<div className="mt-6 flex flex-col justify-center gap-y-2">
			{questionAndAnswer.map(({ question, answer }, index) => {
				return (
					<div key={index} className="cursor-pointer select-none">
						<div className="mb-[2px] flex justify-between bg-[#2d2d2d] transition-all hover:bg-[#4e4e4e]">
							<h2
								className="h-full w-full p-6 text-lg font-semibold text-white lg:text-2xl"
								onClick={() => {
									setSelectedIndex(index);
								}}
							>
								{question}
							</h2>
							<div
								className={`cross ${
									selectedIndex === index && "rotate-45"
								} mx-6 my-auto w-4 py-6 lg:w-9`}
								onClick={() => {
									setSelectedIndex(null);
								}}
							>
								<svg viewBox="0 0 24 24" fill="none">
									<path
										d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z"
										fill="white"
									></path>
								</svg>
							</div>
						</div>
						<div
							className={`answer ${
								selectedIndex === index &&
								"h-fit grid-rows-[1fr] px-6"
							} grid h-0 grid-rows-[0fr] bg-[#2d2d2d] px-6 text-lg text-white transition-all lg:text-2xl`}
						>
							{Array.isArray(answer)
								? answer.map((para) => (
										<p
											className="my-4 overflow-hidden"
											key={para}
										>
											{para}
										</p>
								  ))
								: answer}
						</div>
					</div>
				);
			})}
		</div>
	);
}
