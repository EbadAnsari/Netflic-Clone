import { Genre } from "./TMDBGenre";

export interface TrailerModalInputs {
	title: string;
	genre: Genre[];
	imageSource: string;
	description: string;
}

export interface TrailerModalProps extends TrailerModalInputs {}

export type ModalState = { modalState: "open" | "close" };

export type TrailerModalSliceType = ModalState & {
	modalValue?: TrailerModalInputs;
};
