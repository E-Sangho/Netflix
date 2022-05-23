import {
	IGetMoviesResult,
	getOnAirTv,
	getPopularTv,
	getTopRatedTv,
} from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";
import Hero from "../components/hero";
import Slider from "../components/slider";
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
function TwShows() {
	const { data: onAir, isLoading } = useQuery<IGetMoviesResult>(
		["tvshows", "onair"],
		getOnAirTv
	);
	const { data: popular, isLoading: popularLoading } =
		useQuery<IGetMoviesResult>(["tvshows", "popular"], getPopularTv);
	const { data: topRated, isLoading: topRatedLoading } =
		useQuery<IGetMoviesResult>(["tvshows", "topRated"], getTopRatedTv);
	return (
		<Container>
			{isLoading ? (
				<Loader>Loading</Loader>
			) : (
				<>
					<Hero data={onAir} />
					<Slider
						title={"Now Playing"}
						data={onAir}
						offset={offset}
					/>
					<Modal location="tvshows" data={onAir} />
					{!popularLoading ? (
						<>
							<Slider
								title={"Popular"}
								data={popular}
								offset={offset}
							/>
							<Modal location="tvshows" data={popular} />
						</>
					) : null}
					{!topRatedLoading ? (
						<>
							<Slider
								title={"Top Rated"}
								data={topRated}
								offset={offset}
							/>
							<Modal location="tvshows" data={topRated} />
						</>
					) : null}
				</>
			)}
		</Container>
	);
}

export default TwShows;
