import ImageButton from "@components/ImageButton";
import MovieList from "@components/MovieList";
import { Genre } from "@interfaces/TMDBGenre";
import { TMDBResult, TMDBResponse } from "@interfaces/TheMovieDBInterface";
import { openModal } from "@store/slice/TrailerModalSlice";
import { discover, generateImageURL } from "@utils/TheMovieDB";
import { useTheme, generateRamdomNumber } from "@utils/functions";
import Chance from "chance";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const chance = new Chance();

export default function Homepage() {
	const dispatch = useDispatch();

	const theme = useTheme();

	theme.setTheme("light");

	theme.toggleTheme();

	const [banner, setBanner] = useState<TMDBResult | null>(null);

	const [favourites, setFavourites] = useState<TMDBResult[] | null>(null);
	const [genreComedy, setGenreComedy] = useState<TMDBResult[] | null>(null);
	const [fromIndia, setFromIndia] = useState<TMDBResult[] | null>(null);
	const [genreHorror, setGenreHorror] = useState<TMDBResult[] | null>(null);

	useEffect(() => {
		Promise.allSettled([
			discover({
				include_adult: false,
				with_origin_country: "IN",
				with_genres: Genre.Action,
				sort_by: "popularity.desc",
			}),
			discover({
				include_adult: false,
				language: "en-US",
				with_genres: Genre.Comedy,
				sort_by: "popularity.desc",
			}),
			discover({
				include_adult: false,
				language: "en-US",
				with_genres: Genre.Horror,
				sort_by: "popularity.desc",
			}),
		])
			.then(async (res) => {
				const movieList: TMDBResponse[] = [];
				for (const movieData of res)
					if (movieData.status === "fulfilled")
						movieList.push(await movieData.value.json());
				return movieList;
			})
			.then((data: TMDBResponse[]) => {
				setFromIndia(data[0].results);
				setGenreComedy(data[1].results);
				setGenreHorror(data[2].results);

				const randomMovieList =
					data[generateRamdomNumber(data.length - 1)];

				setBanner(
					randomMovieList.results[
						generateRamdomNumber(randomMovieList.results.length - 1)
					],
				);

				console.log(data);
			});
	}, []);

	return (
		<>
			<section className="banner relative grid grid-cols-12 grid-rows-6">
				<img
					className="mask-light dark:mask-dark col-span-12 col-start-1 row-span-6 row-start-1 h-72 w-full select-none object-cover brightness-[95%] transition duration-500 xs:h-96 sm:h-[30rem] md:h-[40rem]"
					src={
						banner
							? generateImageURL({
									imagePath: banner.backdrop_path,
									imageSize: "w1280",
							  })
							: "/public/images/big-buck-bunny.png"
					}
					style={
						{
							// WebkitMask:
							// 	"linear-gradient(rgba(0, 0, 0, 1) 14%, rgba(0, 0, 0, 1) 54%, rgba(255, 255, 255, 0.6) 80%, transparent)",
						}
					}
				/>
				<div className="z-10 col-span-12 col-start-1 row-span-full row-start-4 ml-[5%] w-3/4 dark:text-zinc-900 md:w-96 lg:w-[30rem]">
					<div className="line-clamp-1 text-xl font-black text-white sm:text-2xl md:text-3xl">
						{banner?.title}
					</div>
					<div className="my-1 line-clamp-3 overflow-hidden text-xs text-white xs:text-sm sm:my-3 sm:line-clamp-4 sm:text-base">
						{banner?.overview}
					</div>
					<div className="my-2 flex w-min gap-3 xs:my-6">
						<ImageButton
							icon="/public/icons/play-icon.svg"
							text="Play"
							className="w-full"
						/>
						<ImageButton
							onClick={() => {
								if (banner)
									dispatch(
										openModal({
											description: banner.overview,
											genre: banner.genre_ids,
											imageSource: generateImageURL({
												imagePath: banner.backdrop_path,
												imageSize: "w1280",
											}),
											title: banner.title,
										}),
									);
							}}
							icon="/public/icons/info-icon.svg"
							text="More info"
							className="w-full bg-white bg-opacity-40 text-white"
						/>
					</div>
				</div>
			</section>
			<section className="mx-auto w-[max(90%,10rem)] max-w-[90rem] space-y-6">
				{
					<MovieList
						movieList={new Array(20).fill(10).map(() => ({
							description: chance.paragraph(),
							genre: [Genre.Action, Genre.Crime],
							imageSource: "/public/images/big-buck-bunny.png",
							title: "Big Buck Bunny",
						}))}
						movieListTitle="For you"
					/>
				}

				{fromIndia && (
					<MovieList
						movieList={fromIndia.map((movie) => ({
							description: movie.overview,
							genre: movie.genre_ids,
							imageSource: generateImageURL({
								imagePath: movie.backdrop_path,
								imageSize: "w780",
							}),
							title: movie.title,
						}))}
						movieListTitle="For you"
					/>
				)}

				{genreComedy && (
					<MovieList
						movieList={genreComedy.map((movie) => ({
							description: movie.overview,
							genre: movie.genre_ids,
							imageSource: generateImageURL({
								imagePath: movie.backdrop_path,
								imageSize: "w780",
							}),
							title: movie.title,
						}))}
						movieListTitle="Comedy Section"
					/>
				)}

				{genreHorror && (
					<MovieList
						movieList={genreHorror.map((movie) => ({
							description: movie.overview,
							genre: movie.genre_ids,
							imageSource: generateImageURL({
								imagePath: movie.backdrop_path,
								imageSize: "w780",
							}),
							title: movie.title,
						}))}
						movieListTitle="Horror"
					/>
				)}
			</section>
		</>
	);
}
