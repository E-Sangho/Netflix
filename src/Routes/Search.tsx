import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { searchMovie, searchTvShows, IGetMoviesResult } from "../api";
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
	return (
		<Container>
			<>
				{!isMovieLoading ? (
					<Slider title={"Movie"} data={movie} offset={offset} />
				) : null}
				<Modal location="movies" data={movie} />
				{!isTvLoading ? (
					<Slider title={"TvShows"} data={tv} offset={offset} />
				) : null}
				<Modal location="tvshows" data={tv} />
			</>
		</Container>
	);
}

export default Search;
