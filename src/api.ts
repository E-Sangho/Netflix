const API_KEY = "73d4c7b38f207884a35364977119139f";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
	id: number;
	backdrop_path: string;
	poster_path: string;
	overview: string;
	title: string;
	vote_average: string;
	release_date: string;
	genre_ids: number[];
}

export interface IGetMoviesResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}

export interface IGenres {
	id: number;
	name: string;
}

export interface IGetGenres {
	genres: IGenres[];
}

export function getNowPlaying() {
	return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getPopular() {
	return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getTopRatedMovie() {
	return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getUpcomingMovie() {
	return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getGenres() {
	return fetch(`${BASE_PATH}/genre/movie/list?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function searchMovie(keyword: string) {
	return fetch(
		`${BASE_PATH}/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
	).then((response) => response.json());
}

export function searchTvShows(keyword: string) {
	return fetch(
		`${BASE_PATH}/search/tv?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
	).then((response) => response.json());
}

export function getOnAirTv() {
	return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getPopularTv() {
	return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getTopRatedTv() {
	return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}
