import { Genre } from "./TMDBGenre";
import { TMDBResult } from "./TheMovieDBInterface";
import { Prettify } from "./interface";

export interface TrailerModalInputs {
	id: TMDBResult["id"];
	title: string;
	genre: Genre[];
	imageSource: string;
	description: string;
	liked: boolean;
}

export interface TrailerModalProps extends Prettify<TrailerModalInputs> {}

export type ModalState = { modalState: "open" | "close" };

export type TrailerModalSliceType = ModalState & {
	modalValue?: TrailerModalInputs;
};
