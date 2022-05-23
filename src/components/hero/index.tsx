import styled from "styled-components";
import { makeImagePath } from "../../utils";
import { IGetMoviesResult } from "../../api";

interface IHero {
	data?: IGetMoviesResult;
}
export default function Hero({ data }: IHero) {
	return (
		<HeroContainer
			bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
		>
			<Title>{data?.results[0].title}</Title>
			<Overview>{data?.results[0].overview}</Overview>
		</HeroContainer>
	);
}

const HeroContainer = styled.div<{ bgPhoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-left: 50px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgPhoto});
	background-size: cover;
`;

const Title = styled.h2`
	font-size: 4.5vw;
	margin-bottom: 16px;
	color: white;
`;

const Overview = styled.div`
	font-size: 1.2vw;
	width: 40%;
	color: white;
	line-height: 1.4;
`;
