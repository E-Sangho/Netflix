import { useQuery } from "react-query";
import {
	getPopular,
	getNowPlaying,
	getTopRatedMovie,
	getUpcomingMovie,
	IGetMoviesResult,
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
	return (
		<Container>
			{isLoading ? (
				<Loader>Loading</Loader>
			) : (
				<>
					<Hero data={nowPlaying} />
					<Slider
						title={"Now Playing"}
						data={nowPlaying}
						offset={offset}
					/>
					<Modal location="movies" data={nowPlaying} />
					{!popularLoading ? (
						<>
							<Slider
								title={"Popular"}
								data={popular}
								offset={offset}
							/>
							<Modal location="movies" data={popular} />
						</>
					) : null}
					{!topRatedLoading ? (
						<>
							<Slider
								title={"Top Rated"}
								data={topRated}
								offset={offset}
							/>
							<Modal location="movies" data={topRated} />
						</>
					) : null}
					{!upComingLoading ? (
						<>
							<Slider
								title={"Top Rated"}
								data={upComing}
								offset={offset}
							/>
							<Modal location="movies" data={upComing} />
						</>
					) : null}
				</>
			)}
		</Container>
	);
}

export default Home;
