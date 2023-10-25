export type BackDropSizes = "w300" | "w780" | "w1280" | "original";

export type LogoSizes =
	| "w45"
	| "w92"
	| "w154"
	| "w185"
	| "w300"
	| "w500"
	| "original";

export type PosterSizes =
	| "w92"
	| "w154"
	| "w185"
	| "w342"
	| "w500"
	| "w780"
	| "original";

export type ProfileSizes = "w45" | "w185" | "h632" | "original";

export type StillSizes = "w92" | "w185" | "w300" | "original";

export const TMDBImageTypes = [
	"backdrop",
	"logo",
	"poster",
	"profile",
	"still",
] as const;

export type ImageSizes =
	| BackDropSizes
	| LogoSizes
	| PosterSizes
	| ProfileSizes
	| StillSizes;

export type TMDBImageConfiguration = {
	imagePath: string;
	imageSize: ImageSizes;
};
