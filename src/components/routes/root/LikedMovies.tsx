import MovieList from "@components/MovieList";
import { TrailerModalProps } from "@interfaces/ModalInterface";
import { Genre } from "@interfaces/TMDBGenre";
import { Chance } from "chance";
import { useSelector } from "react-redux";

export default function LikedMovies() {
	const chance = new Chance();

	const likedMovie: TrailerModalProps[] = useSelector(
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
				{<MovieList movieList={likedMovie} movieListTitle="For you" />}
			</div>
		</section>
	);
}
