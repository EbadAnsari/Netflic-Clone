import { TrailerModalProps } from "@interfaces/ModalInterface";
import { openModal } from "@store/slice/TrailerModalSlice";
import { useDispatch } from "react-redux";
import Scroller from "./Scroller";
import Heart from "./icons/Heart";
import { LikedMovieSliceType, setLikedMovie } from "@store/slice/LikedSlice";
import { useSelector } from "react-redux";
import { Genre } from "@interfaces/TMDBGenre";
import { Chance } from "chance";

const chance = new Chance();

export default function MovieList({
	movieListTitle,
	movieList,
}: {
	movieListTitle: string;
	movieList: TrailerModalProps[];
}) {
	const likedMovie: LikedMovieSliceType = useSelector(
		(state: any) => state.LikedSliceReducer,
	);

	const dispatch = useDispatch();

	return (
		<Scroller title={movieListTitle}>
			{movieList.map((movieInfo, index) => (
				<div
					className="movie-info relative aspect-video h-full w-52 cursor-pointer overflow-hidden rounded-sm md:w-56 [&:hover_:last-child]:visible"
					key={index}
				>
					<img
						src={movieInfo.imageSource}
						className="h-full w-full"
						alt="big-buck-bunny.png"
					/>
					<div className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-zinc-900">
						<p className="m-2 !line-clamp-1 text-sm font-bold">
							{movieInfo.title}
						</p>
					</div>
					<div className="invisible absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-30 backdrop-blur-[1px]">
						<div className="mx-auto flex w-[45%] items-center gap-4">
							<div className="w-1/2">
								<img
									onClick={() => {
										dispatch(openModal(movieInfo));
									}}
									src="/public/icons/info-icon.svg"
									className="mx-auto rounded-full p-2 hover:backdrop-brightness-75"
								/>
							</div>
							<div
								className="w-1/2 rounded-full p-2 hover:backdrop-opacity-75"
								onClick={() => {
									if (movieInfo.liked)
										movieInfo.liked = false;
									else movieInfo.liked = undefined;
									dispatch(setLikedMovie({ ...movieInfo }));
								}}
							>
								<Heart
									color={
										movieInfo.id
											? "red"
											: {
													b: 225,
													g: 225,
													r: 225,
											  }
									}
								/>
							</div>
						</div>
					</div>
				</div>
			)) ?? [""]}
		</Scroller>
	);
}
