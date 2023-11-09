import InfiniteScroller from "@components/InfiniteScroller";
import { TrailerModalProps } from "@interfaces/ModalInterface";
import { Genre } from "@interfaces/TMDBGenre";
import { Chance } from "chance";

function Movie({ movieInfo }: { movieInfo: TrailerModalProps }) {
	return (
		<div className="movie-info relative aspect-video h-full w-52 cursor-pointer overflow-hidden rounded-sm md:w-56 [&:hover_:last-child]:visible">
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
							src="/public/icons/info-icon.svg"
							className="mx-auto rounded-full p-2 hover:backdrop-brightness-75"
						/>
					</div>
					<div
						className="w-1/2 rounded-full p-2 hover:backdrop-opacity-75"
						onClick={() => {
							if (movieInfo.liked) movieInfo.liked = false;
							else movieInfo.liked = undefined;
						}}
					></div>
				</div>
			</div>
		</div>
	);
}

export default function App() {
	const chance = new Chance();
	return (
		<>
			{/* <div>
				<Layout />
				<MediaQuery />
			</div> */}

			<InfiniteScroller itemCount={20}>
				{new Array<TrailerModalProps>(300)
					.fill({
						id: 10,
						description: chance.paragraph(),
						genre: [Genre.Action, Genre.Crime],
						imageSource: "/public/images/big-buck-bunny.png",
						title: "Big Buck Bunny",
					})
					.map((movieInfo, index) => (
						<Movie movieInfo={movieInfo} key={index} />
					))}
			</InfiniteScroller>
			{/* </div> */}
			{/* <Test /> */}
			{/* <div className="w-5"> */}
			{/* <Spinner animate dotColor="#000" /> */}
			{/* <LoadingSpinner width="5px" /> */}
			{/* </div> */}
		</>
	);
}
