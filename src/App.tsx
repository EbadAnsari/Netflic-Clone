import Layout from "@layout/LayoutManager";
import MediaQuery from "./MediaQuery";
import Test from "@components/Test";
import Spinner from "@components/Spinner";
import LoadingSpinner from "@components/icons/LoadingSpinner";
import FixedList from "@components/InfiniteScroller";
import MovieList from "@components/MovieList";
import { Chance } from "chance";
import { Genre } from "@interfaces/TMDBGenre";
import {
	TrailerModalInputs,
	TrailerModalProps,
} from "@interfaces/ModalInterface";
import { Prettify } from "@interfaces/interface";
import { PropsWithChildren } from "react";

function Wrap({ children }: PropsWithChildren) {
	return children;
}

function createMovieNode(movieInfo: TrailerModalInputs) {
	const movieInfoDiv = document.createElement("div");
	movieInfoDiv.className = "movie-info";

	const movieImage = document.createElement("img");
	movieImage.className = "movie-image";
	movieImage.alt = "movieInfo.imageSource";
	movieImage.src = movieInfo.imageSource;

	const movieTitleDiv = document.createElement("div");
	movieTitleDiv.className = "movie-title-div";

	const movieTitleP = document.createElement("p");
	movieTitleP.className = "movie-title-p";
	movieTitleP.appendChild(document.createTextNode(movieInfo.title));

	const extraButtonWrapperDiv = document.createElement("div");
	extraButtonWrapperDiv.className = "extra-button-wrapper-div";

	const extraButtonInnerDiv = document.createElement("div");
	extraButtonInnerDiv.className = "extra-button-inner-div";

	const extraButtonLeftDiv = document.createElement("div");
	extraButtonLeftDiv.className = "extra-button-left-div";

	const infoIconImg = document.createElement("img");
	infoIconImg.className = "info-icon-img";
	infoIconImg.src = "/public/icons/info-icon.svg";

	const extraButtonRightDiv = document.createElement("div");
	extraButtonRightDiv.className = "extra-button-right-div";

	extraButtonRightDiv.onclick = function () {
		if (movieInfo.liked) movieInfo.liked = false;
		else movieInfo.liked = undefined;
	};

	movieInfoDiv.appendChild(movieImage);
	movieInfoDiv.appendChild(movieTitleDiv);
	movieInfoDiv.appendChild(extraButtonWrapperDiv);

	movieTitleDiv.appendChild(movieTitleP);

	extraButtonWrapperDiv.appendChild(extraButtonInnerDiv);

	extraButtonInnerDiv.appendChild(extraButtonLeftDiv);
	extraButtonInnerDiv.appendChild(extraButtonRightDiv);

	extraButtonLeftDiv.appendChild(infoIconImg);

	return movieInfoDiv;
}

export default function App() {
	const chance = new Chance();
	return (
		<>
			{/* <div>
				<Layout />
				<MediaQuery />
			</div> */}
			{/* <div className=""> */}
			{/* <Wrap>
					{new Array<TrailerModalProps>(20)
						.fill({
							id: 10,
							description: chance.paragraph(),
							genre: [Genre.Action, Genre.Crime],
							imageSource: "/public/images/big-buck-bunny.png",
							title: "Big Buck Bunny",
						})
						.map((movieInfo, index) => (
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
												src="/public/icons/info-icon.svg"
												className="mx-auto rounded-full p-2 hover:backdrop-brightness-75"
											/>
										</div>
										<div
											className="w-1/2 rounded-full p-2 hover:backdrop-opacity-75"
											onClick={() => {
												if (movieInfo.liked)
													movieInfo.liked = false;
												else
													movieInfo.liked = undefined;
											}}
										></div>
									</div>
								</div>
							</div>
						))}
				</Wrap> */}
			<FixedList
				elementArray={new Array<TrailerModalProps>(20).fill({
					id: 10,
					description: chance.paragraph(),
					genre: [Genre.Action, Genre.Crime],
					imageSource: "/public/images/big-buck-bunny.png",
					title: "Big Buck Bunny",
				})}
				node-creator={createMovieNode}
			/>
			{/* </div> */}
			{/* <Test /> */}
			{/* <div className="w-5"> */}
			{/* <Spinner animate dotColor="#000" /> */}
			{/* <LoadingSpinner width="5px" /> */}
			{/* </div> */}
		</>
	);
}
