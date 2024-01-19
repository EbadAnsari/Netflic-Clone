import Movie from "@components/movie/Movie";
import { TrailerModalProps } from "@interfaces/ModalInterface";
import Scroller from "../Scroller";

/**
 * Use to render array of movie with scroller.
 */
export default function MovieList({
	movieListTitle,
	movieList,
}: {
	movieListTitle: string;
	movieList: TrailerModalProps[];
}) {
	return (
		<Scroller title={movieListTitle}>
			{movieList.map((movieInfo, index) => (
				<Movie {...movieInfo} key={index} />
			)) ?? undefined}
		</Scroller>
	);
}
