import { MovieCertification } from "./TMDBCertification";
import {
	LanguageCode,
	LanguageRegionCode,
	RegionCode,
	ReleaseType,
} from "./TMDBExtra";
import { Genre } from "./TMDBGenre";

export type SortingOrder =
	| "popularity.asc"
	| "popularity.desc"
	| "revenue.asc"
	| "revenue.desc"
	| "primary_release_date.asc"
	| "primary_release_date.desc"
	| "vote_average.asc"
	| "vote_average.desc"
	| "vote_count.asc"
	| "vote_count.desc";

export interface TMDBParameters {
	[key: string | number | symbol]: any;
	certification: MovieCertification;
	"certification.gte": MovieCertification;
	"certification.lte": MovieCertification;

	certification_country: string;

	include_adult: boolean;

	include_video: boolean;

	language: LanguageRegionCode;

	page: number;

	primary_release_year: number;
	"primary_release_date.gte": Date;
	"primary_release_date.lte": Date;

	region: RegionCode;
	"release_date.gte": Date;
	"release_date.lte": Date;

	sort_by: SortingOrder;

	"vote_average.gte": number;
	"vote_average.lte": number;
	"vote_count.gte": number;
	"vote_count.lte": number;

	watch_region: string;

	with_cast: string;
	with_companies: string;

	with_crew: string;
	with_genres: string | Genre;

	with_keywords: string;

	with_origin_country: RegionCode;
	with_original_language: LanguageCode;

	with_people: string;
	with_release_type: ReleaseType;

	"with_runtime.gte": number;
	"with_runtime.lte": number;

	with_watch_monetization_types: string;

	with_watch_providers: string;
	without_companies: string;

	without_genres: string;

	without_keywords: string;

	without_watch_providers: string;
	year: number;
}

export interface TMDBResult {
	adult: boolean;

	/** horizontal image (for landscape). */
	backdrop_path: string;

	genre_ids: Genre[];
	id: number;
	original_language: LanguageCode;
	original_title: string;
	overview: string;
	popularity: number;

	/** vertical image (for portrait). */
	poster_path: string;

	release_date: Date;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface TMDBResponse {
	page: number;
	results: TMDBResult[];
	total_pages: number;
	total_results: number;
}

export const TMDBUrl = {
	discover: "https://api.themoviedb.org/3/discover/movie?",
	image: "https://image.tmdb.org/t/p/",
} as const;
