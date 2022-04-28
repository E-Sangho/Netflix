import styled from "styled-components";
import { motion } from "framer-motion";
import { ISearch } from "./interface";

export const Container = styled(motion.div)`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: black;
	height: 68px;
	position: fixed;
	@media only screen and (max-width: 1023px) {
		height: 41px;
	}
`;

export const Logo = styled.img`
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

export const Menu = styled.div`
	display: flex;
	align-items: center;
`;

export const MenuIcon = styled.button`
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

export const DropDown = styled.div`
	width: 240px;
	position: absolute;
	top: 41px;
	left: -72px;
	background-color: rgb(20, 20, 20);
	border: 1px solid rgb(50, 50, 50);
	border-top: 3px solid white;
	opacity: 0.8;
	ul {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	li {
		width: 100%;
		height: 40px;
		display: none;
		@media only screen and (max-width: 767px) {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
`;

export const SearchIcon = styled(motion.div)<ISearch>`
	display: flex;
	align-items: center;
	position: relative;
	border: ${(props) => (props.$searching ? "1px solid white" : "none")};
	height: ${(props) => (props.$searching ? "36px" : "auto")};
	background-color: ${(props) =>
		props.$searching ? "rgb(14,14,14)" : "transparent"};
`;

export const Input = styled(motion.input)`
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

export const NavIcon = styled.button`
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

export const NavLink = styled.li`
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

export const NavWrapper = styled.ul`
	display: flex;
	align-items: center;
	font-size: 14px;
	@media only screen and (max-width: 1023px) {
		font-size: 0.8rem;
	}
`;
