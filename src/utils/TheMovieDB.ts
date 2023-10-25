import { TMDBImageConfiguration } from "@interfaces/TMDBImage";
import { TMDBParameters, TMDBUrl } from "@interfaces/TheMovieDBInterface";

export function generateImageURL(imageInfo: TMDBImageConfiguration) {
	const imageUrl = new URL(TMDBUrl.image);

	imageUrl.pathname += imageInfo.imageSize + "/";

	imageUrl.pathname += imageInfo.imagePath;

	return imageUrl.href;
}

export async function discover(parameters: Partial<TMDBParameters>) {
	const url = TMDBUrl.discover;

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc2MWIzNmYxZDlmMzg0NmFiZmZkN2MzN2JmOTUxNSIsInN1YiI6IjY1MGM3NmQ2MmM2YjdiMDExYmMzZjhiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I2UqD8ejuYQoX5IvayArBizMXUEPGCum3A9-YD-6lTE",
		},
	};

	const params = new URLSearchParams();

	for (const parameter in parameters)
		params.append(parameter, parameters[parameter]!.toString());

	return await fetch(url + params.toString(), options);
}
