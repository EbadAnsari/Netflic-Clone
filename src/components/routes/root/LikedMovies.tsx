import Heart from "@components/icons/Heart";
import MovieList from "@components/movie/MovieList";
import { LikedMovieSliceType } from "@store/slice/LikedSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function LikedMovies() {
	const likedMovie: LikedMovieSliceType = useSelector(
		(state: any) => state.LikedSliceReducer,
	);

	return (
		<section className="relative grid grid-cols-12 grid-rows-6">
			<div className="-z-10 col-span-12 col-start-1 row-span-6 row-start-1 h-[460px] w-full justify-center overflow-hidden">
				<img
					src="/public/images/banner-image-small.jpg"
					srcSet="/public/images/banner-image-small.jpg 1000w, /public/images/banner-image-medium.jpg 1500w, /public/images/banner-image-large.jpg 1800w"
					className="h-full min-w-[120%] select-none object-cover brightness-[.4]"
				/>
			</div>
			<div className="col-span-12 col-start-1 row-span-6 row-start-5 h-full bg-zinc-100 px-10 py-3 dark:bg-zinc-900">
				{likedMovie.likedMovieList.length ? (
					<MovieList
						movieList={likedMovie.likedMovieList}
						movieListTitle="For you"
					/>
				) : (
					<div className="flex flex-col items-center justify-center">
						<div className="my-1 aspect-square h-28">
							<Heart shatter />
						</div>
						<p className="text-zinc-400">No liked movies</p>
						<Link to={"/"} className="text-zinc-400 underline">
							Explore more?
						</Link>
					</div>
				)}
			</div>
		</section>
	);
}
