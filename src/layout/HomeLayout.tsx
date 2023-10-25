import Footer from "@components/Footer";
import ImageButton from "@components/ImageButton";
import Modal from "@components/Modal";
import Navbar from "@components/Navbar";
import Scroller from "@components/Scroller";
import Heart from "@components/icons/Heart";
import {
	TrailerModalProps,
	TrailerModalSliceType,
} from "@interfaces/ModalInterface";
import { Genre } from "@interfaces/TMDBGenre";
import { TMDBResponse, TMDBResult } from "@interfaces/TheMovieDBInterface";
import { openModal } from "@store/slice/TrailerModalSlice";
import { discover, generateImageURL } from "@utils/TheMovieDB";
import { generateRamdomNumber, useTheme } from "@utils/functions";
import Chance from "chance";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const chance = new Chance();

function MovieList({
	movieListTitle,
	movieList,
}: {
	movieListTitle: string;
	movieList: TrailerModalProps[];
}) {
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
										dispatch(openModal({ ...movieInfo }));
									}}
									src="/public/icons/info-icon.svg"
									className="mx-auto rounded-full p-2 hover:backdrop-brightness-75"
								/>
							</div>
							<div className="w-1/2 rounded-full p-2 hover:backdrop-opacity-75">
								<Heart
									color={{
										b: 170,
										g: 170,
										r: 170,
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			)) ?? [""]}
		</Scroller>
	);
}

export default function HomeLayout() {
	const trailerModalState: TrailerModalSliceType = useSelector(
		(state: any) => state.TrailerModalReducer,
	);

	const dispatch = useDispatch();

	const theme = useTheme();

	theme.setTheme("dark");

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
		<section className="bg-[#18181b]">
			<Navbar />
			<section className="banner relative grid grid-cols-12 grid-rows-6">
				<img
					className="col-span-12 col-start-1 row-span-6 row-start-1 h-72 w-full select-none object-cover brightness-[95%] transition duration-500 xs:h-96 sm:h-[30rem] md:h-[40rem]"
					src={
						banner
							? generateImageURL({
									imagePath: banner.backdrop_path,
									imageSize: "w1280",
							  })
							: "/public/images/big-buck-bunny.png"
					}
					style={{
						WebkitMask:
							"linear-gradient(rgba(0, 0, 0, 1) 14%, rgba(0, 0, 0, 1) 54%, rgba(255, 255, 255, 0.6) 80%, transparent)",
					}}
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

			<Modal />

			<Footer
				textLink={[
					{ text: "FAQ", link: "#" },
					{ text: "Help Centre", link: "#" },
					{ text: "Account", link: "#" },
					{ text: "Media Centre", link: "#" },
					{ text: "Investor Relations", link: "#" },
					{ text: "Jobs", link: "#" },
					{ text: "Ways to Watch", link: "#" },
					{ text: "Terms of Use", link: "#" },
					{ text: "Privacy", link: "#" },
					{ text: "Cookie Preferences", link: "#" },
					{ text: "Corporate Information", link: "#" },
					{ text: "Contact Us", link: "#" },
					{ text: "Speed Test", link: "#" },
					{ text: "Legal Notices", link: "#" },
					{ text: "Only on Netflix", link: "#" },
				]}
			/>
		</section>
	);
}
