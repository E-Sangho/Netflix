import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { IMovie } from "../../api";
import { makeImagePath, idToGenre } from "../../utils";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getGenres, IGetGenres } from "../../api";

interface IModal {
	data?: IMovie[];
	location: string;
}

export default function Modal({ data, location }: IModal) {
	const { data: genres, isLoading } = useQuery<IGetGenres>(
		["genres"],
		getGenres
	);
	const bigMovieMatch = useMatch(`/${location}/:movieId`);
	const { scrollY } = useViewportScroll();
	const navigate = useNavigate();
	const onOverlayClick = () => {
		if (location === "tvshows") {
			navigate(`/tvshows`);
			return;
		}
		navigate(`/`);
	};
	const clickedMovie =
		bigMovieMatch?.params.movieId &&
		data?.find(
			(movie) => String(movie.id) === bigMovieMatch.params.movieId
		);
	useEffect(() => {
		if (bigMovieMatch) {
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.body.style.overflow = "";
		};
	});
	return (
		<AnimatePresence>
			{bigMovieMatch ? (
				<>
					<Overlay
						onClick={onOverlayClick}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					/>
					<BigMovie
						layoutId={bigMovieMatch.params.movieId}
						scroll={scrollY.get()}
					>
						{clickedMovie && (
							<>
								<BigCover
									imageUrl={makeImagePath(
										clickedMovie.backdrop_path
									)}
								/>
								<Title>{clickedMovie.title}</Title>
								<Info>
									<InfoLeft>
										<InfoLeftTop>
											<Average
												score={
													Number(
														clickedMovie.vote_average
													) * 10
												}
											>
												{`Rating: ${clickedMovie.vote_average}`}
											</Average>
											<ReleaseDate>
												{`${clickedMovie.release_date}`}
											</ReleaseDate>
										</InfoLeftTop>
										<Overview>
											{clickedMovie.overview}
										</Overview>
									</InfoLeft>

									<Genres>
										{`Genres: ${
											!isLoading &&
											genres &&
											clickedMovie.genre_ids
												.map((id) =>
													idToGenre(
														id + 0,
														genres.genres
													)
												)
												.join(", ")
										}`}
									</Genres>
								</Info>
							</>
						)}
					</BigMovie>
				</>
			) : null}
		</AnimatePresence>
	);
}

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
`;

const BigMovie = styled(motion.div)<{ scroll: number }>`
	position: absolute;
	width: 90vw;
	height: 90vh;
	top: ${(props) => props.scroll + Math.floor(window.innerHeight / 10)}px;
	left: 0;
	right: 0;
	margin: 0 auto;
	background-color: rgb(20, 20, 20);
`;

const BigCover = styled.div<{ imageUrl: string }>`
	width: 100%;
	height: 400px;
	background-size: cover;
	background-position: top center;
	background-image: url(${(props) => props.imageUrl});
`;

const Title = styled.h2`
	width: 100%;
	position: relative;
	top: -64px;
	left: 24px;
	font-size: 48px;
	color: white;
`;

const Info = styled.div`
	width: 100%;
	display: flex;
	position: relative;
	color: white;
	font-size: 18px;
	margin: 0 24px;
`;

const InfoLeft = styled.div`
	width: 60%;
	display: flex;
	flex-direction: column;
`;

const InfoLeftTop = styled.div`
	display: flex;
`;

const Average = styled.div<{ score: number }>`
	color: ${(props) =>
		props.score > 80 ? "green" : props.score > 60 ? "orange" : "red"};
`;

const Overview = styled.div`
	margin-top: 32px;
	line-height: 1.5;
`;

const ReleaseDate = styled.div`
	margin-left: 32px;
`;

const Genres = styled.div`
	width: 30%;
	display: flex;
	justify-content: flex-end;
`;
