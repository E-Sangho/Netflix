import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { searchMovie, searchTvShows, IGetMoviesResult, IMovie } from "../api";
import Slider from "../components/slider";
import Modal from "../components/modal";
import styled from "styled-components";

const Container = styled.div`
	background: rgb(14, 14, 14);
	padding-top: 256px;
`;

const offset = 6;

function Search() {
	const location = useLocation();
	const keyword = new URLSearchParams(location.search).get(
		"keyword"
	) as string;
	const { data: movie, isLoading: isMovieLoading } =
		useQuery<IGetMoviesResult>(["movies", "searchMovie", keyword], () =>
			searchMovie(keyword)
		);
	const { data: tv, isLoading: isTvLoading } = useQuery<IGetMoviesResult>(
		["movies", "searchTv", keyword],
		() => searchTvShows(keyword)
	);
	let unique: IMovie[] = [];
	if (movie && tv) {
		const concate = movie.results.concat(movie.results);
		unique = concate.filter((item, index) => {
			return (
				concate.findIndex((item2, index2) => {
					return item.id === item2.id;
				}) === index
			);
		});
	}
	return (
		<Container>
			<>
				{!isMovieLoading ? (
					<Slider
						location="movies"
						title={"Movie"}
						data={movie}
						offset={offset}
					/>
				) : null}
				{!isTvLoading ? (
					<Slider
						location="tvshows"
						title={"TvShows"}
						data={tv}
						offset={offset}
					/>
				) : null}
				<Modal location="tvshows" data={unique} />
			</>
		</Container>
	);
}

export default Search;
