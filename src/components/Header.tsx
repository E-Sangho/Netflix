import styled from "styled-components";
import { Link, useMatch } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const Navigation = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: black;
	height: 68px;
`;

const StartWrapper = styled.div`
	display: flex;
	align-items: center;
`;
const EndWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-right: 40px;
`;
const NavLinkWrapper = styled.ul`
	display: flex;
	align-items: center;
	font-size: 14px;
	@media only screen and (max-width: 1023px) {
		font-size: 0.8rem;
	}
`;
const NavIconWrapper = styled.ul`
	display: flex;
	align-items: center;
`;

const Logo = styled.svg`
	margin-left: 50px;
	margin-right: 40px;
	width: 100px;
	height: 32px;
	fill: ${(props) => props.theme.red};
	@media only screen and (min-width: 768px) and (max-width: 1023px) {
		width: 10em;
		margin-left: 30px;
		margin-right: 15px;
	}
	@media only screen and (max-width: 767px) {
		width: 10em;
		margin-left: 20px;
		margin-right: 10px;
	}
`;

const NavLink = styled.li`
	margin-right: 20px;
	color: white;
	@media only screen and (max-width: 767px) {
		display: none;
	}
`;

const NavIcon = styled.button`
	height: 20px;
	margin: 0px 10px;
	fill: white;
	@media only screen and (min-width: 768px) and (max-width: 1023px) {
		width: 15px;
		height: 20px;
	}
	@media only screen and (max-width: 767px) {
		width: 10px;
		height: 15px;
	}
`;

interface ISearch {
	searching: boolean;
}

const Search = styled(motion.div)<ISearch>`
	display: flex;
	align-items: center;
	position: relative;
	border: ${(props) => (props.searching ? "1px solid white" : "none")};
	width: ${(props) => (props.searching ? "250px" : "auto")};
	height: ${(props) => (props.searching ? "36px" : "auto")};
	background-color: ${(props) =>
		props.searching ? "rgb(14,14,14)" : "transparent"};
`;

const Menu = styled.li`
	display: flex;
	color: white;
	fill: white;
	align-items: center;
	display: none;
	position: relative;
	@media only screen and (max-width: 767px) {
		display: flex;
		width: 50px;
		height: 30px;
		svg {
			position: absolute;
			top: 0px;
			left: 28px;
		}
	}
`;

const Input = styled(motion.input)`
	transform-origin: right center;
	width: 210px;
	background-color: transparent;
	border: none;
	position: absolute;
	right: 0px;
	color: white;
`;

const SearchVariant = {
	initial: {
		scaleX: 0,
	},
	open: (searching: boolean) => ({}),
	exit: {
		scaleX: 0,
	},
};

