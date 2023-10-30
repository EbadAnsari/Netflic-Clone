import { useParams } from "react-router-dom";

export default function LikedMovies() {
	const { userId } = useParams();

	console.log(userId);

	return (
		<section className="relative bg-white">
			<div className="-z-10 col-span-12 col-start-1 row-start-1 h-[max(34rem,100%)] w-full justify-center overflow-hidden md:h-[540px] lg:h-[720px]">
				<img
					src="/public/images/banner-image-small.jpg"
					srcSet="/public/images/banner-image-small.jpg 1000w, /public/images/banner-image-medium.jpg 1500w, /public/images/banner-image-large.jpg 1800w"
					className="h-full min-w-[120%] select-none object-cover brightness-[.4]"
				/>
			</div>
			<div>{userId}</div>
		</section>
	);
}
