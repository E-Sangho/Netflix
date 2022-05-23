import { IGenres } from "./api";

export function makeImagePath(id: string, format?: string) {
	return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function idToGenre(genreId: number, genres: IGenres[]) {
	for (let i = 0; i < genres.length; ++i) {
		if (genres[i].id === genreId) {
			return genres[i].name;
		}
	}
	return "undefined";
}
