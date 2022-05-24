import {
	IGetMoviesResult,
	getOnAirTv,
	getPopularTv,
	getTopRatedTv,
	IMovie,
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
	let unique: IMovie[] = [];
	if (popular && topRated) {
		const concate = popular.results.concat(topRated.results);
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
					<Hero data={onAir} />
					<Slider
						location="tvshows"
						title={"Now Playing"}
						data={onAir}
						offset={offset}
					/>
					{!popularLoading ? (
						<>
							<Slider
								location="tvshows"
								title={"Popular"}
								data={popular}
								offset={offset}
							/>
						</>
					) : null}
					{!topRatedLoading ? (
						<>
							<Slider
								location="tvshows"
								title={"Top Rated"}
								data={topRated}
								offset={offset}
							/>
						</>
					) : null}
					<Modal location="tvshows" data={unique} />
				</>
			)}
		</Container>
	);
}

export default TwShows;
