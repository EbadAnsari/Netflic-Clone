import { ModalProps, TrailerModalState } from "@interfaces/interface";
import { close } from "@store/slice/TrailerModalSlice";
import { secondsToMinutes } from "@utils/functions";
import { useDispatch, useSelector } from "react-redux";
import PlayButton from "./PlayButton";
import { motion as m } from "framer-motion";

export default function TrailerModal({
	title,
	genre,
	videoSource: videoSrc,
	duration,
	description,
}: ModalProps) {
	const trailerModalState: TrailerModalState = useSelector(
		(state: any) => state.TrailerModalReducer,
	);
	const dispatch = useDispatch();

	if (trailerModalState.result === "close") return <></>;

	const { minute: trailerInMinutes } = secondsToMinutes(duration);

	return (
		<m.section className="fixed left-0 top-0 z-modal flex h-screen w-screen items-center justify-center bg-black bg-opacity-80">
			<div className="relative w-[calc(100%_-_2rem)] overflow-hidden rounded-md bg-zinc-900 md:w-min">
				<div className="modal-video relative aspect-video w-full md:h-[27rem] md:w-auto">
					<video
						src={videoSrc}
						className="h-full object-cover"
						autoPlay
						muted
						loop
					></video>
					<div className="absolute bottom-[10%] left-[5%]">
						<p className="title mb-1 text-lg font-bold text-white sm:mb-2 sm:text-2xl md:mb-4 md:text-4xl">
							{title}
						</p>
						<div className="flex items-center gap-4">
							<PlayButton
								icon="/public/icons/play-icon.svg"
								text="Play"
							/>
							<div className="aspect-square w-4 cursor-pointer rounded-full border-transparent md:w-9 md:border-2 md:border-white md:p-2">
								<img src="/public/icons/plus-icon.svg" alt="" />
							</div>
						</div>
					</div>
					<div
						onClick={() => {
							dispatch(close());
						}}
						className="absolute right-[2%] top-[2%] rounded-full transition-colors"
					>
						<div className="aspect-square w-6 rotate-45 cursor-pointer rounded-full border-transparent p-1 sm:w-9 sm:border-2 sm:border-white">
							<img src="/public/icons/plus-icon.svg" alt="" />
						</div>
					</div>
				</div>
				<div className="modal-content w-fit space-y-3 px-6 py-6 text-sm text-white sm:px-12 sm:py-8 sm:text-base">
					<div className="flex items-center gap-3">
						<p className="text-base font-semibold text-green-400 sm:text-lg">
							New
						</p>
						<p>{trailerInMinutes + " min"}</p>
						<p>{genre}</p>
					</div>
					<p className="w-fit">{description}</p>
				</div>
			</div>
		</m.section>
	);
}
