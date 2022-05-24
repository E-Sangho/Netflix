import { useQuery } from "react-query";
import {
	getPopular,
	getNowPlaying,
	getTopRatedMovie,
	getUpcomingMovie,
	IGetMoviesResult,
	IMovie,
} from "../api";
import styled from "styled-components";
import Slider from "../components/slider";
import Hero from "../components/hero";
import Modal from "../components/modal";

const Container = styled.div`
	background: rgb(14, 14, 14);
`;

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
`;

const offset = 6;

function Home() {
	const { data: nowPlaying, isLoading } = useQuery<IGetMoviesResult>(
		["movies", "nowPlaying"],
		getNowPlaying
	);
	const { data: popular, isLoading: popularLoading } =
		useQuery<IGetMoviesResult>(["movies", "popular"], getPopular);
	const { data: topRated, isLoading: topRatedLoading } =
		useQuery<IGetMoviesResult>(["movies", "topRated"], getTopRatedMovie);
	const { data: upComing, isLoading: upComingLoading } =
		useQuery<IGetMoviesResult>(["movies", "upComing"], getUpcomingMovie);
	let unique: IMovie[] = [];
	if (nowPlaying && popular && topRated && upComing) {
		const concate = nowPlaying.results.concat(
			popular.results.concat(topRated.results.concat(upComing.results))
		);
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
			{isLoading ? (
				<Loader>Loading</Loader>
			) : (
				<>
					<Hero data={nowPlaying} />
					<Slider
						location="movies"
						title={"Now Playing"}
						data={nowPlaying}
						offset={offset}
					/>
					{!popularLoading ? (
						<>
							<Slider
								location="movies"
								title={"Popular"}
								data={popular}
								offset={offset}
							/>
						</>
					) : null}
					{!topRatedLoading ? (
						<>
							<Slider
								location="movies"
								title={"Top Rated"}
								data={topRated}
								offset={offset}
							/>
						</>
					) : null}
					{!upComingLoading ? (
						<>
							<Slider
								location="movies"
								title={"Upcoming"}
								data={upComing}
								offset={offset}
							/>
						</>
					) : null}
					<Modal location="movies" data={unique} />
				</>
			)}
		</Container>
	);
}

export default Home;
