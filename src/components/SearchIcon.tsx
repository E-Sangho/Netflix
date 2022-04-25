import { useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { NavIcon } from "./styledHeader";
interface ISearch {
	$searching: boolean;
}

const SearchIcon = styled(motion.div)<ISearch>`
	display: flex;
	align-items: center;
	position: relative;
	border: ${(props) => (props.$searching ? "1px solid white" : "none")};
	height: ${(props) => (props.$searching ? "36px" : "auto")};
	background-color: ${(props) =>
		props.$searching ? "rgb(14,14,14)" : "transparent"};
`;

const Input = styled(motion.input)`
	transform-origin: right center;
	width: 210px;
	background-color: transparent;
	border: none;
	position: absolute;
	right: 0px;
	color: white;
	&:focus {
		outline: none;
	}
`;

function Search() {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [searching, setSearching] = useState<boolean>(false);
	const openSearch = () => {
		searching ? inputRef.current?.blur() : inputRef.current?.focus();
		setSearching((prev) => !prev);
	};
	return (
		<SearchIcon
			$searching={searching}
			animate={{ width: searching ? "250px" : "auto" }}
			transition={{ type: "linear" }}
		>
			<NavIcon>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					viewBox="0 0 512 512"
					transition={{ type: "linear" }}
					key="searchIcon"
					onClick={openSearch}
				>
					<path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
				</motion.svg>
			</NavIcon>
			<Input
				ref={inputRef}
				initial={{ scaleX: 0 }}
				animate={{ scaleX: searching ? 1 : 0 }}
				onBlur={openSearch}
				transition={{ type: "linear" }}
				key="searchInput"
				placeholder="제목,사람,장르"
			/>
		</SearchIcon>
	);
}

export default Search;
