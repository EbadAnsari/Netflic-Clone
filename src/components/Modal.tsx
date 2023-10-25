import { popUp } from "@animation/animate";
import { ModalState, TrailerModalSliceType } from "@interfaces/ModalInterface";
import { Genre } from "@interfaces/TMDBGenre";
import { closeModal } from "@store/slice/TrailerModalSlice";
import { toggleLineClamp } from "@utils/functions";
import { motion as m } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import ImageButton from "./ImageButton";

function TrailerModal() {
	const trailerModalState: TrailerModalSliceType = useSelector(
		(state: any) => state.TrailerModalReducer,
	);

	const { description, genre, imageSource, title } = {
		...trailerModalState.modalValue,
	};

	const dispatch = useDispatch();
	console.log(genre);

	return (
		Array.isArray(genre) && (
			<m.div
				{...popUp}
				className="relative w-[calc(100%_-_3rem)] overflow-hidden rounded-md bg-zinc-900 sm:w-[calc(100%_-_5rem)] md:w-[44rem] lg:w-min"
			>
				<div className="modal-video relative aspect-video w-full md:h-[27rem]">
					<img
						src={imageSource}
						className="h-full object-cover object-center"
					/>
					<div className="absolute bottom-[10%] left-[5%]">
						<p className="title mb-1 text-lg font-bold text-white sm:mb-2 sm:text-2xl md:mb-4 md:text-4xl">
							{title}
						</p>
						<div className="flex items-center gap-4">
							<ImageButton
								icon="/public/icons/play-icon.svg"
								text="Play"
							/>
							<div className="aspect-square w-4 cursor-pointer rounded-full border-transparent md:w-9 md:border-2 md:border-white md:p-2">
								<img src="/public/icons/plus-icon.svg" />
							</div>
						</div>
					</div>
					<div
						onClick={() => {
							dispatch(closeModal());
						}}
						className="absolute right-[2%] top-[2%] rounded-full transition-colors"
					>
						<div className="aspect-square w-6 rotate-45 cursor-pointer rounded-full border-transparent p-1 sm:w-9">
							<img src="/public/icons/plus-icon.svg" />
						</div>
					</div>
				</div>
				<div className="modal-content w-fit space-y-2 p-5 py-4 text-xs text-white sm:space-y-3 sm:px-8 sm:py-6 sm:text-base md:px-12 md:py-8">
					<div className="flex items-center gap-3">
						<p className="font-semibold text-green-400 sm:text-lg">
							New
						</p>
						<p className="flex items-center">
							{genre.map((element, index) => (
								<>
									{Genre[element]}
									{index !== genre.length - 1 ? (
										<span className="mx-2.5 inline-block h-0.5 w-0.5 rounded-full bg-white p-0.5"></span>
									) : (
										""
									)}
								</>
							))}
						</p>
					</div>
					<p
						className="line-clamp-3 w-fit"
						onClick={(event) => {
							toggleLineClamp({ xs: 3 }, event);
						}}
					>
						{description}
					</p>
				</div>
			</m.div>
		)
	);
}

export default function Modal() {
	const modalState: ModalState = useSelector(
		(state: any) => state.TrailerModalReducer,
	);

	const dispatch = useDispatch();

	window.onkeydown = function (event) {
		event.stopImmediatePropagation();
		if (event.key === "Escape") dispatch(closeModal());
	};
	document.body.style.overflow = "hidden";

	return (
		(modalState.modalState === "open" && (
			<section className="modal fixed left-0 top-0 z-modal flex h-screen w-screen items-center justify-center bg-black bg-opacity-80">
				<TrailerModal />
			</section>
		)) ||
		(() => {
			window.onkeydown = null;
			document.body.style.overflow = "unset";
			return null;
		})()
	);
}