function Header() {
	const homeMatch = useMatch("/");
	const seriesMatch = useMatch("series");
	const moviesMatch = useMatch("movies");
	const latestMatch = useMatch("latest");
	const myListMatch = useMatch("my-list");
	const [searching, setSearching] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const openSearch = () => {
		setSearching((prev) => !prev);
		inputRef.current?.focus();
	};
	return (
		<Navigation>
			<StartWrapper>
				<Logo
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					viewBox="0 0 299 81"
					version="1.1"
				>
					<path d="M 283.003906 38.558594 L 298.996094 81 C 294.285156 80.324219 289.574219 79.480469 284.773438 78.71875 L 275.765625 55.265625 L 266.507812 76.78125 C 261.960938 76.023438 257.496094 75.765625 252.953125 75.175781 L 269.199219 38.050781 L 254.46875 0 L 268.105469 0 L 276.355469 21.261719 L 285.195312 0 L 298.996094 0 Z M 243.695312 0 L 231.320312 0 L 231.320312 73.574219 C 235.359375 73.828125 239.570312 73.996094 243.695312 74.5 Z M 220.628906 72.730469 C 209.351562 71.96875 198.070312 71.296875 186.539062 71.042969 L 186.539062 0 L 199.164062 0 L 199.164062 59.0625 C 206.402344 59.230469 213.640625 59.820312 220.628906 60.15625 Z M 173.070312 28.773438 L 173.070312 41.425781 L 155.816406 41.425781 L 155.816406 70.199219 L 143.355469 70.199219 L 143.355469 0 L 178.710938 0 L 178.710938 12.65625 L 155.816406 12.65625 L 155.816406 28.773438 Z M 122.140625 12.65625 L 122.140625 70.875 C 117.933594 70.875 113.640625 70.875 109.515625 71.042969 L 109.515625 12.65625 L 96.46875 12.65625 L 96.46875 0 L 135.273438 0 L 135.273438 12.65625 Z M 82.832031 42.101562 C 77.277344 42.101562 70.710938 42.101562 65.996094 42.355469 L 65.996094 61.171875 C 73.402344 60.664062 80.8125 60.074219 88.300781 59.820312 L 88.300781 71.96875 L 53.367188 74.757812 L 53.367188 0 L 88.300781 0 L 88.300781 12.65625 L 65.996094 12.65625 L 65.996094 29.699219 C 70.878906 29.699219 78.371094 29.445312 82.832031 29.445312 Z M 12.878906 35.015625 L 12.878906 79.226562 C 8.335938 79.734375 4.292969 80.324219 0 81 L 0 0 L 12.039062 0 L 28.453125 45.984375 L 28.453125 0 L 41.078125 0 L 41.078125 75.765625 C 36.617188 76.527344 32.074219 76.78125 27.273438 77.453125 Z M 12.878906 35.015625 " />
				</Logo>
				<NavLinkWrapper>
					<Menu>
						Menu
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="70%"
							height="70%"
							viewBox="0 0 320 512"
						>
							<path d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z" />
						</svg>
					</Menu>
					<NavLink>
						<Link
							to="/"
							style={{
								fontWeight: homeMatch ? "bold" : "normal",
							}}
						>
							Home
						</Link>
					</NavLink>
					<NavLink>
						<Link
							to="series"
							style={{
								fontWeight: seriesMatch ? "bold" : "normal",
							}}
						>
							Series
						</Link>
					</NavLink>
					<NavLink>
						<Link
							to="movies"
							style={{
								fontWeight: moviesMatch ? "bold" : "normal",
							}}
						>
							Movies
						</Link>
					</NavLink>
					<NavLink>
						<Link
							to="latest"
							style={{
								fontWeight: latestMatch ? "bold" : "normal",
							}}
						>
							Latest
						</Link>
					</NavLink>
					<NavLink>
						<Link
							to="my-list"
							style={{
								fontWeight: myListMatch ? "bold" : "normal",
							}}
						>
							MyList
						</Link>
					</NavLink>
				</NavLinkWrapper>
			</StartWrapper>
			<EndWrapper>
				<NavIconWrapper>
					<Search searching={searching}>
						<NavIcon>
							<motion.svg
								xmlns="http://www.w3.org/2000/svg"
								width="100%"
								height="100%"
								viewBox="0 0 512 512"
								transition={{ type: "linear", duration: 3 }}
								key="searchIcon"
								onClick={openSearch}
							>
								<path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
							</motion.svg>
						</NavIcon>
						<Input
							ref={inputRef}
							initial="initial"
							animate={{ scaleX: searching ? 1 : 0 }}
							transition={{ type: "linear", duration: 3 }}
							key="searchInput"
							placeholder="제목,사람,장르"
						/>
					</Search>
					<NavIcon>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="100%"
							height="100%"
							viewBox="0 0 448 512"
						>
							<path d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z" />
						</svg>
					</NavIcon>
					<NavIcon>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="100%"
							height="100%"
							viewBox="0 0 448 512"
						>
							<path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
						</svg>
					</NavIcon>
				</NavIconWrapper>
			</EndWrapper>
		</Navigation>
	);
}

export default Header;
