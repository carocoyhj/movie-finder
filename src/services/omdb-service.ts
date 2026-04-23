import axios from "axios";
import type {
	MovieDetails,
	MovieSearchItem,
	SearchMoviesParams,
	SearchMoviesResult,
} from "@/types/omdb";

const OMDB_BASE_URL = "https://www.omdbapi.com/";

type OmdbMovieDetailsResponse =
	| MovieDetails
	| {
			Response: "False";
			Error: string;
	  };

type OmdbSearchResponse =
	| {
			Search: MovieSearchItem[];
			totalResults: string;
			Response: "True";
	  }
	| {
			Response: "False";
			Error: string;
	  };

const omdbApi = axios.create({
	baseURL: OMDB_BASE_URL,
});

const getOmdbApiKey = () => {
	const apiKey = import.meta.env.VITE_OMDB_API_KEY?.trim();

	if (!apiKey) {
		throw new Error("Missing OMDb API key. Set VITE_OMDB_API_KEY in your environment.");
	}

	return apiKey;
};

export const searchMovies = async ({
	query,
	page = 1,
	type,
	year,
}: SearchMoviesParams): Promise<SearchMoviesResult> => {
	const normalizedQuery = query.trim();

	if (!normalizedQuery) {
		return {
			movies: [],
			totalResults: 0,
			page,
			hasMore: false,
		};
	}

	const apiKey = getOmdbApiKey();

	const { data } = await omdbApi.get<OmdbSearchResponse>("", {
		params: {
			apikey: apiKey,
			s: normalizedQuery,
			page,
			type,
			y: year,
		},
	});

	if (data.Response === "False") {
		if (data.Error === "Movie not found!") {
			return {
				movies: [],
				totalResults: 0,
				page,
				hasMore: false,
			};
		}

		throw new Error(data.Error);
	}

	const totalResults = Number.parseInt(data.totalResults, 10) || 0;

	return {
		movies: data.Search,
		totalResults,
		page,
		hasMore: page * data.Search.length < totalResults,
	};
};

export const getMovieDetails = async (imdbID: string): Promise<MovieDetails> => {
	const normalizedImdbID = imdbID.trim();

	if (!normalizedImdbID) {
		throw new Error("A valid imdbID is required to fetch movie details.");
	}

	const apiKey = getOmdbApiKey();

	const { data } = await omdbApi.get<OmdbMovieDetailsResponse>("", {
		params: {
			apikey: apiKey,
			i: normalizedImdbID,
			plot: "full",
		},
	});

	if (data.Response === "False") {
		throw new Error(data.Error);
	}

	return data;
};
