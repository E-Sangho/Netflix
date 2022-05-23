import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { makeImagePath } from "../../utils";
import { useNavigate } from "react-router-dom";
import { IGetMoviesResult, IGetGenres, getGenres } from "../../api";
import { useQuery } from "react-query";
import { idToGenre } from "../../utils";

interface ISlider {
	title: string;
	data?: IGetMoviesResult;
	offset: number;
}

export default function Slider({ title, data, offset }: ISlider) {
	const navigate = useNavigate();
	const { data: genres, isLoading } = useQuery<IGetGenres>(
		["genres"],
		getGenres
	);
	const [index, setIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const [isRight, setIsRight] = useState(false);
	const toggleLeaving = () => setLeaving((prev) => !prev);
	const decreaseIndex = () => {
		if (data) {
			if (leaving) return;
			setIsRight(false);
			setLeaving(true);
			const totalMovies = data?.results.length;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
		}
	};
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			setIsRight(true);
			setLeaving(true);
			const totalMovies = data?.results.length;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const onBoxClicked = (movidId: number) => {
		navigate(`/movies/${movidId}`);
	};
	return (
		<SliderContainer>
			<Title>{title}</Title>
			<AnimatePresence
				custom={isRight}
				initial={false}
				onExitComplete={toggleLeaving}
			>
				<Row
					variants={rowVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					key={index}
					transition={{ type: "tween", duration: 0.8 }}
					custom={isRight}
				>
					{data?.results
						.slice(1)
						.slice(offset * index, offset * (index + 1))
						.map((movie) => (
							<Box
								layoutId={`${title}_${movie.id}`}
								variants={BoxVariants}
								initial="normal"
								whileHover="hover"
								transition={{ type: "tween" }}
								key={`${title}_${movie.id}`}
								onClick={() => onBoxClicked(movie.id)}
								$bgPhoto={makeImagePath(
									movie.backdrop_path || ""
								)}
							>
								<Info variants={InfoVariants}>
									<InfoTitle>{movie.title}</InfoTitle>
									<InfoAverage
										score={Number(movie.vote_average) * 10}
									>
										{`Score: ${movie.vote_average}`}
									</InfoAverage>
									<InfoGenres>
										{!isLoading &&
											genres &&
											movie.genre_ids
												.map((id) =>
													idToGenre(id, genres.genres)
												)
												.join("•")}
									</InfoGenres>
								</Info>
							</Box>
						))}
				</Row>
			</AnimatePresence>
			<PrevIndex
				variants={IndexVariants}
				whileHover="hover"
				onClick={decreaseIndex}
			>
				{`<`}
			</PrevIndex>
			<NextIndex
				variants={IndexVariants}
				whileHover="hover"
				onClick={increaseIndex}
			>{`>`}</NextIndex>
		</SliderContainer>
	);
}

const SliderContainer = styled.div`
	width: 100%;
	height: 10vw;
	position: relative;
	top: -120px;
	margin-bottom: 88px;
`;

const Title = styled.div`
	font-size: 24px;
	color: white;
	margin-left: 50px;
	margin-bottom: 16px;
`;

const Row = styled(motion.div)`
	box-sizing: border-box;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 8px;
	position: absolute;
	width: 100%;
	padding: 0 50px;
	background-color: transparent;
`;

const rowVariants = {
	hidden: (isRight: boolean) => ({
		x: isRight ? window.innerWidth - 92 : -window.innerWidth + 92,
	}),
	visible: { x: 0 },
	exit: (isRight: boolean) => ({
		x: isRight ? -window.innerWidth + 92 : window.innerWidth - 92,
	}),
};

const Box = styled(motion.div)<{ $bgPhoto: string }>`
	height: 10vw;
	font-size: 64px;
	background-image: url(${(props) => props.$bgPhoto});
	background-size: cover;
	background-position: center center;
	position: relative;
	&:first-child {
		transform-origin: left center;
	}
	&:last-child {
		transform-origin: right center;
	}
`;

const BoxVariants = {
	normal: {
		scale: 1,
	},
	hover: {
		width: "100%",
		backgroundPosition: "top center",
		scale: 1.2,
		height: "20vw",
		zIndex: 10,
		transition: {
			delay: 0.3,
			type: "tween",
		},
	},
};

const Info = styled(motion.div)`
	background-color: rgb(20, 20, 20);
	width: 100%;
	height: 0vw;
	padding: 0 8px;
	position: absolute;
	bottom: 0;
	opacity: 0;
`;

const InfoTitle = styled.div`
	width: 100%;
	font-size: 18px;
	color: white;
	text-align: center;
	margin-top: 16px;
`;

const InfoAverage = styled.div<{ score: number }>`
	width: 100%;
	font-size: 16px;
	margin: 16px 0;
	color: ${(props) =>
		props.score > 80 ? "green" : props.score > 60 ? "orange" : "red"};
`;

const InfoGenres = styled.div`
	width: 100%;
	font-size: 16px;
	color: white;
	word-break: break-all;
`;

const InfoVariants = {
	hover: {
		width: "93%",
		height: "10vw",
		opacity: 1,
		zIndex: 10,
		transition: {
			delay: 0.3,
			type: "tween",
		},
	},
	exit: {
		height: "0",
		opacity: 0,
		transition: {
			type: "tween",
		},
	},
};

const NextIndex = styled(motion.div)`
	width: 50px;
	height: 100%;
	position: absolute;
	right: 0px;
	background-color: rgba(20, 20, 20, 0.5);
	color: rgba(20, 20, 20, 0);
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 64px;
	cursor: pointer;
`;

const PrevIndex = styled(NextIndex)`
	right: none;
	left: 0px;
`;

const IndexVariants = {
	hover: {
		color: "white",
		backgroundColor: "rgba(20, 20, 20, 0.7)",
		transition: {
			duration: 0.1,
		},
	},
};
