const API_KEY = "73d4c7b38f207884a35364977119139f";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
	id: number;
	backdrop_path: string;
	poster_path: string;
	overview: string;
	title: string;
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

export function getMovies() {
	return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}
