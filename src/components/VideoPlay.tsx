export default function VideoPlay() {
	return (
		<section className="fixed left-0 top-0 z-video-watch h-[100dvh] w-[100dvw] bg-black">
			<div className="absolute top-0 aspect-square w-10 bg-white"></div>
			<video
				src="/public/videos/temp/big-buck-bunny.mp4"
				autoPlay
				muted
				controls
				className="h-full w-full"
			/>
		</section>
	);
}
