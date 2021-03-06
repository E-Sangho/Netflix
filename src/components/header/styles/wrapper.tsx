import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.div)`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: black;
	height: 68px;
	position: fixed;
	z-index: 999;
	@media only screen and (max-width: 1023px) {
		height: 41px;
	}
`;

export const StartWrapper = styled.div`
	display: flex;
	align-items: center;
`;
export const EndWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-right: 40px;
`;
export const NavLinkWrapper = styled.div`
	display: flex;
	align-items: center;
	font-size: 14px;
	@media only screen and (max-width: 1023px) {
		font-size: 0.8rem;
	}
	position: relative;
`;

export const NavIconWrapper = styled.ul`
	display: flex;
	align-items: center;
`;
