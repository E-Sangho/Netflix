import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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

const Banner = styled.div<{ bgPhoto: string }>`
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
`;

const Slider = styled.div`
	position: relative;
`;

const Row = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 4px;
	position: absolute;
	width: 100%;
	top: -100px;
	margin-left: 50px;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
	background-color: white;
	width: 20%;
	font-size: 64px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: url(${(props) => props.bgPhoto});
	background-size: cover;
	background-position: center center;
`;

const rowVariants = {
	hidden: {
		x: window.innerWidth,
	},
	visible: { x: 0 },
	exit: { x: -window.innerWidth },
};

const offset = 6;

function Home() {
	const { data, isLoading } = useQuery<IGetMoviesResult>(
		["movies", "nowPlaying"],
		getMovies
	);
	const [index, setIndex] = useState(0);
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			setLeaving(true);
			const totalMovies = data?.results.length;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const [leaving, setLeaving] = useState(false);
	const toggleLeaving = () => setLeaving((prev) => !prev);
	return (
		<Container>
			{isLoading ? (
				<Loader>Loading</Loader>
			) : (
				<>
					<Banner
						bgPhoto={makeImagePath(
							data?.results[0].backdrop_path || ""
						)}
						onClick={increaseIndex}
					>
						<Title>{data?.results[0].title}</Title>
						<Overview>{data?.results[0].overview}</Overview>
					</Banner>
					<Slider>
						<AnimatePresence
							initial={false}
							onExitComplete={toggleLeaving}
						>
							<Row
								variants={rowVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								key={index}
								transition={{ type: "tween", duration: 2 }}
							>
								{data?.results
									.slice(1)
									.slice(offset * index, offset * (index + 1))
									.map((movie) => (
										<Box
											key={movie.id}
											bgPhoto={makeImagePath(
												movie.backdrop_path || "",
												"w400"
											)}
										></Box>
									))}
							</Row>
						</AnimatePresence>
					</Slider>
				</>
			)}
		</Container>
	);
}

export default Home;
