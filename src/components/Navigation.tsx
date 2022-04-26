import styled from "styled-components";
import { Link, useMatch } from "react-router-dom";

const NavLink = styled.li`
	width: 100%;
	margin-right: 20px;
	color: white;
	@media only screen and (max-width: 767px) {
		display: none;
	}
	a {
		width: 100%;
		text-align: center;
	}
`;

const NavWrapper = styled.ul`
	display: flex;
	align-items: center;
	font-size: 14px;
	@media only screen and (max-width: 1023px) {
		font-size: 0.8rem;
	}
`;

function Navigation() {
	const homeMatch = useMatch("/");
	const seriesMatch = useMatch("series");
	const moviesMatch = useMatch("movies");
	const latestMatch = useMatch("latest");
	const myListMatch = useMatch("my-list");
	return (
		<NavWrapper>
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
		</NavWrapper>
	);
}

export default Navigation;
