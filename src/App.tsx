import Layout from "@layout/LayoutManager";

export default function App() {
	return (
		<>
			<div>
				<Layout />
				{/* <MediaQuery /> */}
			</div>

			{/* <FixedList
				children={new Array<TrailerModalProps>(100)
					.fill({
						id: 10,
						description: chance.paragraph(),
						genre: [Genre.Action, Genre.Crime],
						imageSource: "/public/images/big-buck-bunny.png",
						title: "Big Buck Bunny",
					})
					.map((movieInfo, index) => (
						<Movie
							movieInfo={movieInfo}
							index={index}
							key={index}
						/>
					))}
				items={20}
			/> */}
			{/* </div> */}
			{/* <Test /> */}
			{/* <div className="w-5"> */}
			{/* <Spinner animate dotColor="#000" /> */}
			{/* <LoadingSpinner width="5px" /> */}
			{/* </div> */}
		</>
	);
}
