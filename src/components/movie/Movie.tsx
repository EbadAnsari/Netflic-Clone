import Heart from "@components/icons/Heart";
import { TrailerModalProps } from "@interfaces/ModalInterface";
import { LikedMovieSliceType, setLikeMovie } from "@store/slice/LikedSlice";
import { openModal } from "@store/slice/TrailerModalSlice";
import { useDispatch, useSelector } from "react-redux";

/**
 * Use to render single movie.
 */
export default function Movie({
	description,
	genre,
	id,
	imageSource,
	title,
	liked,
}: TrailerModalProps) {
	const likedMovie: LikedMovieSliceType = useSelector(
		(state: any) => state.LikedSliceReducer,
	);

	const isMovieLiked = likedMovie.likedMovieList.find(
		(element) => element.id === id,
	);

	if (isMovieLiked) {
		description = isMovieLiked.description;
		genre = isMovieLiked.genre;
		id = isMovieLiked.id;
		imageSource = isMovieLiked.imageSource;
		liked = isMovieLiked.liked;
		title = isMovieLiked.title;
	}

	const dispatch = useDispatch();

	if (liked) {
		console.log({ id });
	}

	return (
		<div
			data-id={id}
			data-liked={liked}
			className="movie-info relative aspect-video h-full w-52 cursor-pointer overflow-hidden rounded-sm md:w-56 [&:hover_:last-child]:visible"
		>
			<img
				src={imageSource}
				className="h-full w-full"
				alt="big-buck-bunny.png"
			/>
			<div className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-zinc-900">
				<p className="m-2 !line-clamp-1 text-sm font-bold">{title}</p>
			</div>
			<div className="invisible absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-30 backdrop-blur-lg">
				<div className="mx-auto flex w-[45%] items-center gap-4">
					<div className="w-1/2">
						<img
							onClick={() => {
								dispatch(
									openModal({
										description,
										genre,
										id,
										imageSource,
										title,
										liked,
									}),
								);
							}}
							src="/public/icons/info-icon.svg"
							className="mx-auto rounded-full p-2 hover:backdrop-brightness-75"
						/>
					</div>
					<div
						className="aspect-square w-1/2 rounded-full p-2 hover:backdrop-opacity-75"
						onClick={() => {
							dispatch(
								setLikeMovie({
									description,
									genre,
									id,
									imageSource,
									liked: !liked,
									title,
								}),
							);
						}}
					>
						<Heart liked={liked} />
					</div>
					<p className="absolute bottom-0 left-0 m-2 !line-clamp-1 w-full text-sm font-bold">
						{title}
					</p>
				</div>
			</div>
		</div>
	);
}
