export type LanguageCode =
	| "en"
	| "es"
	| "fr"
	| "de"
	| "it"
	| "pt"
	| "nl"
	| "ru"
	| "zh"
	| "ja"
	| "ko"
	| "ar"
	| "hi"
	| "bn"
	| "tr"
	| "sv"
	| "da"
	| "no"
	| "fi"
	| "el";

export type RegionCode =
	| "US"
	| "CA"
	| "GB"
	| "AU"
	| "DE"
	| "FR"
	| "JP"
	| "CN"
	| "IN"
	| "BR"
	| "RU"
	| "ZA"
	| "MX"
	| "ES"
	| "IT";

export type LanguageRegionCode =
	| "en-US"
	| "fr-FR"
	| "es-ES"
	| "de-DE"
	| "ja-JP"
	| "zh-CN"
	| "ru-RU"
	| "it-IT"
	| "pt-BR"
	| "ko-KR";

export enum ReleaseType {
	Premiere = 1,
	Theatrical_Limited = 2,
	Theatrical = 3,
	Digital = 4,
	Physical = 5,
	TV = 5,
}

export enum TMDBOperator {
	AND = ",",
	OR = "|",
}
