import ImageButton from "@components/ImageButton";
import MovieList from "@components/movie/MovieList";
import { TrailerModalProps } from "@interfaces/ModalInterface";
import { ReleaseType } from "@interfaces/TMDBExtra";
import { Genre } from "@interfaces/TMDBGenre";
import { TMDBResponse, TMDBResult } from "@interfaces/TheMovieDBInterface";
import { openModal } from "@store/slice/TrailerModalSlice";
import { discover, generateImageURL } from "@utils/TheMovieDB";
import { generateRamdomNumber } from "@utils/functions";
import { Chance } from "chance";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const chance = new Chance();

export default function Homepage() {
	const dispatch = useDispatch();

	const [banner, setBanner] = useState<TMDBResult | null>(null);

	const [movie, setMovie] = useState<{
		genreComedy: TMDBResult[] | undefined;
		fromIndia: TMDBResult[] | undefined;
		genreHorror: TMDBResult[] | undefined;
	} | null>(null);

	// const [favourites, setFavourites] = useState<TMDBResult[] | null>(null);

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
				with_release_type: ReleaseType.Digital,
			}),
			discover({
				include_adult: false,
				language: "en-US",
				with_genres: Genre.Horror,
				sort_by: "popularity.desc",
			}),
			discover({}),
		])
			.then(async (res) => {
				const movieList: TMDBResponse[] = [];
				for (const movieData of res)
					if (movieData.status === "fulfilled")
						movieList.push(await movieData.value.json());
				return movieList;
			})
			.then((data: TMDBResponse[]) => {
				setMovie({
					fromIndia: data[0].results,
					genreComedy: data[1].results,
					genreHorror: data[2].results,
				});
				const randomMovieList =
					data[generateRamdomNumber(data.length - 1)].results;

				setBanner(
					randomMovieList[
						generateRamdomNumber(randomMovieList.length - 1)
					],
				);
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
				/>
				<div className="relative z-10 col-span-12 col-start-1 row-span-full row-start-4 ml-[5%] w-3/4 dark:text-zinc-900 md:w-96 lg:w-[30rem]">
					<div className="line-clamp-1 text-xl font-black text-white sm:text-2xl md:text-3xl">
						{banner?.title || (
							// {"__________"}
							// animate-[search_1000ms_ease-in-out_infinite]
							<div className="h-7 w-8/12 overflow-hidden rounded bg-white bg-opacity-40 backdrop-blur-md xs:h-5 sm:h-8 md:h-9">
								<div
									style={
										{
											// animation:
											// 	"search 1000ms ease-in-out infinite",
										}
									}
									className="absolute -left-2/3 h-full w-3/12 bg-white opacity-80 blur-2xl"
								></div>
							</div>
						)}
					</div>
					<div className="my-1 line-clamp-3 overflow-hidden text-xs text-white xs:text-sm sm:my-3 sm:line-clamp-4 sm:text-base">
						{banner?.overview ?? (
							<div className="space-y-1.5">
								{new Array(4).fill(0).map((element, index) => {
									return (
										<div
											key={index}
											className="h-0.5 w-full overflow-hidden rounded bg-white bg-opacity-40 backdrop-blur-md xs:h-5"
										>
											<div
												style={
													{
														// animation: `search 1000ms ease-in-out ${
														// 	(index + 5) * 10
														// }ms infinite`,
													}
												}
												className="absolute -left-2/3 h-full w-3/12 bg-white opacity-80 blur-2xl"
											></div>
											{/* animate-[search_1000ms_ease-in-out_infinite] */}
										</div>
									);
								})}
							</div>
						)}
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
											id: banner.id,
											title: banner.title,
											liked: false,
										}),
									);
							}}
							icon="/public/icons/info-icon.svg"
							text="More info"
							className="w-full bg-white bg-opacity-40 text-white backdrop-blur-3xl"
						/>
					</div>
				</div>
			</section>
			<section className="mx-auto w-[max(90%,10rem)] max-w-[90rem] space-y-6">
				{
					<MovieList
						movieList={new Array<TrailerModalProps>(20)
							.fill({
								description: chance.paragraph(),
								genre: [Genre.Action, Genre.Crime],
								imageSource:
									"/public/images/big-buck-bunny.png",
								title: "Big Buck Bunny",
								id: 1,
								liked: false,
							})
							.map((element, index) => ({
								...element,
								id: index,
							}))}
						movieListTitle="For you"
					/>
				}

				{movie?.fromIndia && (
					<MovieList
						movieList={movie.fromIndia.map((movie) => ({
							description: movie.overview,
							genre: movie.genre_ids,
							imageSource: generateImageURL({
								imagePath: movie.backdrop_path,
								imageSize: "w780",
							}),
							id: movie.id,
							title: movie.title,
							liked: false,
						}))}
						movieListTitle="For you"
					/>
				)}

				{movie?.genreComedy && (
					<MovieList
						movieList={movie.genreComedy.map((movie) => ({
							description: movie.overview,
							genre: movie.genre_ids,
							imageSource: generateImageURL({
								imagePath: movie.backdrop_path,
								imageSize: "w780",
							}),
							id: movie.id,
							title: movie.title,
							liked: false,
						}))}
						movieListTitle="Comedy Section"
					/>
				)}

				{movie?.genreHorror && (
					<MovieList
						movieList={movie.genreHorror.map((movie) => ({
							description: movie.overview,
							genre: movie.genre_ids,
							imageSource: generateImageURL({
								imagePath: movie.backdrop_path,
								imageSize: "w780",
							}),
							id: movie.id,
							title: movie.title,
							liked: false,
						}))}
						movieListTitle="Horror"
					/>
				)}
			</section>
		</>
	);
}
