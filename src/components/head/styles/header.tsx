import styled from "styled-components";

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

export const Svg = styled.img``;

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
